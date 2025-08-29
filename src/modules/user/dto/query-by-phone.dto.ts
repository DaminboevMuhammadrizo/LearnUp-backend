import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsMobilePhone, IsNotEmpty } from "class-validator";

export class QueryByPhoneDto {
    @ApiProperty({example: 'm701rizo@gmail.com'})
    @IsEmail()
    email: string
}