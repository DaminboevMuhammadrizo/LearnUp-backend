import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsString, Matches, MinLength } from "class-validator";

export class CreateMentorDto {

    @ApiProperty({example: 'm701rizo@gmail.com'})
    @IsEmail()
    email: string

    @ApiProperty({example: 'John Doe'})
    @IsNotEmpty()
    @IsString()
    fullName: string

    @ApiProperty({example: '12345678'})
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string

    @ApiProperty({example: 5})
    @IsNotEmpty()
    @IsNumber()
    experience: number

    @ApiProperty({example: 'Software Engineer'})
    @IsNotEmpty()
    @IsString()
    job: string

    @ApiProperty({example: 'I am a software engineer with over 5 years of experience in full-stack development.'})
    @IsNotEmpty()
    @IsString()
    about: string

    @ApiProperty({example: 'https://t.me/username'})
    @IsNotEmpty()
    @IsString()
    @Matches(/^https:\/\/t\.me\/[a-zA-Z0-9_]{5,32}$/)
    telegram: string

    @ApiProperty({example: 'https://www.facebook.com/username'})
    @IsNotEmpty()
    @IsString()
    @Matches(/^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9_.-]+$/)
    facebook: string

    @ApiProperty({example: 'https://www.instagram.com/username'})
    @IsNotEmpty()
    @IsString()
    @Matches(/^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+$/)
    instagram: string

    @ApiProperty({example: 'https://www.linkedin.com/in/username'})
    @IsNotEmpty()
    @IsString()
    @Matches(/^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+$/)
    linkedin: string

    @ApiProperty({example: 'https://www.github.com/username'})
    @IsNotEmpty()
    @IsString()
    @Matches(/^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+$/)
    github: string

    @ApiProperty({example: 'https://www.website.com'})
    @IsNotEmpty()
    @IsString()
    @Matches(/^https?:\/\/[^\s]+$/)
    website: string
}