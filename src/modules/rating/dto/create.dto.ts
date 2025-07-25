import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRatingDto {

    @ApiProperty({example: 5})
    @IsNumber()
    @Type(() => Number)
    @IsNotEmpty()
    rate: number

    @ApiProperty({example: "Great course!", required: false})
    @IsString()
    @IsOptional()
    comment?: string

    @ApiProperty({example: 1})
    @IsNumber()
    @IsNotEmpty()
    courseId: number
}