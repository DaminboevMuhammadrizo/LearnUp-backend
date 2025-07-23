import { ArrayNotEmpty, IsArray, IsNumber, ValidateNested } from "class-validator";
import { CreateExamDto } from "./create-exam.dto";
import { Type } from "class-transformer";

export class CreateManyExamDto {

    @IsNumber()
    lessonModuleId: number

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateExamDto)
    exams: CreateExamDto[]
}