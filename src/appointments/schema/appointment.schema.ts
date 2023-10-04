import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsISO8601, IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';
export type AppointmentDocument = Appointment & Document;

@Schema()
export class Appointment {

    @IsISO8601()
    @Prop()
    startTime: Date;

    @IsISO8601()
    @Prop()
    endTime: Date;

    @Prop()
    saloonId: string;

    @IsNotEmpty()
    @Prop()
    serviceId: [string];

    @Prop()
    staffId: [string];

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop()
    createdBy: string;

    @Prop()
    updatedBy: string;

}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);


