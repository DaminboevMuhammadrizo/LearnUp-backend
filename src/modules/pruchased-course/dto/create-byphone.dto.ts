import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsInt, IsMobilePhone, IsNotEmpty, IsPositive } from "class-validator"

export class CreatePurchaseCourseByPhone {

    @ApiProperty({example: 1})
    @IsInt()
    @IsPositive()
    courseId: number

    @ApiProperty({example: 'm701rizo@gmail.com'})
    @IsEmail()
    email: string
}