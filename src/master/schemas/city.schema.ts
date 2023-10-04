import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type CityDocument = City & Document;

@Schema()
export class City {

    @Prop()
    cityName : string

    @Prop()
    stateId: string

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop()
    createdBy: string;

    @Prop()
    updatedBy: string;

}

export const CitySchema = SchemaFactory.createForClass(City);


