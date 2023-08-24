import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from '../../utils/Token/jwt.strategy';
import { UserSchema } from '../schemas/user.schema';

import { ForgotPasswordController } from './controller/forgot-password.controller';
import { ForgotPasswordService } from './services/forgot-password.service'
import { EmailService } from 'utils/email/email.service';
import { ResetPasswordService } from './services/reset-password.service';
import { ResetPasswordController } from './controller/reset-password.controller';

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