import { BadRequestException, Injectable } from '@nestjs/common';
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
                return `Bu Eskiz dan test`
            case VerificationTypes.RESET_PASSWORD:
                return `Tizim platformasida parolni ozgartirish uchun ${otp}. Bu kodni xech kimga aytmang !`
            case VerificationTypes.RESET_PHONE:
                return `Tizim platformasidan telefon raqamni ozgartirish uchn ${otp}. Bu kodni xech kimga bermang !`
        }
    }


    private async  throwIfUserExsists (phone: string) {
        const user = await this.prisma.users.findUnique({where: {phone}})
        if(user) {
            throw new BadRequestException({message: 'Phone alredy exsists !'})
        }
        return user
    }


    private async throwIfUserNotExists (phone: string) {
        const user = await this.prisma.users.findUnique({where: {phone}})
        if(!user) {
            throw new BadRequestException({message: 'User not found !'})
        }
        return user
    }


    async sendOtp(payload: SendOtpDto) {
        console.log(payload)
        const key = this.getKey(payload.type, payload.phone)
        const session = await this.redis.get(key)

        // if(session) {
        //     throw new BadRequestException({message: 'Code alredy sent to user !'})
        // }

        switch (payload.type) {
            case VerificationTypes.REGISTER:
                await this.throwIfUserExsists(payload.phone)
                break
            case VerificationTypes.RESET_PASSWORD:
                await this.throwIfUserNotExists(payload.phone)
                break
            case VerificationTypes.RESET_PHONE:
                await this.throwIfUserNotExists(payload.phone)
                break
        }
        const otp = generateOtp()
        await this.redis.set(key, JSON.stringify(otp), secToMills(120))
        await this.smsService.sendSMS(this.getMessage(payload.type, otp), payload.phone)
        return {message: 'Confirm code sent !'}
    }

    async verifyOtp (payload: VerifyOtpDto) {
        const sesson = await this.redis.get(this.getKey(payload.type, payload.phone))
        if(!sesson) {
            throw new BadRequestException('Otp expired !')
        }
        if(payload.otp !== JSON.parse(sesson)) {
            throw new BadRequestException({message: 'Otp invalid !'})
        }

        await this.redis.del(this.getKey(payload.type, payload.phone))
        await this.redis.set(
            this.getKey(payload.type, payload.phone, true),
            JSON.stringify(payload.otp),
            secToMills(300)
        )

        return {
            success: true,
            message: 'Verified'
        }
    }



    public async ChekConfirmOtp (payload: ICheckOtp) {
        const sesson = await this.redis.get(this.getKey(payload.type, payload.phone))
        if(!sesson) {
            throw new BadRequestException('Otp expired !')
        }
        if(payload.otp !== JSON.parse(sesson)) {
            throw new BadRequestException({message: 'Otp invalid !'})
        }

        await this.redis.del(this.getKey(payload.type, payload.phone))
        return true
    }


}
