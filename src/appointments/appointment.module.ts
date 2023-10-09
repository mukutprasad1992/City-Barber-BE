import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentService } from './service/appointment.services';
import { AppointmentController } from './controller/appointment.controller';
import { Appointment, AppointmentSchema } from './schema/appointment.schema';
import { AuthenticationMiddleware } from './../middleware/authentication.middleware';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'utils/Token/jwt.strategy';

@Module({
  imports: [
   
  MongooseModule.forFeature([{ name: Appointment.name, schema: AppointmentSchema }]),
  ],
  controllers: [AppointmentController],
  providers: [ AppointmentService],
  exports: [AppointmentService],
})
export class AppointmentModule {}

