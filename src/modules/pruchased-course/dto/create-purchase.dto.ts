import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive } from "class-validator";

export class CreatePurchasedDto {

    @ApiProperty({example: 1})
    @IsInt()
    @IsPositive()
    courseId: number
}