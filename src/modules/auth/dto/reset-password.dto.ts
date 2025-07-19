import { IsMobilePhone, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ResetPasswordDto {
    @IsMobilePhone()
    @IsNotEmpty()
    phone: string

    @IsNumber()
    @IsNotEmpty()
    otp: number

    @IsString()
    @IsNotEmpty()
    password: string
}