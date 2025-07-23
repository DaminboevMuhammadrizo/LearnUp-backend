import { IsMobilePhone, IsNotEmpty, IsNumber, IsString, Matches, MinLength } from "class-validator";

export class CreateMentorDto {

    @IsNotEmpty()
    @IsMobilePhone('uz-UZ')
    phone: string

    @IsNotEmpty()
    @IsString()
    fullName: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string

    @IsNotEmpty()
    @IsNumber()
    experience: number

    @IsNotEmpty()
    @IsString()
    job: string

    @IsNotEmpty()
    @IsString()
    about: string

    @IsNotEmpty()
    @IsString()
    @Matches(/^https:\/\/t\.me\/[a-zA-Z0-9_]{5,32}$/)
    telegram: string

    @IsNotEmpty()
    @IsString()
    @Matches(/^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9_.-]+$/)
    facebook: string

    @IsNotEmpty()
    @IsString()
    @Matches(/^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+$/)
    instagram: string

    @IsNotEmpty()
    @IsString()
    @Matches(/^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+$/)
    linkedin: string

    @IsNotEmpty()
    @IsString()
    @Matches(/^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+$/)
    github: string

    @IsNotEmpty()
    @IsString()
    @Matches(/^https?:\/\/[^\s]+$/)
    website: string
}