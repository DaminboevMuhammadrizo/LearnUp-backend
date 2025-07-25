import { Body, Controller, Post } from '@nestjs/common';
import { VerificationsService } from './verifications.service';
import { SendOtpDto, VerifyOtpDto } from './dto/verification.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Verifications')
@Controller('verifications')
export class VerificationsController {
    constructor(private readonly verificationService: VerificationsService) {}

    @ApiOperation({ summary: 'OTP yuborish (telefon raqamga)' })
    @Post('send')
    sendOtp(@Body() payload: SendOtpDto) {
        return this.verificationService.sendOtp(payload);
    }

    @ApiOperation({ summary: 'Kelib tushgan OTP ni tekshirish' })
    @Post('verify')
    verifyOtp(@Body() payload: VerifyOtpDto) {
        return this.verificationService.verifyOtp(payload);
    }
}
