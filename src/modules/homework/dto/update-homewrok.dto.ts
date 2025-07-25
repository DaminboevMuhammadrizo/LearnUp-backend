import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateHomeworkDto {

  @ApiProperty({example: 'Updated homework task'})
  @IsOptional()
  @IsString()
  task?: string;

  @ApiProperty({example: 'file.pdf'})
  @IsOptional()
  @IsString()
  file?: string;

  @ApiProperty({example: 1})
  @IsOptional()
  @IsInt()
  lessonId?: number;
}
