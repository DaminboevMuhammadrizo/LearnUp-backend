import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact-dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { GetAllContactDto } from './dto/get-all-contact.dto';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from 'src/core/decorators/roles';
import { UserRole } from 'src/common/types/userRole';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Hamma contactlarni olish (Admin)'})
    @Get('all')
    getAll(@Query() query: GetAllContactDto) {
        return this.contactService.getAll(query)
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Bita contactni olish (Admin)'})
    @Get('one/:id')
    getOne(@Param('id') id: string) {
        return this.contactService.getOne(id)
    }


    @ApiOperation({ summary: 'Contact form maʼlumotlarini yuborish' })
    @Post('contact')
    contact(@Body() payload: ContactDto) {
        return this.contactService.contact(payload);
    }
}
