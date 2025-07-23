import { IsBoolean, IsInt, IsPositive } from 'class-validator';

export class CreateExamResultDto {
  @IsInt()
  @IsPositive()
  lessonModuleId: number;

  @IsInt()
  @IsPositive()
  usersId: number;

  @IsBoolean()
  passed: boolean;

  @IsInt()
  corrects: number;

  @IsInt()
  wrongs: number;
}
