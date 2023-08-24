import { Prop, Schema, SchemaFactory ,} from "@nestjs/mongoose";
import { model, Document } from "mongoose";

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
    password: string;

    @Prop()
    confirmpassword: string;   

}

export const UserSchema = SchemaFactory.createForClass(User);