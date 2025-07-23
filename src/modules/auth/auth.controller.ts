import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @Post('register')
    register(@Body() payload: RegisterDto) {
        return this.authService.register(payload)
    }



    @Post('login')
    login(@Body() payload: LoginDto) {
        return this.authService.login(payload)
    }


    @Post('reset-password')
    resetPassword (@Body() payload: ResetPasswordDto) {
        return this.authService.resetPassword(payload)
    }

    
    @Post('refresh-token')
    refresh(@Body() dto: RefreshTokenDto) {
        return this.authService.refreshToken(dto);
    }
}
