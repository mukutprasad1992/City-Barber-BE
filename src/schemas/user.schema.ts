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

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop()
    createdBy: string;

    @Prop()
    updatedBy: string;

}

export const UserSchema = SchemaFactory.createForClass(User);