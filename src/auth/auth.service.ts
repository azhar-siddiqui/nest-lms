import { PasswordHasher } from '@nestjs/authentication';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const hashedPassword = await this.passwordHasher.hash(
      createAuthDto.password,
    );

    return this.userService.createUser({
      ...createAuthDto,
      password: hashedPassword,
    });
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
