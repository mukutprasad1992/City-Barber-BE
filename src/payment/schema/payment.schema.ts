import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsISO8601, IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';
export type PaymentDocument = Payment & Document;

@Schema()
export class Payment {

    @IsNotEmpty()
    @Prop()
    appointmentId: string;

    @Prop()
    amount: number;

    @Prop()
    convenientFee: number;

    @Prop()
    status: string;

    @IsNotEmpty()
    @Prop()
    paymentMode: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop()
    createdBy: string;

    @Prop()
    updatedBy: string;

}

export const PaymentSchema = SchemaFactory.createForClass(Payment);


