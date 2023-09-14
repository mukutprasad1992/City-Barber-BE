import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type StateDocument = State & Document;

@Schema()
export class State {

    @Prop()
    stateName : string
    
}

export const StateSchema = SchemaFactory.createForClass(State);


