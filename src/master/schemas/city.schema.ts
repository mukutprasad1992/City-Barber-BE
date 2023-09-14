import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type CityDocument = City & Document;

@Schema()
export class City {

    @Prop()
    cityName : string

    @Prop()
    stateId: string

}

export const CitySchema = SchemaFactory.createForClass(City);


