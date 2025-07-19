import { IsMobilePhone, IsNotEmpty } from "class-validator";

export class QueryByPhoneDto {
    @IsMobilePhone('uz-UZ')
    @IsNotEmpty()
    phone: string
}