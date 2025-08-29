import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SendOtpDto, VerifyOtpDto } from './dto/verification.dto';
import { generateOtp } from 'src/core/utils/random';
// import { secToMills } from 'src/core/utils/time'; 
// import { SmsService } from 'src/common/service/sms.service';
import { ICheckOtp, VerificationTypes } from 'src/common/types/verification';
import { RedisService } from 'src/common/config/redis/redis.service';
import { PrismaService } from 'src/Database/prisma.service';
import { MailerService } from 'src/common/config/mailer/mailer.service';

@Injectable()
export class VerificationsService {
    constructor (
        private readonly prisma: PrismaService,
        // private readonly smsService: SmsService,
        private readonly redis: RedisService,
        private readonly mailerService: MailerService
    ) {}

    public getKey(type: VerificationTypes, email: string, confirmation = false): string {
        const storeKeys: Record<VerificationTypes, string> = {
            [VerificationTypes.REGISTER]: 'reg_',
            [VerificationTypes.RESET_PASSWORD]: 'respass_',
            [VerificationTypes.RESET_EMAIL]: 'edph_',
        };
        
        const prefix = storeKeys[type];
        if (!prefix) {
            throw new BadRequestException('Noto\'g\'ri tasdiqlash turi!');
        }
        
        return `${prefix}${confirmation ? 'cfm_' : ''}${email}`;
    }


    private async throwIfUserExists(email: string) {
        const user = await this.prisma.users.findUnique({ where: { email } });
        if (user) {
            throw new BadRequestException('Bu email allaqachon ro\'yxatdan o\'tgan!');
        }
        return user;
    }


    private async throwIfUserNotExists(email: string) {
        const user = await this.prisma.users.findUnique({ where: { email } });
        if (!user) {
            throw new BadRequestException('Foydalanuvchi topilmadi!');
        }
        return user;
    }

    async sendOtp(payload: SendOtpDto) {
        if (!payload) {
            throw new BadRequestException('Ma\'lumot yuborilmagan!');
        }

        if (!payload.type) {
            throw new BadRequestException('Tasdiqlash turi ko\'rsatilmagan!');
        }

        if (!payload.email) {
            throw new BadRequestException('Email ko\'rsatilmagan!');
        }

        const key = this.getKey(payload.type, payload.email);
        const existingOtp = await this.redis.get(key);

        if (existingOtp) {
            throw new BadRequestException('Kod allaqachon yuborilgan, biroz kuting!');
        }

        switch (payload.type) {
            case VerificationTypes.REGISTER:
                await this.throwIfUserExists(payload.email);
                break;
            case VerificationTypes.RESET_PASSWORD:
            case VerificationTypes.RESET_EMAIL:
                await this.throwIfUserNotExists(payload.email);
                break;
            default:
                throw new BadRequestException('Noto\'g\'ri tasdiqlash turi!');
        }

        const otp = generateOtp();

        await this.redis.set(key, JSON.stringify(otp), 120);

        try {
            // await this.smsService.sendSMS(this.getMessage(payload.type, otp), payload.email);
            await this.mailerService.sendConfigurationMailer(payload.email, otp);
        } catch (error) {
            console.error('Mailer yuborishda xatolik:', error);
            throw new BadRequestException('Tasdiqlash kodini yuborishda xatolik yuz berdi.');
        }

        return {
            success: true,
            message: 'Tasdiqlash kodi yuborildi!',
            ...(process.env.NODE_ENV === 'development' && { otp }),
        };
    }


    async verifyOtp(payload: VerifyOtpDto) {
        if (!payload) {
            throw new BadRequestException('Ma\'lumot yuborilmagan!');
        }

        const key = this.getKey(payload.type, payload.email);
        const session = await this.redis.get(key);
        if (!session) {
            throw new BadRequestException('Tasdiqlash kodi muddati o\'tgan yoki topilmadi!');
        }

        const storedOtp = JSON.parse(session);
        if (payload.otp !== storedOtp) {
            throw new BadRequestException('Tasdiqlash kodi noto\'g\'ri!');
        }

        await this.redis.del(key);
        const confirmKey = this.getKey(payload.type, payload.email, true);

        await this.redis.set(confirmKey, JSON.stringify(payload.otp), 300);

        return {
            success: true,
            message: 'Tasdiqlash muvaffaqiyatli bajarildi',
        };
    }

    public async checkConfirmOtp(payload: ICheckOtp): Promise<boolean> {
        const confirmKey = this.getKey(payload.type, payload.email, true);
        const session = await this.redis.get(confirmKey);

        if (!session) {
            throw new BadRequestException('Tasdiqlash muddati o\'tgan!');
        }

        const storedOtp = JSON.parse(session);
        if (payload.otp !== storedOtp) {
            throw new BadRequestException('Tasdiqlash kodi noto\'g\'ri!');
        }

        await this.redis.del(confirmKey);
        return true;
    }
}
