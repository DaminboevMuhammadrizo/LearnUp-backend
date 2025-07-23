import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateLessonDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    about: string;

    @IsInt()
    lessonModuleId: number;

    @IsString()
    @IsNotEmpty()
    video: string;

    @IsString()
    @IsNotEmpty()
    videoUrl: string;
}