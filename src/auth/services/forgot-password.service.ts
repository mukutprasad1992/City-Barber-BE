import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ForgotPasswordDto } from '../dto/forgetPassword.dto'
import { EmailService } from '../../../utils/email/email.service'
@Injectable()
export class ForgotPasswordService {
  constructor(@InjectModel(User.name)
  private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private emailService: EmailService
  ) { }
  async sendPasswordResetEmail(ForgotPasswordDto: ForgotPasswordDto): Promise<any> {
    const { email } = ForgotPasswordDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('User is not exist ');
    }
    const resetToken = this.jwtService.sign({ id: user._id });

    const resetLink = `http://localhost:4200/auth/createpasswors/${resetToken}`;
    const subject: any = "Reset Password ";
    const html: any = `<!DOCTYPE html>
    <html>
    <head>
      <title>Password Reset</title>
    </head>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
      <div style="background-color: #333; color: #fff; text-align: center; padding: 10px;">
        <h1>Password Reset</h1>
      </div>
      <div style="padding: 20px;">
        <p>Hello ${user.username},</p>
        <p>We received a request to reset your password for ${user.username}.</p>
        <p>If you didn't make this request, you can ignore this email. Otherwise, you can reset your password using the link below:</p>
        <p><a href="${resetLink}" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none;">${resetLink}</a></p>
        <p>This link will expire in 10 minuts.</p>
        <p>If you have any questions or need assistance, please contact our support team at [Support Email].</p>
        <p>Best regards,<br>City-Barber Team</p>
      </div>
      <div style="background-color: #333; color: #fff; text-align: center; padding: 10px;">
        <p>&copy; 2023 City-Barber. All rights reserved.</p>
      </div>
    </body>
    `;
    try {
      await this.emailService.sendEmail(user.email, subject, html);
      return { message: 'Email sent successfully' };
    } catch (error) {
      return { message: 'Failed to send email' };
    }
  }
  async resetPassword(resetToken: string, newPassword: string): Promise<void> {
    const user = await this.userModel.findOne({ resetToken });

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    user.password = newPassword;
    await user.save();
  }
}
