import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateQuestionDto {

    @IsInt()
    @IsPositive()
    id: number

    @IsOptional()
    @IsString()
    text?: string;

    @IsOptional()
    @IsString()
    file?: string;
}
