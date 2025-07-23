import { IsMobilePhone, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator"

export class CreateAssistantDto {

    @IsMobilePhone('uz-UZ')
    @IsNotEmpty()
    phone: string

    @IsString()
    @IsNotEmpty()
    fullName: string

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    @IsNumber()
    courseId: number
}
