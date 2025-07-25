import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class ViewPutDto {

    @ApiProperty({example: true})
    @IsBoolean()
    view: boolean

    @ApiProperty({example: 'example.com'})
    @IsOptional()
    @IsString()
    url?: string
}