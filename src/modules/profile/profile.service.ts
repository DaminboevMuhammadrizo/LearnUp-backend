import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { UpdateMyProfileDto } from './dto/update-profile.dto';
import { UpdateLastActivateDto } from './dto/update-last-activate.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { VerificationsService } from '../verifications/verifications.service';
import { VerificationTypes } from 'src/common/types/verification';

@Injectable()
export class ProfileService {
    constructor(private readonly prisma: PrismaService, private readonly verifyService: VerificationsService) { }

    async getMyProfile(id: number) {
        const user = await this.prisma.users.findUnique({
            where: { id },
            include: {
                mentorProfile: true,
                asignedCourse: {
                    include: {
                        Course: true
                    }
                },
                purchasedCourse: {
                    include: {
                        Course: true
                    }
                },
                rating: true,
                lastActivity: {
                    include: {
                        Course: true,
                        Lesson: true,
                        LessonModule: true
                    }
                },
                lessonView: {
                    include: {
                        Lesson: true
                    }
                },
                homeworkSubmission: {
                    include: {
                        Homework: {
                            include: {
                                Lesson: true
                            }
                        }
                    }
                },
                examResult: {
                    include: {
                        LessonModule: true
                    }
                },
                question: true,
                questionAnswer: true,
                course: true
            }
        });

        if (!user) {
            throw new NotFoundException({
                success: false,
                message: 'User not found!'
            });
        }

        return {
            success: true,
            data: user
        };
    }


    async updateMyProfile(id: number, payload: UpdateMyProfileDto, image?: string) {
        const user = await this.prisma.users.findUnique({ where: { id } });

        if (!user) {
            throw new NotFoundException({
                success: false,
                message: 'User not found!',
            });
        }

        await this.prisma.users.update({
            where: { id },
            data: {
                ...payload,
                ...(image && { image }),
            },
        });

        return {
            success: true,
            message: 'profile success updated !'
        }
    }


    async getProfileLastActivate(id: number) {
        const user = await this.prisma.users.findUnique({
            where: { id },
            include: {
                lastActivity: {
                    include: {
                        Lesson: true,
                        LessonModule: true,
                        Course: true
                    }
                }
            }
        });

        if (!user) {
            throw new NotFoundException({
                success: false,
                message: 'User not found!',
            });
        }

        return {
            success: true,
            data: user,
        };

    }



    async updateLastActivity(userId: number, payload: UpdateLastActivateDto) {
        const { courseId, lessonModuleId, lessonId, url } = payload;

        const updated = await this.prisma.lastActivity.upsert({
            where: {
                usersId_lessonId: {
                    usersId: userId,
                    lessonId: lessonId
                }
            },
            update: {
                url,
                updatedAt: new Date()
            },
            create: {
                usersId: userId,
                courseId,
                lessonModuleId,
                lessonId,
                url
            }
        });

        return {
            success: true,
            message: 'Last activity success updated !',
            data: updated
        };


    }


    async updatePhone(userId: number, payload: UpdatePhoneDto) {
        const isVerified = await this.verifyService.ChekConfirmOtp({
            type: VerificationTypes.RESET_PHONE,
            phone: payload.phone,
            otp: String(payload.otp)
        });

        if (!isVerified) {
            throw new BadRequestException({
                success: false,
                message: 'Invalid or expired OTP !'
            });
        }

        const user = await this.prisma.users.findUnique({ where: { id: userId } });

        if (!user) {
            throw new NotFoundException({
                success: false,
                message: 'User not found !'
            });
        }

        const phoneExists = await this.prisma.users.findUnique({
            where: { phone: payload.phone }
        });

        if (phoneExists && phoneExists.id !== userId) {
            throw new BadRequestException({
                success: false,
                message: 'This phone number is already in use'
            });
        }

        await this.prisma.users.update({
            where: { id: userId },
            data: { phone: payload.phone }
        });

        return {
            success: true,
            message: 'Phone success updated !'
        };
    }







}
