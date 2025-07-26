import { ApiProperty } from "@nestjs/swagger"
import { IsMobilePhone, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator"

export class CreateAssistantDto {

    @ApiProperty({example: '+998901234567'})
    @IsString()
    @IsNotEmpty()
    phone: string

    @ApiProperty({example: 'John Doe'})
    @IsString()
    @IsNotEmpty()
    fullName: string

    @ApiProperty({example: 'password123'})
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string

    @ApiProperty({example: 1})
    @IsNotEmpty()
    @IsNumber()
    courseId: number
}
