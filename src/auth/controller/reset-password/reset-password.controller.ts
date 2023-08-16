import { Body, Controller, Post } from '@nestjs/common';
import { ResetPasswordService } from '../../services/reset-password/reset-password.service';
import { ResetPasswordDto } from '../../dto/resetPassword.dto';

@Controller('reset-password')
export class ResetPasswordController {
  constructor(private ResetPasswordService: ResetPasswordService) {}

  @Post('/reset')
  reset(@Body() resetPasswordDto: ResetPasswordDto): Promise<any> {
    return this.ResetPasswordService.reset(resetPasswordDto);
  }
}




