import { Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SaloonModule } from './saloon/saloon.module';
import { UserModule } from './user/user.module'
import { MulterModule } from '@nestjs/platform-express';
import { FileUploadService } from '../utils/file-upload/file-upload.service';
import { CityModule } from './master/city.module';
import { StateModule } from './master/state.module';
import { StaffsModule } from './staffs/staffs.module';
import { ServicesModule } from './saloonServices/Services.module';
import { AppointmentModule } from './appointments/appointment.module';
import { PaymentModule } from './payment/payment.module';
import { JwtService } from '@nestjs/jwt';


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
    CityModule,
    StaffsModule,
    AppointmentModule,
    ServicesModule,
    StateModule,
    SaloonModule,
    UserModule,
    PaymentModule],
  controllers: [],
  providers: [FileUploadService,JwtService],
})
export class AppModule{ }
