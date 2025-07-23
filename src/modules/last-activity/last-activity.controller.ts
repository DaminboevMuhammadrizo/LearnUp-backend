import { Controller, Get, Param } from '@nestjs/common';
import { LastActivityService } from './last-activity.service';

@Controller('last-activity')
export class LastActivityController {
    constructor(private readonly lastActiveService: LastActivityService) { }


    @Get(':userId')
    getUserLastActivity(@Param('userId') userId: string) {
        return this.lastActiveService.getUserLastActivity(userId);
    }


    @Get('admin/last-activity')
    getUserLastActivityAdmin() {
        return this.lastActiveService.getUserLastActivityForAdmin();
    }
}
