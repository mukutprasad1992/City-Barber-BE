import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../../services/login/auth.service';
import { LoginDto } from '../../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
}