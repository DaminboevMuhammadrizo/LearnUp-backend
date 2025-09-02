import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCourseMentorDto {

  @ApiProperty({example: 1})
  @Type(() => Number)
  @IsInt()
  courseId: number;

  @ApiProperty({example: 1})
  @Type(() => Number)
  @IsInt()
  userId: number;
}
