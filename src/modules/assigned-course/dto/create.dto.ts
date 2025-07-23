import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateAssignedCourseDto {
    @IsNumber()
    @IsNotEmpty()
    usersId: number

    @IsNumber()
    @IsNotEmpty()
    courseId: number
}