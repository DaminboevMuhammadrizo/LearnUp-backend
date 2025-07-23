import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class getMineAllDto {

    @IsNumber()
    @IsOptional()
    limit?: number

    @IsNumber()
    @IsOptional()
    offset?: number

    @IsBoolean()
    @IsNotEmpty()
    include_lesson: boolean

    @IsNumber()
    @IsNotEmpty()
    courseId: number
}