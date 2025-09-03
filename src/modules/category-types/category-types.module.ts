import { Module } from '@nestjs/common';
import { CategoryTypesController } from './category-types.controller';
import { CategoryTypesService } from './category-types.service';
import { JwtAccsesToken } from 'src/common/config/jwt/jwt';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/Database/prisma.module';

@Module({
  imports: [PrismaModule, JwtModule.register(JwtAccsesToken)],
  controllers: [CategoryTypesController],
  providers: [CategoryTypesService]
})
export class CategoryTypesModule { }
