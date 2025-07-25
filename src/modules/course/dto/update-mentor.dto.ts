import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMentorDto {

  @ApiProperty({example: 1})
  @Type(() => Number)
  @IsInt()
  courseId: number;

  @ApiProperty({example: 1})
  @Type(() => Number)
  @IsInt()
  userId: number;
}
