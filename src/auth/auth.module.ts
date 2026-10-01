import { AuthenticationModule } from '@nestjs/authentication';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { jwtConstants } from './constants.js';
import { CredentialsService } from './credentials.service.js';
import { JwtStrategy } from './jwt.strategy.js';

@Module({
  imports: [
    AuthenticationModule.forRoot({}),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, CredentialsService, JwtStrategy],
  exports: [CredentialsService],
})
export class AuthModule {}
