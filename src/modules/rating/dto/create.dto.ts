import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRatingDto {

    @IsNumber()
    @Type(() => Number)
    @IsNotEmpty()
    rate: number

    @IsString()
    @IsOptional()
    comment?: string

    @IsNumber()
    @IsNotEmpty()
    courseId: number
}