import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { QueryMentorsDto } from './dto/query-mentors.dto';
import { AllQueryDto } from './dto/all-query.dto';
import { QueryByPhoneDto } from './dto/query-by-phone.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateMentorDto } from './dto/create-mentor.dto';

@Controller('user')
export class UserController {
    constructor (private readonly userService: UserService) {}


    @Get('all/mentors')
    getAllMentors(@Query() query: QueryMentorsDto) {
        return this.userService.getAllMentors(query)
    }

    
    @Get('single/mentor/:id')
    getSingleMentor (@Param('id') id: string) {
        return this.userService.getSingleMentor(id)
    }


    @Get('all')
    getAllUsers (@Query() query: AllQueryDto) {
        return this.userService.getAllUsers(query)
    }


    @Get('single/user/:id')
    getSingleUser (@Param('id') id: string) {
        return this.userService.getSingleUser(id)
    }


    @Get('by-phone')
    getByPhone (@Query() query: QueryByPhoneDto) {
        return this.userService.getByPhone(query)
    }


    @Post('create/admin')
    createAdmin (@Body() payload: CreateAdminDto) {
        return this.userService.createAdmin(payload)
    }


    @Post('create/mentor')
    createMentor (@Body() payload: CreateMentorDto) {
        return this.userService.createMentor(payload)
    }


    @Post('create/assistant')
    createAssistant (@Body() payload: CreateMentorDto) {
        return this.userService.createAssistant(payload)
    }


    

}
