import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type StateDocument = State & Document;

@Schema()
export class State {

    @Prop()
    stateName : string
    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop()
    createdBy: string;

    @Prop()
    updatedBy: string;
    
}

export const StateSchema = SchemaFactory.createForClass(State);


