import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {

    @ApiProperty({example: '+998975661099'})
    @IsMobilePhone('uz-UZ')
    @IsNotEmpty()
    phone: string

    @ApiProperty({example: '12345678'})
    @IsString()
    @IsNotEmpty()
    password: string
} 