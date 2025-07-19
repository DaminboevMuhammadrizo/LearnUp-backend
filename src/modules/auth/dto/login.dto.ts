import { IsMobilePhone, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {

    
    @IsMobilePhone('uz-UZ')
    @IsNotEmpty()
    phone: string

    @IsString()
    @IsNotEmpty()
    password: string
} 