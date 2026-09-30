import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from '../auth/dto/create-auth.dto.js';

@Injectable()
export class UserService {
  createUser(createAuthDto: CreateAuthDto) {
    return createAuthDto;
  }
}
