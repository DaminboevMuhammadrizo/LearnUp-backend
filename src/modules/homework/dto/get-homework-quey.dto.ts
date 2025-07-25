import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive } from "class-validator";

export class GetHomeworkQueryDto {

    @ApiProperty({example: 1, required: false})
    @IsOptional()
    @IsInt()
    offset?: number;

    @ApiProperty({example: 10, required: false})
    @IsOptional()
    @IsInt()
    limit?: number;

    @ApiProperty({example: 1, required: false})
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    lessonId?: number;
}