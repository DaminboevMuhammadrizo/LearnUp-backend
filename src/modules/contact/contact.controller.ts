import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact-dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Contact') // Swagger grouping
@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) {}

    @ApiOperation({ summary: 'Contact form maʼlumotlarini yuborish' })
    @Post('contact')
    contact(@Body() payload: ContactDto) {
        return this.contactService.contact(payload);
    }
}
