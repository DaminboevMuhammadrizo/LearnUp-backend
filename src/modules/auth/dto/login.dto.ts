import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {

    @ApiProperty({example: '+998901234567'})
    @IsMobilePhone('uz-UZ')
    @IsNotEmpty()
    phone: string

    @ApiProperty({example: 'password123'})
    @IsString()
    @IsNotEmpty()
    password: string
} 