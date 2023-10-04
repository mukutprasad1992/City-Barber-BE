import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
 
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Res() res): Promise<void> {
    const login = await this.authService.login(loginDto);

    // Check if login was successful
    if (!login) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        status: false,
        message: 'Invalid credentials',
      });
      return;
    }

    res.status(HttpStatus.OK).json({
      status: true,
      message: 'Login successfully',
      login,  // Include the token in the response
    });
  }
}
