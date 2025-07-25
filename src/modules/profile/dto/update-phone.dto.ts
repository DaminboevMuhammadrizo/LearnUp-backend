import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsMobilePhone } from "class-validator";

export class UpdatePhoneDto {

    @ApiProperty({example: 123456})
    @IsInt()
    otp: number

    @ApiProperty({example: '+998901234567'})
    @IsMobilePhone('uz-UZ')
    phone: string
}