import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone, IsNotEmpty } from "class-validator";

export class QueryByPhoneDto {
    @ApiProperty({example: '+998901234567'})
    @IsMobilePhone('uz-UZ')
    @IsNotEmpty()
    phone: string
}