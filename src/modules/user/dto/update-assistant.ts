import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator"

export class UpdateAssistantDto {

    @ApiProperty({example: 'm701rizo@gmail.com', required: false})
    @IsEmail()
    @IsOptional()
    email?: string

    @ApiProperty({example: 'John Doe', required: false})
    @IsString()
    @IsOptional()
    fullName?: string

    @ApiProperty({example: 'password123', required: false})
    @IsString()
    @MinLength(6)
    @IsOptional()
    password?: string

}
