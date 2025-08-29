import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {

    @ApiProperty({example: 'm701rizo@gmail.com'})
    @IsEmail()
    @IsNotEmpty()
    phone: string

    @ApiProperty({example: '12345678'})
    @IsString()
    @IsNotEmpty()
    password: string
} 