import { ExamAnswer } from "src/common/types/exam-answer"
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class UpdateExamDto {

  @ApiProperty({example: 1})
  @IsNotEmpty()
  @IsNumber()
  id: number

  @ApiProperty({example: 'What is the capital of France?'})
  @IsString()
  @IsOptional()
  question?: string

  @ApiProperty({example: 'Paris'})
  @IsNumber()
  @IsOptional()
  lessonGroupId?: number

  @ApiProperty({example: 'A'})
  @IsString()
  @IsOptional()
  variantA?: string

  @ApiProperty({example: 'B'})
  @IsString()
  @IsOptional()
  variantB?: string

  @ApiProperty({example: 'C'})
  @IsString()
  @IsOptional()
  variantC?: string

  @ApiProperty({example: 'D'})
  @IsString()
  @IsOptional()
  variantD?: string

  @ApiProperty({example: 'A'})
  @IsString()
  @IsEnum(ExamAnswer)
  answer?: ExamAnswer
}