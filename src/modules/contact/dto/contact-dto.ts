import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsMobilePhone, IsNotEmpty, IsString, MaxLength } from "class-validator"

export class ContactDto {

    @ApiProperty({example: 'John Doe'})
    @IsNotEmpty()
    @IsString()
    fullName: string

    @ApiProperty({example: 'm701rizo@gmail.com'})
    @IsEmail()
    email: string

    @ApiProperty({example: '@johndoe'})    
    @IsString()
    telegram: string

    @ApiProperty({example: 'I have a question about your services.'})
    @IsString()
    @MaxLength(10000)
    message: string
}