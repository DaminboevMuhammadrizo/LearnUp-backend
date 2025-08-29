import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsMobilePhone, IsNumber, IsOptional, IsString, Matches } from "class-validator";

export class UpdateMentorDto {

    @ApiProperty({example: 'm701rizo@gmail.com', required: false})
    @IsOptional()
    @IsEmail()
    email: string

    @ApiProperty({example: 'John Doe', required: false})
    @IsOptional()
    @IsString()
    fullName: string

    @ApiProperty({example: 10, required: false})
    @IsOptional()
    @IsNumber()
    experience: number

    @ApiProperty({example: 'Software Engineer', required: false})
    @IsOptional()
    @IsString()
    job: string

    @ApiProperty({example: 'I am a software engineer with over 10 years of experience.', required: false})
    @IsOptional()
    @IsString()
    about: string

    @ApiProperty({example: 'https://t.me/username', required: false})
    @IsOptional()
    @IsString()
    @Matches(/^https:\/\/t\.me\/[a-zA-Z0-9_]{5,32}$/)
    telegram: string

    @ApiProperty({example: 'https://www.facebook.com/username', required: false})
    @IsOptional()
    @IsString()
    @Matches(/^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9_.-]+$/)
    facebook: string

    @ApiProperty({example: 'https://www.instagram.com/username', required: false})
    @IsOptional()
    @IsString()
    @Matches(/^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+$/)
    instagram: string

    @ApiProperty({example: 'https://www.linkedin.com/in/username', required: false})
    @IsOptional()
    @IsString()
    @Matches(/^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+$/)
    linkedin: string

    @ApiProperty({example: 'https://www.github.com/username', required: false})
    @IsOptional()
    @IsString()
    @Matches(/^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+$/)
    github: string

    @ApiProperty({example: 'https://www.website.com', required: false})
    @IsOptional()
    @IsString()
    @Matches(/^https?:\/\/[^\s]+$/)
    website: string
}