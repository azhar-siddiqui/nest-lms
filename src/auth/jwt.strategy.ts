import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  /**
   * Passport automatically verifies the signature and expiration first.
   * If valid, it invokes validate() with the decoded token payload.
   * Whatever this method returns is injected into `req.user`.
   */
  async validate(payload: {
    sub: string | number;
    email: string;
    role: string;
  }) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
