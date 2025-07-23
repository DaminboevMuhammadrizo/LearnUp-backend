import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsIn, IsInt, IsNumber, IsString, ValidateNested } from "class-validator";


export class AnswerDto {
  @IsInt()
  id: number

  @IsString()
  @IsIn(['variantA', 'variantB', 'variantC', 'variantD'])
  answer: string
}


export class AnswerExamPassDto {
  @IsNumber()
  lessonGroupId: number

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => AnswerDto)
  answers: AnswerDto[]
}
