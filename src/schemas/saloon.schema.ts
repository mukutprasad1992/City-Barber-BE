import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type SaloonDocument = Saloon & Document;
@Schema()
export class Saloon extends Document {
    @Prop()
    saloonName: string;
    @Prop()
    ownerName: string;
    @Prop()
    email: string;
    @Prop()
    phone: number;
    @Prop()
    state: string;
    @Prop()
    city: string;
    @Prop()
    address: string;
    @Prop()
    pincode: number;
    @Prop()
    registrationNumber: string;
    @Prop()
    GSTNumber: string;
    @Prop()
    documents: string[];
}
export const SaloonSchema = SchemaFactory.createForClass(Saloon);
