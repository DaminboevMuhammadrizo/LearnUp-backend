import { IsNumber, IsOptional } from "class-validator";

export class GetAllQueryDto {

    @IsNumber()
    @IsOptional()
    limit?: number

    @IsNumber()
    @IsOptional()
    offset?: number
}