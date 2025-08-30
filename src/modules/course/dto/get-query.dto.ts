import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import { Level } from "src/common/types/level";

export class GetQueryDto {

    @ApiProperty({example: 1, required: false})
    @IsNumber()
    @IsOptional()
    limit?: number

    @ApiProperty({example: 1, required: false})
    @IsOptional()
    @IsNumber()
    offset?: number

    @ApiProperty({example: 'JavaScript', required: false})
    @IsOptional()
    @IsString()
    search: string

    @ApiProperty({example: Level.BEGINNER, required: false})
    @IsOptional()
    @IsEnum(Level)
    level: Level

    @ApiProperty({example: 741, required: false})
    @IsOptional()
    @IsNumber()
    price_min: number

    @ApiProperty({example: 1000, required: false})
    @IsOptional()
    @IsNumber()
    price_max: number

    @ApiProperty({example: 2, required: false})
    @IsOptional()
    @IsInt()
    courseCategoryId: number
}