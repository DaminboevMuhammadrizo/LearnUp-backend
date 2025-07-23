import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateeLessonDto {
    
    @IsInt()
    id: number;

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    about: string;

    @IsString()
    @IsOptional()
    video: string;

    @IsString()
    @IsOptional()
    videoUrl: string;
}