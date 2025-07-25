import { IsInt, IsOptional, IsArray, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonFileDto {

  @ApiProperty({example: 1})
  @Type(() => Number)
  @IsInt()
  lessonId: number;

  @ApiProperty({example: 'Introduction to Programming'})
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  notes?: string[];
}
