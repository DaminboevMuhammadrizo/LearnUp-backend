import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator"
import { UserRole } from "src/common/types/userRole"

export class AllQueryDto {

    @ApiProperty({example: 1, required: false})
    @IsOptional()
    @IsNumber()
    offset?: number

    @ApiProperty({example: 10, required: false})
    @IsOptional()
    @IsNumber()
    limit?: number

    @ApiProperty({example: 'john', required: false})
    @IsOptional()
    @IsString()
    search?: string

    @ApiProperty({example: 'admin', required: false, enum: UserRole})
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole
}