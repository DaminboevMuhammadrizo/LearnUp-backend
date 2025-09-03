import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCourseCateforyDto {

    @ApiProperty({example: 1})
    @IsNumber()
    @IsNotEmpty()
    id: number

    @ApiProperty({example: "Programming", required: false})
    @IsString()
    @IsOptional()
    name: string


    @ApiProperty({example: 1, required: false})
    @IsOptional()
    @IsInt()
    categoryTypesId: number
}