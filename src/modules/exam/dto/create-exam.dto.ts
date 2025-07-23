import { ExamAnswer } from "src/common/types/exam-answer"
import { IsEnum, IsNumber, IsNotEmpty, IsString } from "class-validator"

export class CreateExamDto {
  @IsString()
  @IsNotEmpty()
  question: string

  @IsNumber()
  @IsNotEmpty()
  lessonModuleId: number

  @IsString()
  @IsNotEmpty()
  variantA: string

  @IsString()
  @IsNotEmpty()
  variantB: string

  @IsString()
  @IsNotEmpty()
  variantC: string

  @IsString()
  @IsNotEmpty()
  variantD: string

  @IsString()
  @IsEnum(ExamAnswer)
  answer: ExamAnswer
}


// export class ExamDto {
//   @IsString()
//   question: string

//   @IsString()
//   variantA: string

//   @IsString()
//   variantB: string

//   @IsString()
//   variantC: string

//   @IsString()
//   variantD: string

//   @IsString()
//   answer: string
// }