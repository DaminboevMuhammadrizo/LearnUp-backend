import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateMentorDto {
    @IsNumber()
    @IsNotEmpty()
    user_id: number
}