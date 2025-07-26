import { BadRequestException, Body, Controller, Get, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UpdateMyProfileDto } from './dto/update-profile.dto';
import { UpdateLastActivateDto } from './dto/update-last-activate.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}


  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Hozirgi foydalanuvchi profilingi maʼlumotlari' })
  @ApiBearerAuth()
  @Get('my')
  getMyProfile(@Req() req: Request) {
    return this.profileService.getMyProfile(req['user'].id);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Profil maʼlumotlarini va rasmni yangilash' })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Profil maʼlumotlari va avatar rasm',
    schema: {
      type: 'object',
      properties: {
        fullName: { type: 'string' },
        bio: { type: 'string' },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Put('update/my')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/images',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `user-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return cb(
            new BadRequestException({
              success: false,
              message: 'Only image files are allowed!',
            }),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async updateMyProfile(
    @Req() req: Request,
    @UploadedFile() image: Express.Multer.File,
    @Body() payload: UpdateMyProfileDto,
  ) {
    return this.profileService.updateMyProfile(req['user'].id, payload, image?.filename);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Foydalanuvchining oxirgi faolligini olish' })
  @ApiBearerAuth()
  @Get('last-activate')
  getProfileLastActivate(@Req() req: Request) {
    return this.profileService.getProfileLastActivate(req['user'].id);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Foydalanuvchining oxirgi faolligini yangilash' })
  @ApiBearerAuth()
  @Put('last-acivaye')
  updateLastActivate(@Body() payload: UpdateLastActivateDto, @Req() req: Request) {
    return this.profileService.updateLastActivity(req['user'].id, payload);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Telefon raqamni yangilash' })
  @ApiBearerAuth()
  @Put('update/phone')
  updatePhone(@Req() req: Request, @Body() payload: UpdatePhoneDto) {
    return this.profileService.updatePhone(req['user'].id, payload);
  }
}
