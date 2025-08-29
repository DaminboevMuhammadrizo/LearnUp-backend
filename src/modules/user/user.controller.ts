import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { QueryMentorsDto } from './dto/query-mentors.dto';
import { AllQueryDto } from './dto/all-query.dto';
import { QueryByPhoneDto } from './dto/query-by-phone.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor';
import { CreateAssistantDto } from './dto/create-assistant';
import { UpdateAssistantDto } from './dto/update-assistant';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { UserRole } from 'src/common/types/userRole';
import { Roles } from 'src/core/decorators/roles';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }



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


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Barcha foydalanuvchilarni olish' })
    @Get('all')
    getAllUsers(@Query() query: AllQueryDto) {
        return this.userService.getAllUsers(query);
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Bitta foydalanuvchini olish' })
    @Get('single/user/:id')
    getSingleUser(@Param('id') id: string) {
        return this.userService.getSingleUser(+id);
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Email orqali foydalanuvchini olish' })
    @Get('email')
    getByPhone(@Query() query: QueryByPhoneDto) {
        return this.userService.getByPhone(query);
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Admin yaratish' })
    @Post('create/admin')
    createAdmin(@Body() payload: CreateAdminDto) {
        return this.userService.createAdmin(payload);
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Mentor yaratish' })
    @Post('create/mentor')
    createMentor(@Body() payload: CreateMentorDto) {
        return this.userService.createMentor(payload);
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Assistent yaratish' })
    @Post('create/assistant')
    createAssistant(@Body() payload: CreateAssistantDto) {
        return this.userService.createAssistant(payload);
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Mentorni tahrirlash' })
    @Put('update/mentor/:id')
    updateMentor(@Body() payload: UpdateMentorDto, @Param('id') id: string) {
        return this.userService.updateMentor(payload, +id);
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Assistentni tahrirlash' })
    @Put()
    updateAssistant(@Body() payload: UpdateAssistantDto, @Param('id') id: string) {
        return this.userService.updateAssistant(payload, +id);
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Foydalanuvchini o‘chirish' })
    @Delete('delete/:id')
    delete(@Param('id') id: string) {
        return this.userService.delete(+id);
    }
}
