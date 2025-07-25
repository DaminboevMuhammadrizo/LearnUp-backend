import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
    @ApiProperty({example: 1, required: false})
    @IsOptional()
    @IsNumber()
    offset?: number;

    @ApiProperty({example: 10, required: false})
    @IsOptional()
    @IsNumber()
    limit?: number;
}
