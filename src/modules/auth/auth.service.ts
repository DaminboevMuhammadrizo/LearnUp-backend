import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
        const existingUser = await this.prisma.users.findUnique({
            where: { email: payload.email } 
        });
        
        if (existingUser) {
            throw new ConflictException('Email already exists!')
        }

        const isOtpValid = await this.verifyService.checkConfirmOtp({ 
            type: VerificationTypes.REGISTER, 
            email: payload.email, 
            otp: String(payload.otp) 
        });
        
        if (!isOtpValid) {
            throw new BadRequestException('Invalid or expired OTP')
        }

        const hashedPassword = await hashPassword(payload.password);

        const user = await this.prisma.users.create({
            data: {
                email: payload.email,
                fullName: payload.fullName,
                password: hashedPassword,
            }
        });

        return this.generateToken({ id: user.id, role: user.role })
    }

    async login(payload: LoginDto) {
        const user = await this.prisma.users.findUnique({ 
            where: { email: payload.phone } 
        });
        
        if (!user) {
            throw new NotFoundException('Invalid email or password!')
        }

        const isPasswordValid = await compirePassword(payload.password, user.password);
        if (!isPasswordValid) {
            throw new NotFoundException('Invalid email or password!')
        }
        
        return this.generateToken({ id: user.id, role: user.role })
    }

    async resetPassword(payload: ResetPasswordDto) {
        await this.verifyService.checkConfirmOtp({ 
            type: VerificationTypes.RESET_PASSWORD, 
            otp: String(payload.otp), 
            email: payload.email 
        });

        await this.prisma.users.update({ 
            where: { email: payload.email }, 
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