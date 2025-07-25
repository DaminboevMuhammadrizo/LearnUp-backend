import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PruchasedCourseService } from './pruchased-course.service';
import { GetMineDto } from './dto/get-mine.dto';
import { CreatePurchasedDto } from './dto/create-purchase.dto';
import { getPurchaseCourseByIdQueryDto } from './dto/get-pc-byid.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Purchased Courses')
@Controller('pruchased-course')
export class PruchasedCourseController {
  constructor(
    private readonly pruchasedCourseService: PruchasedCourseService,
  ) {}

  @ApiOperation({ summary: 'Mening xarid qilgan kurslarim ro‘yxati (filter bilan)' })
  @Get('mine')
  getMine(@Query() query: GetMineDto) {
    return this.pruchasedCourseService.getMine(query);
  }

  @ApiOperation({ summary: 'Kurs ID orqali foydalanuvchining xarid maʼlumotlari' })
  @Get('mine/:courseId')
  getPCforCourseId(@Param('courseId') courseId: string) {
    return this.pruchasedCourseService.getPCforCourseId(courseId);
  }

  @ApiOperation({ summary: 'Kursga kimlar yozilganini olish (admin uchun)' })
  @Get('course/:id/student')
  getPurchaseCourseById(
    @Query() query: getPurchaseCourseByIdQueryDto,
    @Param('id') id: string,
  ) {
    return this.pruchasedCourseService.getPurchaseCourseById(id, query);
  }

  @ApiOperation({ summary: 'Yangi xarid qilish (kurs sotib olish)' })
  @Post('purchased')
  createPurchase(@Body() payload: CreatePurchasedDto) {
    return this.pruchasedCourseService.createPurchase(payload, 1);
  }
}
