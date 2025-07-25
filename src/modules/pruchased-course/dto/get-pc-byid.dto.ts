import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsOptional, IsString } from "class-validator"

export class getPurchaseCourseByIdQueryDto {

    @ApiProperty({example: 1})
    @IsOptional()
    @IsInt()
    offset: number

    @ApiProperty({example: 10})
    @IsOptional()
    @IsInt()
    limit: number

}
