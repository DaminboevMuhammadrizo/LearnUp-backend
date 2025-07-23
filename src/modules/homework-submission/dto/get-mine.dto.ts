import { IsInt, IsOptional, IsPositive } from "class-validator"

export class GetMineHomewrokSubmissionDto {

    @IsOptional()
    @IsInt()
    @IsPositive()
    offset: number

    @IsOptional()
    @IsInt()
    @IsPositive()
    limit: number
}