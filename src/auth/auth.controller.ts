import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto.js';
import { LoginUserDto } from '../user/dto/login-user.dto.js';
import { AuthGuard } from './auth.guard.js';
import { AuthService } from './auth.service.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const token = await this.authService.registerUser(createUserDto);

    return token;
  }

  // @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.loginUser(loginUserDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async findUserProfile(@Request() req: any) {
    const id = req.user?.sub;
    if (!id) {
      throw new UnauthorizedException('User ID not found in request');
    }

    return await this.authService.findUser(id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async findUser(@Param('id') id: string) {
    return await this.authService.findUser(id);
  }

  @Get('sign-out')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async signOut() {
    return await this.authService.signOut();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
