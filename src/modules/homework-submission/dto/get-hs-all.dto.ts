import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class GetHomewrokSubmissionsAllQueryDto {
  @IsOptional()
  @IsNumberString()
  lesson_id?: string;

  @IsOptional()
  @IsNumberString()
  homework_id?: string;

  @IsOptional()
  @IsNumberString()
  user_id?: string;

}
