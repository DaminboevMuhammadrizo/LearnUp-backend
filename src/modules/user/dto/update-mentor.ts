import { IsMobilePhone, IsNumber, IsOptional, IsString, Matches } from "class-validator";

export class UpdateMentorDto {

    @IsOptional()
    @IsMobilePhone('uz-UZ')
    phone: string

    @IsOptional()
    @IsString()
    fullName: string

    @IsOptional()
    @IsNumber()
    experience: number

    @IsOptional()
    @IsString()
    job: string

    @IsOptional()
    @IsString()
    about: string

    @IsOptional()
    @IsString()
    @Matches(/^https:\/\/t\.me\/[a-zA-Z0-9_]{5,32}$/)
    telegram: string

    @IsOptional()
    @IsString()
    @Matches(/^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9_.-]+$/)
    facebook: string

    @IsOptional()
    @IsString()
    @Matches(/^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+$/)
    instagram: string

    @IsOptional()
    @IsString()
    @Matches(/^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+$/)
    linkedin: string

    @IsOptional()
    @IsString()
    @Matches(/^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+$/)
    github: string

    @IsOptional()
    @IsString()
    @Matches(/^https?:\/\/[^\s]+$/)
    website: string
}