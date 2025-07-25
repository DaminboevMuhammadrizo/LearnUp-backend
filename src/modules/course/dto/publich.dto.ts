import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PublishCourseParamDto {


  @ApiProperty({example: 1})
  @IsInt()
  id: number;
}
