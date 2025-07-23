import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateLessonModuleDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    courseId: number
}