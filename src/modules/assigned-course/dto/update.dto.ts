import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class UpdateAssignedCourseDto {

    @IsNotEmpty()
    @IsNumber()
    id: number
    
    @IsNumber()
    @IsOptional()
    usersId?: number

    @IsNumber()
    @IsOptional()
    courseId?: number
}