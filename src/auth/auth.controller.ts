/* eslint-disable prettier/prettier */


// auth.controller.ts
import { Controller, Post, Body, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { SignInDto } from './dto/signin.dto';



@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<{ token: string }> {

    console.log("Controller signup");
    const token = await  this.authService.signUp(createUserDto);

    console.log(token);

    return { token };
  }

  @Post('signin')
  async signIn(@Body(ValidationPipe) signInDto: SignInDto): Promise<{ token: string }> {
    const token = await this.authService.signIn(signInDto.email, signInDto.password);
    return { token };
  }

  @Post('test-protected-route')
  @UseGuards(AuthGuard)
  testProtectedRoute() {
    // This route is protected by the JwtAuthGuard
    return { message: 'You have access to this protected route!' };
  }
}
