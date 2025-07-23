import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetQueryDto {

    @IsNumber()
    @IsOptional()
    limit?: number

    @IsOptional()
    @IsNumber()
    page?: number

    @IsOptional()
    @IsString()
    search: string
}