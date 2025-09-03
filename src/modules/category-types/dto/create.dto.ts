import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryTypeDto {
  @ApiProperty({ example: 'Elektronika', description: 'Kategoriya turi nomi' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
