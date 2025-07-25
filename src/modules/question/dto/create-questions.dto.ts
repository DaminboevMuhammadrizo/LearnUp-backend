import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateQuestionDto {

  @ApiProperty({example: 1})
  @IsInt()
  courseId: number;

  @ApiProperty({example: 'What is the capital of France?'})
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({example: 'file.pdf', required: false})
  @IsOptional()
  @IsString()
  file?: string;
}
