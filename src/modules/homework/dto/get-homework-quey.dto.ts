import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive } from "class-validator";

export class GetHomeworkQueryDto {

    @IsOptional()
    @IsInt()
    offset?: number;

    @IsOptional()
    @IsInt()
    limit?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    lessonId?: number;
}