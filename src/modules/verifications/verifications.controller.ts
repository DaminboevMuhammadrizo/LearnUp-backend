import { Body, Controller, Post } from '@nestjs/common';
import { VerificationsService } from './verifications.service';
import { SendOtpDto, VerifyOtpDto } from './dto/verification.dto';

@Controller('verifications')
export class VerificationsController {
    constructor(private readonly verificationService: VerificationsService) {}

    @Post('send')
    sendOtp (@Body() payload: SendOtpDto) {
        return this.verificationService.sendOtp(payload)
    }


    @Post('verify')
    verifyOtp (@Body() payload: VerifyOtpDto) {
        return this.verificationService.verifyOtp(payload)
    }
}
