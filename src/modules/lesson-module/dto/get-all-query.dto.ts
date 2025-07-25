import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class GetAllQueryDto {

    @ApiProperty({example: 10, required: false})
    @IsNumber()
    @IsOptional()
    limit?: number

    @ApiProperty({example: 1, required: false})
    @IsNumber()
    @IsOptional()
    offset?: number
}