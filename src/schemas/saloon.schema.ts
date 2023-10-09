import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';
export type SaloonDocument = Saloon & Document;
@Schema()
export class Saloon {

    @IsNotEmpty()
    @Prop()
    saloonName: string;

    @IsNotEmpty()
    @Prop()
    ownerName: string;

    @IsNotEmpty()
    @Prop()
    email: string;

    @IsNotEmpty()
    @Prop()
    phone: number;

    @IsNotEmpty()
    @Prop()
    state: string;

    @IsNotEmpty()
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

    @IsNotEmpty()
    @Prop()
    latitude: number;
    
    @IsNotEmpty()
    @Prop()
    longitude: number;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop()
    createdBy: string;

    @Prop()
    updatedBy: string;
}
export const SaloonSchema = SchemaFactory.createForClass(Saloon);
