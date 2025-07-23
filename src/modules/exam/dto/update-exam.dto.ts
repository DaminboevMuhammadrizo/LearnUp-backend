import { ExamAnswer } from "src/common/types/exam-answer"
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateExamDto {

  @IsNotEmpty()
  @IsNumber()
  id: number

  @IsString()
  @IsOptional()
  question?: string

  @IsNumber()
  @IsOptional()
  lessonGroupId?: number

  @IsString()
  @IsOptional()
  variantA?: string

  @IsString()
  @IsOptional()
  variantB?: string

  @IsString()
  @IsOptional()
  variantC?: string

  @IsString()
  @IsOptional()
  variantD?: string

  @IsString()
  @IsEnum(ExamAnswer)
  answer?: ExamAnswer
}