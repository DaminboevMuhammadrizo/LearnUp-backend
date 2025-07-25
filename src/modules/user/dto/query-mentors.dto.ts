import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsOptional, IsString } from "class-validator"

export class QueryMentorsDto {

    @ApiProperty({example: 1, required: false})
    @IsOptional()
    @IsNumber()
    offset?: number

    @ApiProperty({example: 10, required: false})
    @IsOptional()
    @IsNumber()
    limit?: number

    @ApiProperty({example: "John", required: false})
    @IsOptional()
    @IsString()
    search?: string
}