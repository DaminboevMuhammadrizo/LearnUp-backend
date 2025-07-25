import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateLessonModuleDto {

    @ApiProperty({example: 'Programming Basics'})
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({example: 1})
    @IsNumber()
    @IsNotEmpty()
    courseId: number
}