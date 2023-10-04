import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentService } from './service/appointment.services';
import { AppointmentController } from './controller/appointment.controller';
import { Appointment, AppointmentSchema } from './schema/appointment.schema';
import { AuthenticationMiddleware } from 'src/middleware/authentication.middleware';
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
})
export class AppointmentModule  implements NestModule   { 

  configure(consumer: MiddlewareConsumer) {
    // Apply the authentication middleware globally to all routes
    consumer.apply(AuthenticationMiddleware).forRoutes('appointment');
  }
}
