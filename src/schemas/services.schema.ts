import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type ServicesDocument = Services & Document;
@Schema()
export class Services{
    @Prop()
    saloonId: string;
    @Prop()
    name: string;
    @Prop()
    price: string;
    @Prop()
    duration: string;
    
    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop()
    createdBy: string;

    @Prop()
    updatedBy: string;
   
    
}
export const ServicesSchema = SchemaFactory.createForClass(Services);
