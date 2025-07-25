import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth') // Swagger grouping
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Foydalanuvchini ro‘yxatdan o‘tkazish' })
    @Post('register')
    register(@Body() payload: RegisterDto) {
        return this.authService.register(payload);
    }

    @ApiOperation({ summary: 'Foydalanuvchini tizimga kiritish (login)' })
    @Post('login')
    login(@Body() payload: LoginDto) {
        return this.authService.login(payload);
    }

    @ApiOperation({ summary: 'Parolni tiklash (reset password)' })
    @Post('reset-password')
    resetPassword(@Body() payload: ResetPasswordDto) {
        return this.authService.resetPassword(payload);
    }

    @ApiOperation({ summary: 'Tokenni yangilash' })
    @Post('refresh-token')
    refresh(@Body() dto: RefreshTokenDto) {
        return this.authService.refreshToken(dto);
    }
}
