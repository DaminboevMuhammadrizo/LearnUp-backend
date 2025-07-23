import { IsEnum, IsNumber, IsOptional } from "class-validator";

export enum Ball {
    MAX = 'MAX',
    MIN = 'MIN'
}
export class GetExamResultsDto {

    @IsNumber()
    @IsOptional()
    offset?: number;

    @IsNumber()
    @IsOptional()
    limit?: number;

    @IsEnum(Ball)
    @IsOptional()
    ball: Ball;
}