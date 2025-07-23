import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateHomeworkDto {
  @IsOptional()
  @IsString()
  task?: string;

  @IsOptional()
  @IsString()
  file?: string;

  @IsOptional()
  @IsInt()
  lessonId?: number;
}
