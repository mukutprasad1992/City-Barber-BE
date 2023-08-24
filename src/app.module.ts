import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SaloonModule } from './saloon/saloon.module';
import { UserModule } from './user/user.module'
import { MulterModule } from '@nestjs/platform-express';
import { FileUploadService } from '../utils/file-upload/file-upload.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb+srv://mukutprasad1992:UBEIMYRArEJCYTmK@cluster1.xhgrbkb.mongodb.net/citybarberdb'),
    MulterModule.register({
      dest: './uploads', // Destination folder for storing uploaded files
    }),
    AuthModule,
    SaloonModule,
    UserModule],
  controllers: [],
  providers: [FileUploadService],
})
export class AppModule { }
