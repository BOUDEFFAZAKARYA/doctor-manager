import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtOptions } from 'src/config/jwt.config';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, JwtModule.register(jwtOptions)],

  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
