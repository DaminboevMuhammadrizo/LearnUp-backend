import { IsMobilePhone, IsNumber, IsOptional, IsString, MinLength } from "class-validator"

export class UpdateAssistantDto {

    @IsMobilePhone('uz-UZ')
    @IsOptional()
    phone?: string

    @IsString()
    @IsOptional()
    fullName?: string

    @IsString()
    @MinLength(6)
    @IsOptional()
    password?: string

}
