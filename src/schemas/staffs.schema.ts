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
   
    
}
export const StaffsSchema = SchemaFactory.createForClass(Staffs);


    