import { IsEnum, IsMobilePhone, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { UserRole } from "src/common/types/userRole";

export class RegisterDto {

    @IsMobilePhone('uz-UZ')
    phone: string

    @IsString()
    @IsNotEmpty()
    fullName: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsNumber()
    otp: number

    @IsString()
    img: string
}