import { Controller, Param, Post, Body } from '@nestjs/common';
import { ForgotPasswordService } from '../../services/Forgot-password/Forgot-password.service'
import { ForgotPasswordDto } from '../../dto/forgetPassword.dto';

// import { User } from "src/schemas/user.schema";

@Controller('Forgot-password')
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) { }

  @Post('/forgot-password')
  async forgotPassword(@Body() ForgotPasswordDto: ForgotPasswordDto): Promise<void> {
    return this.forgotPasswordService.sendPasswordResetEmail(ForgotPasswordDto);
  }

  @Post('/forgot-password/:token')
  async ForgotPassword(
    @Param('token') token: string,
    @Body('newPassword') newPassword: string,
  ): Promise<void> {
    return await this.forgotPasswordService.resetPassword(token, newPassword);
  }


  
  
}
