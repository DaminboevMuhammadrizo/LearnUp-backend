import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsNotEmpty, IsOptional, IsInt, } from 'class-validator';
import { Level } from 'src/common/types/level';

export class CreateCourseDto {
  @ApiProperty({example: 'John Doe'})
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({example: 'This is a course about advanced programming techniques.'})
  @IsString()
  @IsNotEmpty()
  about: string;

  @ApiProperty({example: 500})
  @IsNumber()
  price: number;

  @ApiProperty({example: Level.BEGINNER})
  @IsEnum(Level)
  level: Level;

  @ApiProperty({example: 1})
  @IsInt()
  categoryId: number;
  
  @ApiProperty({example: 1})
  @IsInt()
  mentorProfileId: number

  @ApiProperty({example: 'banner.jpg'})
  @IsOptional()
  @IsString()
  banner?: string

  @ApiProperty({example: 'intro.mp4'})
  @IsOptional()
  @IsString()
  introVideo?: string
}
