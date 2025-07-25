import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCourseCateforyDto {

    @ApiProperty({example: 1})
    @IsNumber()
    @IsNotEmpty()
    id: number

    @ApiProperty({example: "Programming"})
    @IsString()
    @IsOptional()
    name: string
}