/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from 'src/config/jwt.config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Authentication token not found.');
    }

    try {
        const payload = await this.jwtService.verifyAsync(token, {
            secret: jwtConstants.secret,
          });
    
          request['user'] = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid authentication token.');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      return undefined;
    }

    const [bearer, token] = authorizationHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return undefined;
    }

    return token;
  }
}
