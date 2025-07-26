import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SendOtpDto, VerifyOtpDto } from './dto/verification.dto';
import { generateOtp } from 'src/core/utils/random';
import { secToMills } from 'src/core/utils/time';
import { SmsService } from 'src/common/service/sms.service';
import { ICheckOtp, VerificationTypes } from 'src/common/types/verification';
import { RedisService } from 'src/common/config/redis/redis.service';
import { PrismaService } from 'src/Database/prisma.service';

@Injectable()
export class VerificationsService {
    constructor (
        private readonly prisma: PrismaService,
        private readonly smsService: SmsService,
        private readonly redis: RedisService
    ) {}

    public getKey (type: VerificationTypes, phone: string, confirmation?: boolean) {
        const storeKeys: Record<VerificationTypes, string> = {
            [VerificationTypes.REGISTER]: 'reg_',
            [VerificationTypes.RESET_PASSWORD]: 'respass_',
            [VerificationTypes.RESET_PHONE]: 'edph_'
        }
        let key = storeKeys[type]
        if(confirmation) {
            key += 'cfm_'
        }
        key += phone
        return key
    }

    private getMessage(type: VerificationTypes, otp: string) {
        switch (type) {
            case VerificationTypes.REGISTER:
                return `Fixoo platformasida ro'yxatdan o'tish uchun tasdiqlash kodi: ${otp}. Kodni hech kimga bermang!`;
            case VerificationTypes.RESET_PASSWORD:
                return `Fixoo platformasida parolingizni tiklash uchun tasdiqlash kodi: ${otp}. Kodni hech kimga bermang!`;
            case VerificationTypes.RESET_PHONE:
                return `Fixoo platformasida telefoningizni o'zgartirish uchun tasdiqlash kodi: ${otp}. Kodni hech kimga bermang!`;
            default: 
                throw new NotFoundException('Noto\'g\'ri tasdiqlash turi')
        }
    }

    private async throwIfUserExists (phone: string) {
        const user = await this.prisma.users.findUnique({where: {phone}})
        if(user) {
            throw new BadRequestException('Bu telefon raqam allaqachon ro\'yxatdan o\'tgan!')
        }
        return user
    }

    private async throwIfUserNotExists (phone: string) {
        const user = await this.prisma.users.findUnique({where: {phone}})
        if(!user) {
            throw new BadRequestException('Foydalanuvchi topilmadi!')
        }
        return user
    }

    async sendOtp(payload: SendOtpDto) {
        // Payload'ni tekshirish
        if (!payload) {
            throw new BadRequestException('Ma\'lumot yuborilmagan!');
        }

        if (!payload.type) {
            throw new BadRequestException('Tasdiqlash turi ko\'rsatilmagan!');
        }

        if (!payload.phone) {
            throw new BadRequestException('Telefon raqami ko\'rsatilmagan!');
        }

        console.log('Received payload:', payload);
        
        const key = this.getKey(payload.type, payload.phone)
        const session = await this.redis.get(key)

        if(session) {
            throw new BadRequestException('Kod allaqachon yuborilgan, biroz kuting!')
        }

        switch (payload.type) {
            case VerificationTypes.REGISTER:
                await this.throwIfUserExists(payload.phone)
                break
            case VerificationTypes.RESET_PASSWORD:
                await this.throwIfUserNotExists(payload.phone)
                break
            case VerificationTypes.RESET_PHONE:
                await this.throwIfUserNotExists(payload.phone)
                break
            default:
                throw new BadRequestException('Noto\'g\'ri tasdiqlash turi!')
        }

        const otp = generateOtp()
        await this.redis.set(key, JSON.stringify(otp), secToMills(120))
        
        try {
            await this.smsService.sendSMS(this.getMessage(payload.type, otp), payload.phone)
        } catch (error) {
            console.error('SMS yuborishda xatolik:', error);
            // SMS yuborilmasa ham, OTP Redis'da saqlanadi (test uchun)
        }

        return {
            success: true,
            message: 'Tasdiqlash kodi yuborildi!',
            // Development uchun OTP'ni ko'rsatish (production'da olib tashlang)
            ...(process.env.NODE_ENV === 'development' && { otp })
        }
    }

    async verifyOtp (payload: VerifyOtpDto) {
        if (!payload) {
            throw new BadRequestException('Ma\'lumot yuborilmagan!');
        }

        const session = await this.redis.get(this.getKey(payload.type, payload.phone))
        if(!session) {
            throw new BadRequestException('Tasdiqlash kodi muddati o\'tgan yoki topilmadi!')
        }
        
        if(payload.otp !== JSON.parse(session)) {
            throw new BadRequestException('Tasdiqlash kodi noto\'g\'ri!')
        }

        await this.redis.del(this.getKey(payload.type, payload.phone))
        await this.redis.set(
            this.getKey(payload.type, payload.phone, true),
            JSON.stringify(payload.otp),
            secToMills(300)
        )

        return {
            success: true,
            message: 'Tasdiqlash muvaffaqiyatli bajarildi'
        }
    }

    public async ChekConfirmOtp (payload: ICheckOtp) {
        const session = await this.redis.get(this.getKey(payload.type, payload.phone, true))
        if(!session) {
            throw new BadRequestException('Tasdiqlash muddati o\'tgan!')
        }
        if(payload.otp !== JSON.parse(session)) {
            throw new BadRequestException('Tasdiqlash kodi noto\'g\'ri!')
        }

        await this.redis.del(this.getKey(payload.type, payload.phone, true))
        return true
    }
}