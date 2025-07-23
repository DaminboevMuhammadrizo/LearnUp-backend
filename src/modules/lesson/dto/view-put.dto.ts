import { IsBoolean, IsOptional, IsString } from "class-validator";

export class ViewPutDto {

    @IsBoolean()
    view: boolean

    @IsOptional()
    @IsString()
    url?: string
}