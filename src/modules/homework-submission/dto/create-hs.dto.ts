import { IsInt, IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';
import { HomeworkSubStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHomeworkSubmissionDto {
  @ApiProperty({example: 'This is a text submission'})
  @IsOptional()
  @IsString()
  text?: string;

  @ApiProperty({example: 'file.pdf'})
  @IsNotEmpty()
  @IsString()
  file: string;

  @ApiProperty({example: 'This is a reason for the submission'})
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiProperty({example: HomeworkSubStatus.PENDING})
  @IsOptional()
  @IsEnum(HomeworkSubStatus)
  status?: HomeworkSubStatus;

  @ApiProperty({example: 1})
  @ApiProperty({example: 1})
  @IsInt()
  homeworkId: number;

  @ApiProperty({example: 1})
  @IsInt()
  usersId: number;
}
