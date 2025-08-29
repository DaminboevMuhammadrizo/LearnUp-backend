import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsMobilePhone } from "class-validator";

export class UpdatePhoneDto {

    @ApiProperty({example: 123456})
    @IsInt()
    otp: number

    @ApiProperty({example: 'm701rizo@gmail.com'})
    @IsEmail()
    email: string
}