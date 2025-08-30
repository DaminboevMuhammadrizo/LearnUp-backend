import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { GetQueryDto } from './dto/get-query.dto';
import { GetAllCourseDto } from './dto/get-all-courses.dto';
import { UserRole, Users } from '@prisma/client';
import { GetMyCourseDto } from './dto/get-mentor.dto';
import { GetAssignedCoursesDto } from './dto/get-assigned-course.dto';
import { PaginationDto } from './dto/pagination.dto';
import { AssignAssistantDto } from './dto/assign-asssistant.dto';
import { UnassignAssistantDto } from './dto/unsing-assistant.dtpo';
import { CreateCourseDto } from './dto/create.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';
import { GetTopCourseQueryDto } from './dto/GetTopCourseQueryDto';
import { TopQueryDto } from './dto/top.query.dto';

@Injectable()
export class CourseService {
    constructor(private readonly prisma: PrismaService) { }

    async getAll(query: GetQueryDto) {

        const take = query.limit ?? 10;
        const skip = query.offset ? (query.offset - 1) * take : 0;
        const where: any = { published: true };


        const categoriy = await this.prisma.courseCategory.findUnique({
            where: { id: query.courseCategoryId ?? 1 }
        })

        if (categoriy?.name !== 'All Courses') {
            where.courseCategoryId = query.courseCategoryId ?? 1;
        }


        if (query.search) {
            where.name = {
                contains: query.search,
                mode: 'insensitive'
            };
        }

        if (query.level) {
            where.level = query.level;
        }

        if (query.price_min !== undefined || query.price_max !== undefined) {
            where.price = {};
            if (query.price_min !== undefined) {
                where.price.gte = query.price_min;
            }
            if (query.price_max !== undefined) {
                where.price.lte = query.price_max;
            }
        }

        const [data, total] = await Promise.all([
            this.prisma.course.findMany({
                where,
                skip,
                take,
                orderBy: {
                    createdAt: 'desc'
                }
            }),
            this.prisma.course.count({ where })
        ]);

        return {
            success: true,
            data,
            total,
            currentPage: query.offset ?? 1,
            perPage: take
        };
    }


    async getOne(id: string) {
        if (isNaN(Number(id))) {
            throw new BadRequestException({
                success: false,
                message: 'Invalid ID'
            });
        }

        const data = await this.prisma.course.findUnique({
            where: {
                id: Number(id)
            }
        })

        return {
            success: true,
            data
        }
    }


