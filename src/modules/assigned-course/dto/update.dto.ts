import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class UpdateAssignedCourseDto {

    @ApiProperty({example: 1})
    @IsNotEmpty()
    @IsNumber()
    id: number
    
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsOptional()
    usersId?: number

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsOptional()
    courseId?: number
}