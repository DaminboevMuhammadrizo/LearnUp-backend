import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class TopQueryDto {

    @ApiPropertyOptional({ description: 'Kurslar kategoriyasi ID si', example: 'categoryId', required: false })
    @IsOptional()
    @IsInt()
    categoryId?: number;
}