import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class TopQueryDto {

    @ApiPropertyOptional({ description: 'Kurslar kategoriyasi ID si', example: 2, required: false })
    @IsOptional()
    @IsInt()
    categoryId?: number;
}