import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateeLessonDto {

    @ApiProperty({example: 1})
    @IsInt()
    id: number;

    @ApiProperty({example: "Project Management"})
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({example: "This lesson covers the basics of project management."})
    @IsString()
    @IsOptional()
    about: string;

    @ApiProperty({example: "video.mp4"})
    @IsString()
    @IsOptional()
    video: string;
}