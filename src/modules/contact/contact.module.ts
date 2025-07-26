import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { JwtAccsesToken } from 'src/common/config/jwt/jwt';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register(JwtAccsesToken)],
  controllers: [ContactController],
  providers: [ContactService]
})
export class ContactModule {}
