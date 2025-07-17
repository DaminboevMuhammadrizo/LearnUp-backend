import { IsEnum, IsMobilePhone, IsString } from "class-validator";

export class SendOtpDto {

    @IsEnum(VerificationTypes)
    type: VerificationTypes

    @IsMobilePhone('uz-UZ')
    @IsString()
    phone: string
}

export class VerifyOtpDto extends SendOtpDto {
    
    @IsString()
    otp: string
}