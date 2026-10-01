import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthDto } from '../auth/dto/create-auth.dto.js';
import { User } from './schemas/user.schema.js';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createAuthDto: CreateAuthDto) {
    const user = await this.userModel.create(createAuthDto);
    return user;
  }
}
