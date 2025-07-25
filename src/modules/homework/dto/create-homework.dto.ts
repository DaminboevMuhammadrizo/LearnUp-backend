import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHomeworkDto {
  @ApiProperty({example: 'Complete the math exercises'})
  @IsNotEmpty()
  @IsString()
  task: string;

  @ApiProperty({example: 'file.pdf', required: false})
  @IsOptional()
  @IsString()
  file?: string;

  @ApiProperty({example: 1})
  @IsInt()
  lessonId: number;
}
