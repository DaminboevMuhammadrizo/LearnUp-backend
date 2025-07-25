import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class getMineAllDto {

    @ApiProperty({example: 10, required: false})
    @IsNumber()
    @IsOptional()
    limit?: number

    @ApiProperty({example: 1, required: false})
    @IsNumber()
    @IsOptional()
    offset?: number

    @ApiProperty({example: true, required: true})
    @IsBoolean()
    @IsNotEmpty()
    include_lesson: boolean

    @ApiProperty({example: 1, required: true})
    @IsNumber()
    @IsNotEmpty()
    courseId: number
}