/* eslint-disable prettier/prettier */


// auth.service.ts
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserService , // Inject your user repository or service
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<string> {
    const { email } = createUserDto;

    // Check if the email is already in use
    const existingUser = await this.userRepository.findUserByEmail(email );

    console.log("qljncqnscn");

    if (existingUser) {
      throw new ConflictException('Email address already in use');
    }

    // Create a new user
    const newUser = await this.userRepository.create(createUserDto);

    console.log(newUser);

    // Generate a JWT token for the new user
    return this.generateToken(newUser.id, newUser.email, newUser.role);
  }

  async signIn(email: string, password: string): Promise<string> {
    // Validate the user's credentials (you need to implement this logic)
    const user = await this.userRepository.validateUser(email, password);


    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Generate a JWT token for the authenticated user
    return this.generateToken(user.id, user.email, user.role);
  }

  private generateToken(userId: number, userEmail: string, userRoles: string): string {
    const payload = { userId, userEmail, roles: userRoles }; // Include roles in the payload
    return this.jwtService.sign(payload);
  }

  async validateToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
