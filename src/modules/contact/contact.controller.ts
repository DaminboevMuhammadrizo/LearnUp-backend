import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact-dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { GetAllContactDto } from './dto/get-all-contact.dto';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    @ApiOperation({summary: 'Hamma contactlarni olish (Admin)'})
    @Get('all')
    getAll(@Body() query: GetAllContactDto) {
        return this.contactService.getAll(query)
    }


    @ApiOperation({summary: 'Bita contactni olish (Admin)'})
    @Get('one/:id')
    getOne(@Param() id: string) {
        return this.contactService.getOne(id)
    }


    @ApiOperation({ summary: 'Contact form maʼlumotlarini yuborish' })
    @Post('contact')
    contact(@Body() payload: ContactDto) {
        return this.contactService.contact(payload);
    }
}
