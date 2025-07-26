import { ApiConsumes, ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, IsNotEmpty } from "class-validator";
import { VerificationTypes } from "src/common/types/verification";

export class SendOtpDto {
    @ApiProperty({
        description: 'Tasdiqlash turi',
        enum: VerificationTypes,
        enumName: 'VerificationTypes',
        example: VerificationTypes.REGISTER
    })
    @IsEnum(VerificationTypes, {
        message: 'Type must be one of: REGISTER, RESET_PASSWORD, RESET_PHONE'
    })
    type: VerificationTypes;

    @ApiProperty({
        description: 'Telefon raqami',
        example: '+998901234567',
        pattern: '^\\+998[0-9]{9}$'
    })
    @IsString()
    @IsNotEmpty()
    phone: string;
}

export class VerifyOtpDto extends SendOtpDto {
    @ApiProperty({
        description: 'SMS orqali kelgan 6 xonali kod',
        example: '123456',
        minLength: 6,
        maxLength: 6
    })
    @IsString()
    @IsNotEmpty()
    otp: string;
}