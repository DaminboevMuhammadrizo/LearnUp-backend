import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator"
import { UserRole } from "src/common/types/userRole"

export class AllQueryDto {

    @IsOptional()
    @IsNumber()
    offset?: number

    @IsOptional()
    @IsNumber()
    limit?: number

    @IsOptional()
    @IsString()
    search?: string

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole
}