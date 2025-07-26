import { Body, Controller, Post } from '@nestjs/common';
import { VerificationsService } from './verifications.service';
import { SendOtpDto, VerifyOtpDto } from './dto/verification.dto';
import { ApiTags, ApiOperation, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common';

@ApiTags('Verifications')
@Controller('verifications')
export class VerificationsController {
    constructor(private readonly verificationService: VerificationsService) { }


    @ApiOperation({ summary: 'OTP yuborish (telefon raqamga)' })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor(''))
    @Post('send')
    sendOtp(@Body() payload: SendOtpDto) {
        return this.verificationService.sendOtp(payload);
    }

    @ApiOperation({ summary: 'Kelib tushgan OTP ni tekshirish' })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor(''))
    @Post('verify')
    verifyOtp(@Body() payload: VerifyOtpDto) {
        return this.verificationService.verifyOtp(payload);
    }
}
