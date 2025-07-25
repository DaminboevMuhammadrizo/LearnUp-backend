import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateRatingDto {

    @ApiProperty({example: 1})
    @IsNumber()
    @IsNotEmpty()
    id: number
    
    @ApiProperty({example: 5, required: false})
    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    rate?: number

    @ApiProperty({example: "Great service!", required: false})
    @IsString()
    @IsOptional()
    comment?: string
}