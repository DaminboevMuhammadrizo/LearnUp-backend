import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateLessonDto {

    @ApiProperty({example: 'Programming Basics'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: 'An introduction to programming concepts.'})
    @IsString()
    @IsNotEmpty()
    about: string;

    @ApiProperty({example: 1})
    @IsInt()
    lessonModuleId: number;

    @ApiProperty({example: 'https://example.com/video.mp4'})
    @IsString()
    @IsNotEmpty()
    video: string;
}