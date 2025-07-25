import { ExamAnswer } from "src/common/types/exam-answer"
import { IsEnum, IsNumber, IsNotEmpty, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateExamDto {

  @ApiProperty({example: 'What is the capital of France?'})
  @IsString()
  @IsNotEmpty()
  question: string

  @ApiProperty({example: 1})
  @IsNumber()
  @IsNotEmpty()
  lessonModuleId: number

  @ApiProperty({example: 'Paris'})
  @IsString()
  @IsNotEmpty()
  variantA: string

  @ApiProperty({example: 'London'})
  @IsString()
  @IsNotEmpty()
  variantB: string

  @ApiProperty({example: 'Berlin'})
  @IsString()
  @IsNotEmpty()
  variantC: string

  @ApiProperty({example: 'Madrid'})
  @IsString()
  @IsNotEmpty()
  variantD: string

  @ApiProperty({example: 'A'})
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