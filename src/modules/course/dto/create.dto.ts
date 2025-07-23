import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsString, MaxLength } from 'class-validator';
import { Level } from 'src/common/types/level';

export class CreateCourseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  about: string

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  price: number

  @ApiProperty()
  @IsEnum(Level)
  level: Level

  @ApiProperty()
  @IsNumber()
  categoryId: number

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  banner: string

  @ApiProperty()
  introVideo?: string
}
