import { IsNotEmpty, IsString } from "class-validator";

export class CreateCourseCateforyDto {

    @IsString()
    @IsNotEmpty()
    name: string
}