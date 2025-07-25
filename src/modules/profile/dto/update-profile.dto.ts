import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class UpdateMyProfileDto {

    @ApiProperty({example: "John Doe", required: false})
    @IsOptional()
    @IsString()
    fullName: string

    @ApiProperty({example: 'image.png', required: false})
    @IsOptional()
    @IsString()
    image?: string
}