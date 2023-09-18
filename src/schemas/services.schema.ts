import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type ServicesDocument = Services & Document;
@Schema()
export class Services extends Document {
    @Prop()
    saloonId: string;
    @Prop()
    name: string;
    @Prop()
    price: string;
    @Prop()
    duration: string;
   
    
}
export const ServicesSchema = SchemaFactory.createForClass(Services);
