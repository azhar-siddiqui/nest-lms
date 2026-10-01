import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto.js';
import { LoginUserDto } from '../user/dto/login-user.dto.js';
import { UserService } from '../user/user.service.js';
import { CredentialsService } from './credentials.service.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly credentialsService: CredentialsService,
    private jwtService: JwtService,
  ) {}

  async registerUser(createAuthDto: CreateUserDto) {
    const hashedPassword = await this.credentialsService.hashPassword(
      createAuthDto.password,
    );

    const user = await this.userService.registerUser({
      ...createAuthDto,
      password: hashedPassword,
    });

    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginUser(loginUserDto: LoginUserDto) {
    // 1. Try to find the user by email
    const user = await this.userService.findByEmail(loginUserDto.email);

    // 2. If user doesn't exist, throw a 401 Unauthorized error immediately
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. Verify the password
    const isPasswordValid = await this.credentialsService.validatePassword(
      loginUserDto.password,
      user.password,
    );

    // 4. If password doesn't match, throw the exact same 401 Unauthorized error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 5. If both pass, issue the JWT token
    const payload = { sub: user._id, email: user.email, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: string) {
    return `This action returns a ${id} auth`;
  }

  update(id: string, updateAuthDto: UpdateAuthDto) {
    return `This action updates a ${id} auth`;
  }

  remove(id: string) {
    return `This action removes a ${id} auth`;
  }
}
