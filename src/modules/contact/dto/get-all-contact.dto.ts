import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsInt, IsOptional, IsString } from "class-validator"

export class GetAllContactDto {


    @ApiProperty({example: 10, required: false})
    @IsOptional()
    @IsInt()
    limit: number

    @ApiProperty({example: 1, required: false})
    @IsOptional()
    @IsInt()
    offset: number

    @ApiProperty({example: '@Muhammadrizo_Daminboev', required: false})
    @IsOptional()
    @IsString()
    telegram: string

    @ApiProperty({example: 'hi', required: false})
    @IsOptional()
    @IsString()
    word: string

    @ApiProperty({example: 'm701rizo@gmail.com', required: false})
    @IsOptional()
    @IsEmail()
    email: string
}