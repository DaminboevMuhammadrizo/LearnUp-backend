import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMobilePhone, IsString } from "class-validator";
import { VerificationTypes } from "src/common/types/verification";

export class SendOtpDto {

    @ApiProperty({example: VerificationTypes.REGISTER})
    @IsEnum(VerificationTypes)
    type: VerificationTypes

    @ApiProperty({example: '+9981234567'})
    @IsMobilePhone('uz-UZ')
    @IsString()
    phone: string
}

export class VerifyOtpDto extends SendOtpDto {
    
    @ApiProperty({example: 123456})
    @IsString()
    otp: string
}