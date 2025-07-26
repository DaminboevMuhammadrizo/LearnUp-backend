import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact-dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) {}

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Contact form maʼlumotlarini yuborish' })
    @Post('contact')
    contact(@Body() payload: ContactDto) {
        return this.contactService.contact(payload);
    }
}
