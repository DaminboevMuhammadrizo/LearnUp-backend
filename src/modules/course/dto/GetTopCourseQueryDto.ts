import { IsInt, IsOptional } from "class-validator";

export class GetTopCourseQueryDto {

    @IsOptional()
    @IsInt()
    categoryId?: number;
}