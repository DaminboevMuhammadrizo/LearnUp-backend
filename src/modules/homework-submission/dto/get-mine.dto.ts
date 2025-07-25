import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsOptional, IsPositive } from "class-validator"

export class GetMineHomewrokSubmissionDto {

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
}