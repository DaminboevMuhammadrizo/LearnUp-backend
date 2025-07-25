import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Level } from "src/common/types/level";

export class GetAllCourseDto {

    @ApiProperty({example: 10, required: false})
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

    @ApiProperty({example: '2023-01-01', required: false})
    @IsOptional()
    @IsEnum(Level)
    level: Level

    @ApiProperty({example: '2023-01-01', required: false})
    @IsOptional()
    @IsNumber()
    price_min: number

    @ApiProperty({example: '2023-01-01', required: false})
    @IsOptional()
    @IsNumber()
    price_max: number

    @ApiProperty({example: true, required: false})
    @IsOptional()
    @IsBoolean()
    published: boolean
}