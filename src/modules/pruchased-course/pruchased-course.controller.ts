import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { PruchasedCourseService } from './pruchased-course.service';
import { GetMineDto } from './dto/get-mine.dto';
import { CreatePurchasedDto } from './dto/create-purchase.dto';
import { getPurchaseCourseByIdQueryDto } from './dto/get-pc-byid.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { UserRole } from 'src/common/types/userRole';
import { Roles } from 'src/core/decorators/roles';

@ApiTags('Purchased Courses')
@Controller('pruchased-course')
export class PruchasedCourseController {
  constructor(
    private readonly pruchasedCourseService: PruchasedCourseService,
  ) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.STUDENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mening xarid qilgan kurslarim ro‘yxati (filter bilan)' })
  @Get('mine')
  getMine(@Query() query: GetMineDto) {
    return this.pruchasedCourseService.getMine(query);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.STUDENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Kurs ID orqali foydalanuvchining xarid maʼlumotlari' })
  @Get('mine/:courseId')
  getPCforCourseId(@Param('courseId') courseId: string) {
    return this.pruchasedCourseService.getPCforCourseId(courseId);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Kursga kimlar yozilganini olish (admin uchun)' })
  @Get('course/:id/student')
  getPurchaseCourseById(
    @Query() query: getPurchaseCourseByIdQueryDto,
    @Param('id') id: string,
  ) {
    return this.pruchasedCourseService.getPurchaseCourseById(id, query);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Yangi xarid qilish (kurs sotib olish)' })
  @Post('purchased')
  createPurchase(@Body() payload: CreatePurchasedDto) {
    return this.pruchasedCourseService.createPurchase(payload, 1);
  }
}
