import { PasswordHasher } from '@nestjs/authentication';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CredentialsService {
  constructor(private readonly passwordHasher: PasswordHasher) {}

  /**
   * Hashes a plain text password before saving it to the database.
   *
   * @param password The plain text password
   * @returns The hashed password string
   */
  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await this.passwordHasher.hash(password);

    return hashedPassword;
  }

  /**
   * Compares a plain text password against a stored hash.
   * Use this during the login flow.
   *
   * @param password The plain text password from the login request
   * @param hash The hashed password stored in the database
   * @returns True if the password matches, false otherwise
   */
  async validatePassword(password: string, hash: string): Promise<boolean> {
    return await this.passwordHasher.verify(password, hash);
  }
}
