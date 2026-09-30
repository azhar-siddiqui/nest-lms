import { AuthenticationModule } from '@nestjs/authentication';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

@Module({
  imports: [AuthenticationModule.forRoot({}), UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
