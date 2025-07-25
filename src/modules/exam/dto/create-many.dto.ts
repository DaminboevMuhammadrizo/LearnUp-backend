import { ArrayNotEmpty, IsArray, IsNumber, ValidateNested } from "class-validator";
import { CreateExamDto } from "./create-exam.dto";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateManyExamDto {

    @ApiProperty({example: 1})
    @IsNumber()
    lessonModuleId: number

    @ApiProperty({
        type: [CreateExamDto],
        description: 'Array of exam objects to be created',
        isArray: true
    })
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateExamDto)
    exams: CreateExamDto[]
}