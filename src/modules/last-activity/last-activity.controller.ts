import { Controller, Get, Param } from '@nestjs/common';
import { LastActivityService } from './last-activity.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Last Activity')
@Controller('last-activity')
export class LastActivityController {
    constructor(private readonly lastActiveService: LastActivityService) {}

    @ApiOperation({ summary: 'Foydalanuvchining oxirgi faolligini olish (userId orqali)' })
    @Get(':userId')
    getUserLastActivity(@Param('userId') userId: string) {
        return this.lastActiveService.getUserLastActivity(userId);
    }

    @ApiOperation({ summary: 'Admin uchun barcha foydalanuvchilarning oxirgi faolliklari' })
    @Get('admin/last-activity')
    getUserLastActivityAdmin() {
        return this.lastActiveService.getUserLastActivityForAdmin();
    }
}
