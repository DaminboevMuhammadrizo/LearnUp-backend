import { IsOptional, IsNumberString, IsInt, IsPositive } from 'class-validator';

export class GetHomewrokSubmissionsAllQueryDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  lesson_id?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  homework_id?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  user_id?: number;

}
