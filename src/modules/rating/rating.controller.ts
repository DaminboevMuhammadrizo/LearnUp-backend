import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create.dto';
import { UpdateRatingDto } from './dto/update.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Rating')
@Controller('rating')
export class RatingController {
    constructor(private readonly ratingService: RatingService) {}

    
    @ApiOperation({ summary: 'Barcha reytinglarni olish' })
    @Get('all')
    getAll() {
        return this.ratingService.getAll();
    }

    @ApiOperation({ summary: 'Kurs uchun reytinglarni olish' })
    @Get(':courseId')
    getRatingForCourse(@Param('courseId') courseId: string) {
        return this.ratingService.getRatingForCourse(+courseId);
    }

    @ApiOperation({ summary: 'Kurs uchun analitik reyting maʼlumotlari' })
    @Get('analystics/:courseId')
    getRatingForAnalystics(@Param('courseId') courseId: string) {
        return this.ratingService.getRatingForAnalystics(+courseId);
    }

    @ApiOperation({ summary: 'Reyting yaratish' })
    @Post('create')
    create(@Body() payload: CreateRatingDto) {
        return this.ratingService.create(payload, 1);
    }

    @ApiOperation({ summary: 'Reytingni tahrirlash' })
    @Put('update')
    update(@Body() payload: UpdateRatingDto) {
        return this.ratingService.update(payload);
    }

    @ApiOperation({ summary: 'Reytingni o‘chirish' })
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.ratingService.delete(+id);
    }
}
