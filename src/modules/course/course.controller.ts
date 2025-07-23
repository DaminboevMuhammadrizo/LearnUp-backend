import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CourseService } from './course.service';
import { GetQueryDto } from './dto/get-query.dto';

@Controller('course')
export class CourseController {
    constructor (private readonly courseService: CourseService) {}


    // @Get()
    // getAll (@Query() query: GetQueryDto) {
    //     return this.courseService.getAll(query)
    // }


    // @Get(':id')
    // getOne (@Param('id') id: string) {
    //     return this.courseService.getOne(+id)
    // }


    // @Post()
    // create (@Body() payload: ) {}
}
