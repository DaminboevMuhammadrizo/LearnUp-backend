import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsOptional, IsString } from "class-validator"

export class GetMineDto {

    @ApiProperty({example: 1, required: false})
    @IsOptional()
    @IsInt()
    offset: number

    @ApiProperty({example: 20, required: false})
    @IsOptional()
    @IsInt()
    limit: number

    @ApiProperty({example: 1, required: false})
    @IsOptional()
    @IsInt()
    courseId: number
}