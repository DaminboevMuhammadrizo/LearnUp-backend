import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateAdminDto {
    @ApiProperty({example: '+998975661099'})
    @IsString()
    phone: string

    @ApiProperty({example: 'John Doe'})
    @IsString()
    @IsNotEmpty()
    fullName: string

    @ApiProperty({example: 'password123'})
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string
}