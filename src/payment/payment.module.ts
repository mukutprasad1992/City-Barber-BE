import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentController } from './controller/payment.controller';
import { PaymentService } from './service/payment.service';
import { Payment, PaymentSchema } from './schema/payment.schema';
import { AppointmentModule } from 'src/appointments/appointment.module';
import { AppointmentService } from 'src/appointments/service/appointment.services';

@Module({
  imports: [
  
  MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
  AppointmentModule,
  
  ],
  controllers: [PaymentController],
  providers: [ PaymentService],
})
export class PaymentModule { } 
