import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCourseCateforyDto {

    @IsNumber()
    @IsNotEmpty()
    id: number

    @IsString()
    @IsOptional()
    name: string
}