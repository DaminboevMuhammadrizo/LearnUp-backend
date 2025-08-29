import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RegisterDto {

    @ApiProperty({example: 'm701rizo@gmail.com'})
    @IsEmail()
    email: string

    @ApiProperty({example: 'Muhammadrizo'})
    @IsString()
    @IsNotEmpty()
    fullName: string

    @ApiProperty({example: 'admin123'})
    @IsString()
    @IsNotEmpty()
    password: string

    @ApiProperty({example: 123456})
    @IsNumber()
    otp: number
}