import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class UpdateCategoryTypeDto {
  @ApiProperty({ example: '123', description: 'Yangilanishi kerak bo‘lgan category-type ID' })
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 'Maishiy texnika', description: 'Yangi nom (ixtiyoriy)' })
  @IsString()
  name: string;
}
