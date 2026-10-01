import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRole } from '../enums/user-role.enum.js';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true, // Automatically manages createdAt and updatedAt
  versionKey: false, // Optional: hides the __v field
})
export class User {
  @Prop({
    required: true,
    trim: true,
    maxlength: 50,
  })
  fName: string;

  @Prop({
    required: true,
    trim: true,
    maxlength: 50,
  })
  lName: string;

  @Prop({
    required: true,
    unique: true,
    trim: true, // Trims outer spaces
    lowercase: true,
    match: [
      /^\S+@\S+\.\S+$/,
      'Email must be a valid format and cannot contain spaces.',
    ], // 👈 Final DB-level validation block
  })
  email: string;

  @Prop({
    required: true,
    minlength: 4,
  })
  password: string;

  @Prop({
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.STUDENT,
    required: true,
  })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
