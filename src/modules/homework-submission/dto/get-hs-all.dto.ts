import { IsEnum, IsInt, IsOptional, IsPositive } from "class-validator";
import { HomeworkSubmissionsStatus } from "src/common/types/hs-status";

export class GetHomewrokSubmissionsAllQueryDto {

    @IsOptional()
    @IsInt()
    @IsPositive()
    offset: number

    @IsOptional()
    @IsInt()
    @IsPositive()
    limit: number

    @IsOptional()
    @IsEnum(HomeworkSubmissionsStatus)
    status: HomeworkSubmissionsStatus

    @IsOptional()
    @IsInt()
    @IsPositive()
    courseId: number

    @IsOptional()
    @IsInt()
    @IsPositive()
    homewrokId: number

    @IsOptional()
    @IsInt()
    @IsPositive()
    userId: number
}