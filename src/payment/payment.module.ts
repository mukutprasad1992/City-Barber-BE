import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentController } from './controller/payment.controller';
import { PaymentService } from './service/payment.service';
import { Payment, PaymentSchema } from './schema/payment.schema';

@Module({
  imports: [
   
  MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
  ],
  controllers: [PaymentController],
  providers: [ PaymentService],
})
export class PaymentModule { }
