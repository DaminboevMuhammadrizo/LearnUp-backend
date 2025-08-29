import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, IsNotEmpty, IsEmail } from "class-validator";
import { VerificationTypes } from "src/common/types/verification";

export class SendOtpDto {
    @ApiProperty({ description: 'Tasdiqlash turi', enum: VerificationTypes, enumName: 'VerificationTypes', example: VerificationTypes.REGISTER })
    @IsEnum(VerificationTypes, { message: 'Type must be one of: REGISTER, RESET_PASSWORD, RESET_EMAIL'})
    type: VerificationTypes;

    @ApiProperty({ description: 'Gmail', example: 'm701rizo@gmail.com',})
    @IsEmail()
    email: string;
}

export class VerifyOtpDto extends SendOtpDto {
    @ApiProperty({ description: 'SMS orqali kelgan 6 xonali kod', example: '123456', minLength: 6, maxLength: 6})
    @IsString()
    @IsNotEmpty()
    otp: string;
}