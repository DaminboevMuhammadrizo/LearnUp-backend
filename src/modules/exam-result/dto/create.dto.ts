import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsPositive } from 'class-validator';

export class CreateExamResultDto {

  @ApiProperty({example: 1})
  @IsInt()
  @IsPositive()
  lessonModuleId: number;

  @ApiProperty({example: 1})
  @IsInt()
  @IsPositive()
  usersId: number;

  @ApiProperty({example: true})
  @IsBoolean()
  passed: boolean;

  @ApiProperty({example: 10})
  @IsInt()
  corrects: number;

  @ApiProperty({example: 5})
  @IsInt()
  wrongs: number;
}
