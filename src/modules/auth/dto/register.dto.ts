import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMobilePhone, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { UserRole } from "src/common/types/userRole";

export class RegisterDto {

    @ApiProperty({example: '+998901234567'})
    @IsMobilePhone('uz-UZ')
    phone: string

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

    @ApiProperty({example: 'img.png'})
    @IsString()
    img?: string
}