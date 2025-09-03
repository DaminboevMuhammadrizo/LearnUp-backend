import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCourseCateforyDto {

    @ApiProperty({example: 'Programming'})
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({example: 1})
    @IsInt()
    categoryTypesId: number   
}