import { IsBoolean, IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdateExamResultDto {
    @IsInt()
    @IsPositive()
    id: number;
    
    @IsOptional()
    @IsInt()
    @IsPositive()
    lessonModuleId: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    usersId: number;

    @IsOptional()
    @IsBoolean()
    passed: boolean;

    @IsOptional()
    @IsInt()
    corrects: number;

    @IsOptional()
    @IsInt()
    wrongs: number;
}
