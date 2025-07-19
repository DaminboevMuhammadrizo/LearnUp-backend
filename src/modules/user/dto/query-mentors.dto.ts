import { IsNumber, IsOptional, IsString } from "class-validator"

export class QueryMentorsDto {

    @IsOptional()
    @IsNumber()
    offset?: number

    @IsOptional()
    @IsNumber()
    limit?: number

    @IsOptional()
    @IsString()
    search?: string
}