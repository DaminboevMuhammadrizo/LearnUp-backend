import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateQuestionDto {

  @IsInt()
  courseId: number;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsString()
  file?: string;
}
