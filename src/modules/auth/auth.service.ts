import { BadRequestException, ConflictException, Injectable, NotFoundException, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/Database/prisma.service';
import { VerificationsService } from '../verifications/verifications.service';
import { RegisterDto } from './dto/register.dto';
import { VerificationTypes } from 'src/common/types/verification';
import { hashPassword } from 'src/common/config/bcrypt/hash';
import { JwtPayload } from 'src/common/types/jwt-payload';
import { LoginDto } from './dto/login.dto';
import { compirePassword } from 'src/common/config/bcrypt/compire';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RefreshTokenDto } from './dto/refresh-token';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly verifyService: VerificationsService
    ) {}

    private async generateToken(payload: JwtPayload, AccsesTokenOnly = false) {
        const accessToken = await this.jwtService.signAsync(payload)
        if (AccsesTokenOnly) return { accessToken }

        const refreshToken = await this.jwtService.signAsync({ id: payload.id })
        return { accessToken, refreshToken }
    }

    async register(payload: RegisterDto) {
        // Foydalanuvchi mavjudligini tekshirish
        const existingUser = await this.prisma.users.findUnique({ 
            where: { phone: payload.phone } 
        });
        
        if (existingUser) {
            throw new ConflictException('Phone already exists!')
        }

        // OTP tekshirish
        const isOtpValid = await this.verifyService.ChekConfirmOtp({ 
            type: VerificationTypes.REGISTER, 
            phone: payload.phone, 
            otp: String(payload.otp) 
        });
        
        if (!isOtpValid) {
            throw new BadRequestException('Invalid or expired OTP')
        }

        // Parolni hash qilish
        const hashedPassword = await hashPassword(payload.password);

        // Foydalanuvchini yaratish - faqat kerakli maydonlarni yuborish
        const user = await this.prisma.users.create({
            data: {
                phone: payload.phone,
                fullName: payload.fullName,
                password: hashedPassword,
                // otp maydonini qo'shmaslik - Users modelida yo'q
            }
        });

        return this.generateToken({ id: user.id, role: user.role })
    }

    async login(payload: LoginDto) {
        const user = await this.prisma.users.findUnique({ 
            where: { phone: payload.phone } 
        });
        
        if (!user) {
            throw new NotFoundException('Invalid phone or password!')
        }

        const isPasswordValid = await compirePassword(payload.password, user.password);
        if (!isPasswordValid) {
            throw new NotFoundException('Invalid phone or password!')
        }
        
        return this.generateToken({ id: user.id, role: user.role })
    }

    async resetPassword(payload: ResetPasswordDto) {
        await this.verifyService.ChekConfirmOtp({ 
            type: VerificationTypes.RESET_PASSWORD, 
            otp: String(payload.otp), 
            phone: payload.phone 
        });

        await this.prisma.users.update({ 
            where: { phone: payload.phone }, 
            data: { password: await hashPassword(payload.password) }
        });

        return { success: true, message: 'Password successfully updated!' }
    }

    async refreshToken(payload: RefreshTokenDto) {
        try {
            const data = await this.jwtService.verifyAsync(payload.refresh_token);
            const user = await this.prisma.users.findUnique({ where: { id: data.id } });
            
            if (!user) {
                throw new NotFoundException('Invalid JWT!')
            }

            return this.generateToken({ id: user.id, role: user.role }, true)
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired refresh token')
        }
    }
}