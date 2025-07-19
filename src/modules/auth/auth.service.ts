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


    private async generateToken (payload: JwtPayload, AccsesTokenOnly = false) {
        const accessToken = await this.jwtService.signAsync(payload)
        if(AccsesTokenOnly) return {accessToken}

        const refreshToken = await this.jwtService.signAsync({id: payload.id})
        return { accessToken, refreshToken }
    }



    async register(payload: RegisterDto) {
        if (await this.prisma.users.findUnique({ where: { phone: payload.phone } })) {
            throw new ConflictException('Phone already exists !')
        }

        if (!await this.verifyService.ChekConfirmOtp({ type: VerificationTypes.REGISTER, phone: payload.phone, otp: String(payload.otp) })) {
            throw new BadRequestException('Invalid or expired OTP')
        }

        payload.password = await hashPassword(payload.password)
        const user = await this.prisma.users.create({ data: payload })

        return this.generateToken({id: user.id, role: user.role})
    }


    async login (payload: LoginDto) {
        const user = await this.prisma.users.findUnique({where: {phone: payload.phone}})
        if(!user) throw new NotFoundException('Invalid phone or password !')
        
        if(!compirePassword(payload.password, user.password)) {
            throw new NotFoundException('Invalid phone or password !')
        }
        return this.generateToken({id: user.id, role: user.role})
    }


    async resetPassword (payload: ResetPasswordDto) {
        await this.verifyService.ChekConfirmOtp({ type: VerificationTypes.RESET_PASSWORD, otp: String(payload.otp), phone: payload.phone })
        await this.prisma.users.update({ where: {phone: payload.phone}, data: {password: await hashPassword(payload.password)}})

        return {success: true, message: 'Password succes updated !'}
    }


    async refreshToken (payload: RefreshTokenDto) {
        try {
            const data = await this.jwtService.verifyAsync(payload.refresh_token)
            const user = await this.prisma.users.findUnique({where: {id: data.id}})
            if(!user)  throw new NotFoundException('INvalide Jwt !')

            return this.generateToken({id: user.id, role: user.role}, true)
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired refresh token')
        }
    }
}
