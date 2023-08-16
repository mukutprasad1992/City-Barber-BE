import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from 'utils/email/email.service';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      envFilePath: '.env',
    isGlobal: true,}),
    MongooseModule.forRoot('mongodb+srv://mukutprasad1992:UBEIMYRArEJCYTmK@cluster1.xhgrbkb.mongodb.net/citybarberdb'),
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  AuthModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService,EmailService],
})
export class AppModule { }
