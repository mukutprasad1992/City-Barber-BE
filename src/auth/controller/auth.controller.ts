import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() loginDto: LoginDto,@Res() Response): Promise<{ token: string }> {
    const login = this.authService.login(loginDto);
    return Response.status(HttpStatus.OK).json({
      status: true,
      message: "Login successfully",
      
  });
  }
}