import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ResetPasswordDto {

    @ApiProperty({example: 'm701rizo@gmail.com',})
    @IsString()
    email: string

    @ApiProperty({example: 123456})
    @IsNumber()
    @IsNotEmpty()
    otp: number

    @ApiProperty({example: 'newPassword123'})
    @IsString()
    @IsNotEmpty()
    password: string
}