import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create.dto';
import { UpdateRatingDto } from './dto/update.dto';

@Controller('rating')
export class RatingController {
    constructor (private readonly ratingService: RatingService) {}


    @Get('all')
    getAll () {
        return this.ratingService.getAll()
    }


    @Get(':courseId')
    getRatingForCourse (@Param('courseId') courseId: string) {
        return this.ratingService.getRatingForCourse(+courseId)
    }


    @Get('analystics/:courseId')
    getRatingForAnalystics (@Param('courseId') courseId: string) {
        return this.ratingService.getRatingForAnalystics(+courseId)
    }


    @Post('create')
    create (@Body() payload: CreateRatingDto) {
        return this.ratingService.create(payload, 1)
    }

    
    @Put('update')
    update (@Body() payload: UpdateRatingDto) {
        return this.ratingService.update(payload)
    }


    @Delete(':id')
    delete (@Param('id') id: string) {
        return this.ratingService.delete(+id)
    }
}
