import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsIn, IsInt, IsNumber, IsString, ValidateNested } from "class-validator";


export class AnswerDto {

  @ApiProperty({example: 1})
  @IsInt()
  id: number

  @ApiProperty({example: 'variantA'})
  @IsString()
  @IsIn(['variantA', 'variantB', 'variantC', 'variantD'])
  answer: string
}


export class AnswerExamPassDto {

  @ApiProperty({example: 1})
  @IsNumber()
  lessonGroupId: number

  @ApiProperty({example: [1, 2, 3]})
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => AnswerDto)
  answers: AnswerDto[]
}
