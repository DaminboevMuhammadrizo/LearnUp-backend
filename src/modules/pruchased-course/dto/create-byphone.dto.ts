import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsMobilePhone, IsNotEmpty, IsPositive } from "class-validator"

export class CreatePurchaseCourseByPhone {

    @ApiProperty({example: 1})
    @IsInt()
    @IsPositive()
    courseId: number

    @ApiProperty({example: '+998901234567'})
    @IsNotEmpty()
    @IsMobilePhone('uz-UZ')
    phone: string
}