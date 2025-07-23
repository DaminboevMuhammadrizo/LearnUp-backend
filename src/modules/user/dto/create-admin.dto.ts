import { IsMobilePhone, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateAdminDto {
    @IsMobilePhone('uz-UZ')
    @IsNotEmpty()
    phone: string

    @IsString()
    @IsNotEmpty()
    fullName: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string
}
