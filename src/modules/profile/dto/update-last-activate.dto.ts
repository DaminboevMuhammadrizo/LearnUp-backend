import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsPositive, IsString } from "class-validator"

export class UpdateLastActivateDto {

    @ApiProperty({example: 1})
    @IsInt()
    @IsPositive()
    courseId: number

    @ApiProperty({example: 1})
    @IsInt()
    @IsPositive()
    lessonModuleId: number

    @ApiProperty({example: 1})
    @IsInt()
    @IsPositive()
    lessonId: number

    @ApiProperty({example: 'https://example.com/lesson'})
    @IsString()
    url: string
}