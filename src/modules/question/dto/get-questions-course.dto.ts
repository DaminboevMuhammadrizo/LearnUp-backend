import { IsBoolean, IsInt, IsOptional, IsPositive } from "class-validator"

export class GetQuestionsCourseDto {

    @IsInt()
    @IsPositive()
    courseId: number

    @IsOptional()
    @IsInt()
    @IsPositive()
    offset: number

    @IsOptional()
    @IsInt()
    @IsPositive()
    limit: number

    @IsOptional()
    @IsBoolean()
    read: boolean

    @IsOptional()
    @IsBoolean()
    answered: boolean

}