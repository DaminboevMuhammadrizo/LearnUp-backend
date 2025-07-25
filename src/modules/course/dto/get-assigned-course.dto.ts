import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Level } from "src/common/types/level";

export class GetAssignedCoursesDto {

  @ApiProperty({example: 1, required: false})
  @IsOptional()
  @IsNumber()
  limit?: number;

  @ApiProperty({example: 1, required: false})
  @IsOptional()
  @IsNumber()
  offset?: number;

  @ApiProperty({example: 'JavaScript', required: false})
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({example: 'beginner', required: false})
  @IsOptional()
  @IsEnum(Level)
  level?: Level;

  @ApiProperty({example: 100, required: false})
  @IsOptional()
  @IsNumber()
  price_min?: number;

  @ApiProperty({example: 500, required: false})
  @IsOptional()
  @IsNumber()
  price_max?: number;

  @ApiProperty({example: 1, required: false})
  @IsOptional()
  @IsNumber()
  category_id?: number;

  @ApiProperty({example: 1, required: false})
  @IsOptional()
  @IsNumber()
  mentor_id?: number;

  @ApiProperty({example: true, required: false})
  @IsOptional()
  @IsBoolean()
  published?: boolean;
}
