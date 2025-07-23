import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateLessonModuleDto {

    @IsNumber()
    @IsNotEmpty()
    id: number

    @IsString()
    @IsOptional()
    name?: string

}