    async getSingleFull(id: string) {
        if (isNaN(Number(id))) {
            throw new BadRequestException({
                success: false,
                message: 'Invalid ID'
            });
        }

        const data = await this.prisma.course.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                CourseCategory: true,
                MentorProfile: {
                    include: {
                        Users: true
                    }
                },
                Users: true,
                assignedCourse: {
                    include: {
                        Users: true
                    }
                },
                purchasedCourse: {
                    include: {
                        Users: true
                    }
                },
                rating: {
                    include: {
                        Users: true
                    }
                },
                lastActivity: {
                    include: {
                        Users: true,
                        Lesson: true,
                        LessonModule: true
                    }
                },
                lessonModule: {
                    include: {
                        lesson: {
                            include: {
                                lessonFile: true,
                                homework: {
                                    include: {
                                        homeworkSubmission: {
                                            include: {
                                                Users: true
                                            }
                                        }
                                    }
                                },
                                lastActivity: true,
                                lessonView: true
                            }
                        },
                        exam: true,
                        examResult: {
                            include: {
                                Users: true
                            }
                        }
                    }
                },
                question: {
                    include: {
                        Users: true,
                        questionAnswer: {
                            include: {
                                Users: true
                            }
                        }
                    }
                }
            }
        })

        if (!data) {
            throw new NotFoundException({
                success: false,
                message: 'Course not found'
            });
        }

        return {
            success: true,
            data
        };
    }


    async getAllCourses(query: GetAllCourseDto) {

        const take = query.limit ?? 10;
        const skip = query.offset ? (query.offset - 1) * take : 0;

        const where: any = {};

        if (query.search) {
            where.OR = [
                { name: { contains: query.search, mode: 'insensitive' } },
                { about: { contains: query.search, mode: 'insensitive' } },
            ];
        }

        if (query.level) {
            where.level = query.level;
        }

        if (query.published !== undefined) {
            where.published = query.published;
        }

        if (query.price_min !== undefined || query.price_max !== undefined) {
            where.price = {};
            if (query.price_min !== undefined) where.price.gte = query.price_min;
            if (query.price_max !== undefined) where.price.lte = query.price_max;
        }

        const [data, total] = await Promise.all([
            this.prisma.course.findMany({
                where,
                skip,
                take,
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    CourseCategory: true,
                    MentorProfile: {
                        include: {
                            Users: {
                                select: {
                                    fullName: true,
                                    image: true
                                }
                            }
                        }
                    },
                    rating: true,
                    purchasedCourse: true
                }
            }),
            this.prisma.course.count({ where }),
        ]);

        return {
            success: true,
            total,
            data
        };
    }



    async getMyCourses(query: GetMyCourseDto) {
        const { search, level, price_min, price_max, published, limit = 10, offset = 0, category_id } = query;

        const take = limit;
        const skip = offset ? (offset - 1) * take : 0;

        const where: any = {
            ...(search && {
                name: {
                    contains: search,
                    mode: 'insensitive',
                },
            }),
            ...(level && { level }),
            ...(typeof published === 'boolean' && { published }),
            ...(typeof price_min === 'number' && {
                price: { gte: price_min },
            }),
            ...(typeof price_max === 'number' && {
                price: { ...(price_min ? { gte: price_min } : {}), lte: price_max },
            }),
            ...(category_id && { courseCategoryId: category_id }),
        };


        const [data, total] = await Promise.all([
            this.prisma.course.findMany({
                where,
                take,
                skip,
                orderBy: { createdAt: 'desc' },
                include: {
                    CourseCategory: true,
                    MentorProfile: {
                        include: {
                            Users: {
                                select: { fullName: true, image: true },
                            },
                        },
                    },
                },
            }),
            this.prisma.course.count({ where }),
        ]);

        return {
            data,
            total,
            page: Math.floor(skip / take) + 1,
            perPage: take,
        };
    }


    async getAssignedCourses(userId: number, query: GetAssignedCoursesDto) {

        const take = query.limit ?? 10;
        const skip = query.offset ? (query.offset - 1) * take : 0;
        const where: any = {
            assignedCourse: {
                some: {
                    usersId: userId,
                }
            }
        };

        if (query.search) {
            where.name = {
                contains: query.search,
                mode: 'insensitive'
            };
        }

        if (query.level) {
            where.level = query.level;
        }

        if (query.price_min !== undefined || query.price_max !== undefined) {
            where.price = {};
            if (query.price_min !== undefined) {
                where.price.gte = query.price_min;
            }
            if (query.price_max !== undefined) {
                where.price.lte = query.price_max;
            }
        }

        if (query.category_id) {
            where.courseCategoryId = query.category_id;
        }

        if (query.mentor_id) {
            where.mentorProfile = {
                usersId: query.mentor_id
            };
        }

        if (query.published !== undefined) {
            where.published = query.published;
        }

        const [data, total] = await Promise.all([
            this.prisma.course.findMany({
                where,
                skip,
                take,
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    CourseCategory: true,
                    MentorProfile: {
                        include: {
                            Users: true
                        }
                    }
                }
            }),
            this.prisma.course.count({ where })
        ]);

        return {
            success: true,
            data,
            total
        };
    }


    async getAssistantsByCourse(courseId: string, query: PaginationDto) {
        if (isNaN(Number(courseId))) {
            throw new BadRequestException({
                success: false,
                message: 'Invalid course ID',
            });
        }

        const take = query.limit ?? 10;
        const skip = query.offset ? (query.offset - 1) * take : 0;

        const [assistants, total] = await Promise.all([
            this.prisma.assignedCourse.findMany({
                where: {
                    courseId: Number(courseId),
                    Users: {
                        role: 'ASSISTANT',
                    },
                },
                skip,
                take,
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    Users: {
                        select: {
                            id: true,
                            fullName: true,
                            email: true,
                            image: true,
                        },
                    },
                },
            }),

            this.prisma.assignedCourse.count({
                where: {
                    courseId: Number(courseId),
                    Users: {
                        role: 'ASSISTANT',
                    },
                },
            }),
        ]);

        return {
            success: true,
            data: assistants,
            total,
        };
    }


    async getTopCourses(query: TopQueryDto) {

        const categoriy = await this.prisma.courseCategory.findUnique({
            where: { id: query.categoryId ?? 1 }
        })

        const where = categoriy?.name === 'All Courses' ? { published: true } : { published: true, courseCategoryId: query.categoryId };

        const topCourses = await this.prisma.course.findMany({
            where,
            take: 4,
            orderBy: { purchasedCourse: { _count: 'desc' } },
            include: {
                CourseCategory: true,
                MentorProfile: { include: { Users: { select: { fullName: true, image: true } } } },
                purchasedCourse: true,
                rating: true,
            },
        });

        const courseIds = topCourses.map(c => c.id);
        const ratings = await this.prisma.rating.groupBy({
            by: ['courseId'],
            where: { courseId: { in: courseIds } },
            _avg: { rate: true },
        });

        return {
            success: true,
            data: topCourses.map(course => {
                const rating = ratings.find(r => r.courseId === course.id);
                return {
                    ...course,
                    ratingAvg: rating?._avg.rate ?? 0,
                    ratingCount: course.rating?.length ?? 0,
                };
            }),
        };
    }


    async assignAssistant(payload: AssignAssistantDto) {
        const { assistantId, courseId } = payload;

        const assistant = await this.prisma.users.findUnique({
            where: { id: assistantId },
        });

        if (!assistant || assistant.role !== 'ASSISTANT') {
            throw new BadRequestException({
                success: false,
                message: 'user not found or role not assistant !',
            });
        }

        const course = await this.prisma.course.findUnique({
            where: { id: courseId },
        });

        if (!course) {
            throw new NotFoundException({
                success: false,
                message: 'course not found !',
            });
        }

        const exists = await this.prisma.assignedCourse.findFirst({
            where: {
                usersId: assistantId,
                courseId: courseId,
            },
        });

        if (exists) {
            throw new ConflictException({
                success: false,
                message: 'assistant alredy exsists in course !',
            });
        }

        await this.prisma.assignedCourse.create({
            data: {
                usersId: assistantId,
                courseId: courseId,
            },
        });

        return {
            success: true,
            message: 'Assistant success crated !',
        };
    }



    async unassignAssistant(payload: UnassignAssistantDto) {
        const { assistantId, courseId } = payload;

        const assistant = await this.prisma.users.findUnique({
            where: { id: assistantId },
        });

        if (!assistant || assistant.role !== 'ASSISTANT') {
            throw new BadRequestException({
                success: false,
                message: 'user not found or role not assistant !',
            });
        }

        const assignment = await this.prisma.assignedCourse.findFirst({
            where: {
                usersId: assistantId,
                courseId: courseId,
            },
        });

        if (!assignment) {
            throw new NotFoundException({
                success: false,
                message: 'This assistant is not assigned to this course !',
            });
        }

        await this.prisma.assignedCourse.delete({
            where: {
                id: assignment.id,
            },
        });

        return {
            success: true,
            message: 'Assistant removed from course !',
        };
    }



    async createCourse(payload: CreateCourseDto, userId: number, files: { banner: string; introVideo?: string }) {

        const existing = await this.prisma.course.findFirst({
            where: { name: payload.name },
        });

        if (existing) {


            throw new ConflictException({
                success: false,
                message: 'Course already exists!',
            });
        }

        const mentorProfile = await this.prisma.mentorProfile.findUnique({
            where: { id: payload.mentorProfileId }
        })


        if (!mentorProfile) {
            throw new NotFoundException({
                success: false,
                message: 'Mentor profile not found!',
            });
        }

        await this.prisma.course.create({
            data: {
                name: payload.name,
                about: payload.about,
                price: Number(payload.price),
                level: payload.level,
                banner: files.banner,
                introVideo: files.introVideo ?? null,
                published: false,
                mentorProfileId: payload.mentorProfileId,
                courseCategoryId: payload.categoryId,
                usersId: userId,
            },
        });


        return {
            success: true,
            message: 'Course success created!'
        };
    }


    async publishCourse(id: string) {
        if (isNaN(Number(id))) {
            throw new BadRequestException({
                success: false,
                message: 'Invalide id !'
            })
        }
        const course = await this.prisma.course.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!course) {
            throw new NotFoundException({
                success: false,
                message: 'Course not found!',
            });
        }

        if (course.published === true) {
            throw new ConflictException({
                success: false,
                message: 'Course is already published!',
            });
        }

        await this.prisma.course.update({
            where: { id: Number(id) },
            data: { published: true },
        });

        return {
            success: true,
            message: 'Course success published!',
        };
    }



    async unpublishCourse(id: string) {
        if (isNaN(Number(id))) {
            throw new BadRequestException({
                success: false,
                message: 'Invalide id !'
            })
        }

        const course = await this.prisma.course.findUnique({ where: { id: Number(id) } });

        if (!course) {
            throw new NotFoundException({
                success: false,
                message: 'Course not found!',
            });
        }

        if (course.published === false) {
            throw new ConflictException({
                success: false,
                message: 'Course is already unpublished!',
            });
        }

        await this.prisma.course.update({
            where: { id: Number(id) },
            data: { published: false },
        });

        return {
            success: true,
            message: 'Course success unpublished!',
        };
    }


    async updateMentor(dto: UpdateMentorDto) {
        const course = await this.prisma.course.findUnique({
            where: {
                id: dto.courseId
            },
        });

        if (!course) {
            throw new NotFoundException({
                success: false,
                message: 'Course not found!',
            });
        }

        const mentorProfile = await this.prisma.mentorProfile.findFirst({
            where: {
                usersId: dto.userId
            },
        });

        if (!mentorProfile) {
            throw new BadRequestException({
                success: false,
                message: 'Mentor not found !',
            });
        }

        await this.prisma.course.update({
            where: { id: dto.courseId },
            data: {
                mentorProfileId: mentorProfile.id,
            },
        });

        return {
            success: true,
            message: 'Mentor success updated!',
        };
    }


    async deleteCourse(id: number) {
        const course = await this.prisma.course.findUnique({
            where: { id },
            include: {
                purchasedCourse: true,
                lessonModule: {
                    include: {
                        lesson: true,
                    },
                },
            },
        });

        if (!course) {
            throw new NotFoundException({
                success: false,
                message: 'Course not found!',
            });
        }

        if (course.published) {
            throw new BadRequestException({
                success: false,
                message: 'Published course cannot be deleted!',
            });
        }

        if (course.purchasedCourse.length > 0) {
            throw new BadRequestException({
                success: false,
                message: 'Course already purchased by users!',
            });
        }

        const hasModulesOrLessons =
            course.lessonModule.length > 0 ||
            course.lessonModule.some((module) => module.lesson.length > 0);

        if (hasModulesOrLessons) {
            throw new BadRequestException({
                success: false,
                message: 'Course has lessons or modules!',
            });
        }

        await this.prisma.course.delete({ where: { id } });

        return {
            success: true,
            message: 'Course successfully deleted!',
        };
    }

}
