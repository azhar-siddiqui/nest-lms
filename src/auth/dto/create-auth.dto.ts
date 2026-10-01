import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  NotContains,
} from 'class-validator';
import { UserRole } from '../../user/enums/user-role.enum.js';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty({ message: 'First name is required.' })
  @MaxLength(50, { message: 'First name cannot exceed 50 characters.' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  fName!: string;

  @IsString()
  @IsNotEmpty({ message: 'Last name is required.' })
  @MaxLength(50, { message: 'Last name cannot exceed 50 characters.' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  lName!: string;

  @IsEmail({}, { message: 'Please provide a valid email address.' })
  @IsNotEmpty({ message: 'Email is required.' })
  @NotContains(' ', { message: 'Email must not contain any spaces.' }) // 👈 Rejects the request if spaces exist
  @Transform(({ value }) =>
    typeof value === 'string'
      ? value.trim().toLowerCase() // 👈 Only trim leading/trailing spaces, don't remove internal ones
      : value,
  )
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(4, { message: 'Password must be at least 4 characters long.' })
  @MaxLength(64, { message: 'Password cannot exceed 64 characters.' })
  //   @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //     message:
  //       'Password is too weak. It must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character.',
  //   })
  password!: string;

  @IsEnum(UserRole, { message: 'Role must be either user or admin.' })
  @IsOptional() // Optional because the DB fallback handles it
  role?: UserRole;
}
