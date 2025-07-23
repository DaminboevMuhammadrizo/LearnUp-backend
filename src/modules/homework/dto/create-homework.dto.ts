import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHomeworkDto {
  @IsNotEmpty()
  @IsString()
  task: string;

  @IsOptional()
  @IsString()
  file?: string;

  @IsInt()
  lessonId: number;
}
