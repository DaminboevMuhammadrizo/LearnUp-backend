import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsInt, IsOptional, IsPositive } from "class-validator"

export class GetMineQuestionsDto {

    @ApiProperty({example: 1, required: false})
    @IsOptional()
    @IsInt()
    @IsPositive()
    offset: number

    @ApiProperty({example: 10, required: false})
    @IsOptional()
    @IsInt()
    @IsPositive()
    limit: number

    @ApiProperty({example: true, required: false})
    @IsOptional()
    @IsBoolean()
    read: boolean

    @ApiProperty({example: true, required: false})
    @IsOptional()
    @IsBoolean()
    answered: boolean

    @ApiProperty({example: 1, required: false})
    @IsOptional()
    @IsInt()
    @IsPositive()
    courseId: number
}