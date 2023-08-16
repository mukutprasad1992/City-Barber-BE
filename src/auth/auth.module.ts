import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controller/login/auth.controller';
import { AuthService } from './services/login/auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserSchema } from '../schemas/user.schema';
import { ForgotPasswordController } from './controller/Forgot-password/Forgot-password.controller';
import { ForgotPasswordService } from './services/Forgot-password/Forgot-password.service'
import { EmailService } from 'utils/email/email.service';
import { ResetPasswordService } from './services/reset-password/reset-password.service';
import { ResetPasswordController } from './controller/reset-password/reset-password.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT-EXPIRE'),
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController,ForgotPasswordController,ResetPasswordController],
  providers: [AuthService, JwtStrategy,ForgotPasswordService,EmailService,ResetPasswordService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}