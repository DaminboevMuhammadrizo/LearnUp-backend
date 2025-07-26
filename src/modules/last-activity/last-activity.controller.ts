import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { LastActivityService } from './last-activity.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { UserRole } from 'src/common/types/userRole';
import { Roles } from 'src/core/decorators/roles';

@ApiTags('Last Activity')
@Controller('last-activity')
export class LastActivityController {
    constructor(private readonly lastActiveService: LastActivityService) { }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.STUDENT)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Foydalanuvchining oxirgi faolligini olish (userId orqali)' })
    @Get(':userId')
    getUserLastActivity(@Param('userId') userId: string) {
        return this.lastActiveService.getUserLastActivity(userId);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.STUDENT)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Admin uchun barcha foydalanuvchilarning oxirgi faolliklari' })
    @Get('admin/last-activity')
    getUserLastActivityAdmin() {
        return this.lastActiveService.getUserLastActivityForAdmin();
    }
}
