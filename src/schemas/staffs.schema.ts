import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type StaffsDocument = Staffs & Document;
@Schema()
export class Staffs extends Document {
    @Prop()
    saloonId: string
    @Prop()
    name: string
    @Prop()
    expertise: string

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop()
    createdBy: string;

    @Prop()
    updatedBy: string;
   
    
}
export const StaffsSchema = SchemaFactory.createForClass(Staffs);


    