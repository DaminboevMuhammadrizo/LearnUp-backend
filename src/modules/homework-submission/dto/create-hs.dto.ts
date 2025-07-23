import { IsInt, IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';
import { HomeworkSubStatus } from '@prisma/client';

export class CreateHomeworkSubmissionDto {
  @IsOptional()
  @IsString()
  text?: string;

  @IsNotEmpty()
  @IsString()
  file: string;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsEnum(HomeworkSubStatus)
  status?: HomeworkSubStatus;

  @IsInt()
  homeworkId: number;

  @IsInt()
  usersId: number;
}
