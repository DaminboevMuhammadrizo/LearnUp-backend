import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { PrismaModule } from 'src/Database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RatingController],
  providers: [RatingService]
})
export class RatingModule {}
