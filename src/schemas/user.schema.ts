import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop()
    username: string;

    @Prop()
    email: string;

    @Prop()
    phone: number;

    @Prop()
    password: number;

    @Prop()
    confirmpassword: number;

}

export const UserSchema = SchemaFactory.createForClass(User);