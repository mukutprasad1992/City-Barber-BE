import { Controller, Param, Post, Body } from '@nestjs/common';
import { ForgotPasswordService } from '../services/forgot-password.service'
import { ForgotPasswordDto } from '../dto/forgetPassword.dto';

// import { User } from "src/schemas/user.schema";

@Controller('forgot-password')
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) { }

  @Post('/forgot-password')
  async forgotPassword(@Body() ForgotPasswordDto: ForgotPasswordDto): Promise<any> {
    return this.forgotPasswordService.sendPasswordResetEmail(ForgotPasswordDto);
  }

  @Post('/forgot-password/:token')
  async ForgotPassword(
    @Param('token') token: string,
    @Body('newPassword') newPassword: string,
  ): Promise<any> {
    return await this.forgotPasswordService.resetPassword(token, newPassword);
  } 
}