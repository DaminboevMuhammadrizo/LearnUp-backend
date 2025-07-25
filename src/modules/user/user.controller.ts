import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { QueryMentorsDto } from './dto/query-mentors.dto';
import { AllQueryDto } from './dto/all-query.dto';
import { QueryByPhoneDto } from './dto/query-by-phone.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor';
import { CreateAssistantDto } from './dto/create-assistant';
import { UpdateAssistantDto } from './dto/update-assistant';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: 'Barcha mentorlarni olish' })
    @Get('all/mentors')
    getAllMentors(@Query() query: QueryMentorsDto) {
        return this.userService.getAllMentors(query);
    }

    @ApiOperation({ summary: 'Bitta mentorni olish' })
    @Get('single/mentor/:id')
    getSingleMentor(@Param('id') id: string) {
        return this.userService.getSingleMentor(+id);
    }

    @ApiOperation({ summary: 'Barcha foydalanuvchilarni olish' })
    @Get('all')
    getAllUsers(@Query() query: AllQueryDto) {
        return this.userService.getAllUsers(query);
    }

    @ApiOperation({ summary: 'Bitta foydalanuvchini olish' })
    @Get('single/user/:id')
    getSingleUser(@Param('id') id: string) {
        return this.userService.getSingleUser(+id);
    }

    @ApiOperation({ summary: 'Telefon raqam orqali foydalanuvchini olish' })
    @Get('by-phone')
    getByPhone(@Query() query: QueryByPhoneDto) {
        return this.userService.getByPhone(query);
    }

    @ApiOperation({ summary: 'Admin yaratish' })
    @Post('create/admin')
    createAdmin(@Body() payload: CreateAdminDto) {
        return this.userService.createAdmin(payload);
    }

    @ApiOperation({ summary: 'Mentor yaratish' })
    @Post('create/mentor')
    createMentor(@Body() payload: CreateMentorDto) {
        return this.userService.createMentor(payload);
    }

    @ApiOperation({ summary: 'Assistent yaratish' })
    @Post('create/assistant')
    createAssistant(@Body() payload: CreateAssistantDto) {
        return this.userService.createAssistant(payload);
    }

    @ApiOperation({ summary: 'Mentorni tahrirlash' })
    @Put('update/mentor/:id')
    updateMentor(@Body() payload: UpdateMentorDto, @Param('id') id: string) {
        return this.userService.updateMentor(payload, +id);
    }

    @ApiOperation({ summary: 'Assistentni tahrirlash' })
    @Put()
    updateAssistant(@Body() payload: UpdateAssistantDto, @Param('id') id: string) {
        return this.userService.updateAssistant(payload, +id);
    }

    @ApiOperation({ summary: 'Foydalanuvchini o‘chirish' })
    @Delete('delete/:id')
    delete(@Param('id') id: string) {
        return this.userService.delete(+id);
    }
}
