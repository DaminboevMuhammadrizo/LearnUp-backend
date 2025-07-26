import { IsBoolean, IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class HomewrokSubmissionChekDto {

    @IsInt()
    @IsPositive()
    submissionId: number

    @IsBoolean()
    approved: boolean

    @IsNotEmpty()
    @IsString()
    reason: string
}