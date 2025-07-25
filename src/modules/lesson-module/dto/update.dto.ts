import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateLessonModuleDto {

    @ApiProperty({example: 1})
    @IsNumber()
    @IsNotEmpty()
    id: number

    @ApiProperty({example: "Programming Basics"})
    @IsString()
    @IsOptional()
    name?: string

}