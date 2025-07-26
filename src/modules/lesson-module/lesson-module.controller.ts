import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { LessonModuleService } from './lesson-module.service';
import { GetAllQueryDto } from './dto/get-all-query.dto';
import { CreateLessonModuleDto } from './dto/create.dto';
import { UpdateLessonModuleDto } from './dto/update.dto';
import { getMineAllDto } from './dto/get-mine-all.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserRole } from 'src/common/types/userRole';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from 'src/core/decorators/roles';

@ApiTags('Lesson Modules')
@Controller('lesson-module')
export class LessonModuleController {
  constructor(private readonly lessonMduleService: LessonModuleService) { }


  @ApiOperation({ summary: 'Kursga tegishli barcha modulalarni olish (admin uchun)' })
  @Get('all/:courseId')
  getAll(
    @Param('courseId') courseId: string,
    @Query() query: GetAllQueryDto,
  ) {
    return this.lessonMduleService.getAll(query, courseId);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.STUDENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Foydalanuvchiga tegishli modulalarni olish (kurs asosida)' })
  @Get('mine-all/:courseId')
  getMineAll(
    @Param('courseId') courseId: string,
    @Query() query: getMineAllDto,
  ) {
    return this.lessonMduleService.getMineAll(query, courseId, 1);
  }


  @ApiOperation({ summary: 'Modul detallari (foydalanuvchiga)' })
  @Get('detail/:id')
  getLessonModuleDetail(@Param('id') id: string) {
    return this.lessonMduleService.getLessonModuleDetail(id, 1);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Yangi modul yaratish' })
  @Post('create')
  create(@Body() payload: CreateLessonModuleDto) {
    return this.lessonMduleService.create(payload);
  }


  @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiBearerAuth()
  @ApiOperation({ summary: 'Modulni tahrirlash' })
  @Put('update')
  update(@Body() paylod: UpdateLessonModuleDto) {
    return this.lessonMduleService.update(paylod);
  }


  @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiBearerAuth()
  @ApiOperation({ summary: 'Modulni o‘chirish' })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.lessonMduleService.delete(id);
  }
}
