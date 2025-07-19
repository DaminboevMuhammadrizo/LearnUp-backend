import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateAdminDto {
    @IsNumber()
    @IsNotEmpty()
    user_id: number
}