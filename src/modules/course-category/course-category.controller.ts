import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CourseCategoryService } from './course-category.service';
import { GetAllQueryDto } from './dto/get-all-query.dto';
import { CreateCourseCateforyDto } from './dto/create.dto';
import { UpdateCourseCateforyDto } from './dto/update.dto';

@Controller('course-category')
export class CourseCategoryController {
    constructor (private readonly courseCategoryService: CourseCategoryService) {}


    @Get()
    getAll (query: GetAllQueryDto) {
        return this.courseCategoryService.getAll(query)
    }


    @Get(':id')
    getOne (@Param('id') id: string) {
        return this.courseCategoryService.getOne(+id)
    }

    
    @Post()
    create (payload: CreateCourseCateforyDto) {
        return this.courseCategoryService.create(payload)
    }


    @Put()
    update (payload: UpdateCourseCateforyDto) {
        return this.courseCategoryService.update(payload)
    }


    @Delete(':id')
    delete (@Param('id') id: string) {
        return this.courseCategoryService.delete(+id)
    }
}
