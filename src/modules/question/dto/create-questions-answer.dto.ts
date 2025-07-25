import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class createQuestionsAnswerDto {

    @ApiProperty({example: "This is an answer to the question."})
    @IsNotEmpty()
    @IsString()
    text: string

    @ApiProperty({example: "https://example.com/file.pdf", required: false})
    @IsOptional()
    @IsString()
    file?: string
}