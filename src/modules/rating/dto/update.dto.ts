import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateRatingDto {
    
    @IsNumber()
    @IsNotEmpty()
    id: number
    
    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    rate?: number

    @IsString()
    @IsOptional()
    comment?: string
}