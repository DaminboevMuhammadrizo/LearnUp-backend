import { ApiProperty } from "@nestjs/swagger"
import { IsMobilePhone, IsNumber, IsOptional, IsString, MinLength } from "class-validator"

export class UpdateAssistantDto {

    @ApiProperty({example: '+998901234567', required: false})
    @IsMobilePhone('uz-UZ')
    @IsOptional()
    phone?: string

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
