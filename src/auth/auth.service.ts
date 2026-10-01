import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service.js';
import { CredentialsService } from './credentials.service.js';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly credentialsService: CredentialsService,
    private jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const hashedPassword = await this.credentialsService.hashPassword(
      createAuthDto.password,
    );

    const user = await this.userService.createUser({
      ...createAuthDto,
      password: hashedPassword,
    });

    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
