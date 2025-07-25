import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateAssignedCourseDto {

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    usersId: number

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    courseId: number
}