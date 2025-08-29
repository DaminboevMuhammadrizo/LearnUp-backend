import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator"

export class CreateAssistantDto {

    @ApiProperty({example: 'm701rizo@gmail.com'})
    @IsEmail()
    email: string

    @ApiProperty({example: 'John Doe'})
    @IsString()
    @IsNotEmpty()
    fullName: string

    @ApiProperty({example: '12345678'})
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string

    @ApiProperty({example: 1})
    @IsNotEmpty()
    @IsNumber()
    courseId: number
}
