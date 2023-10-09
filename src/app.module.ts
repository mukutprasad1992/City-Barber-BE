import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { AuthenticationMiddleware } from './middleware/authentication.middleware';


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
export class AppModule implements NestModule   { 

  configure(consumer: MiddlewareConsumer) {
    // Apply the authentication middleware globally to all routes
    consumer.apply(AuthenticationMiddleware).forRoutes('appointment');
    consumer.apply(AuthenticationMiddleware).forRoutes('payment');
    consumer.apply(AuthenticationMiddleware).forRoutes('city');
    consumer.apply(AuthenticationMiddleware).forRoutes('state');
    consumer.apply(AuthenticationMiddleware).forRoutes('saloon');
    consumer.apply(AuthenticationMiddleware).forRoutes('services');
    consumer.apply(AuthenticationMiddleware).forRoutes('staffs');
    consumer.apply(AuthenticationMiddleware).forRoutes('users/getAll');
    consumer.apply(AuthenticationMiddleware).forRoutes('users/:userId');
    consumer.apply(AuthenticationMiddleware).forRoutes('users/userID/:userId');
    consumer.apply(AuthenticationMiddleware).forRoutes('users/delete/:userId');
  }
}