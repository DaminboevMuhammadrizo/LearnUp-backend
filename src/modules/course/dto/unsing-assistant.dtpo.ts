import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class UnassignAssistantDto {

  @ApiProperty({example: 1})
  @IsInt()
  @IsPositive()
  assistantId: number;

  @ApiProperty({example: 1})
  @IsInt()
  @IsPositive()
  courseId: number;
}
