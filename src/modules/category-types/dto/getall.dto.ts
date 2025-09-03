import { IsInt, IsOptional, IsString } from "class-validator"

export class GetAllCategoryTypesQueryDto {

    @IsOptional()
    @IsInt()
    limit: number

    @IsOptional()
    @IsInt()
    offset: number

    @IsOptional()
    @IsString()
    name: string
}