import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateQuestionDto {

    @ApiProperty({example: 1})
    @IsInt()
    @IsPositive()
    id: number

    @ApiProperty({example: 'Updated question text', required: false})
    @IsOptional()
    @IsString()
    text?: string;

    @ApiProperty({example: 'file123.jpg', required: false})
    @IsOptional()
    @IsString()
    file?: string;
}
