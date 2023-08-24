import { Injectable, UnauthorizedException  } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }
    async createUser(user: User): Promise<any> {
        const userExist = await this.userModel.findOne({ email: user.email });
        if (userExist) {
            throw new UnauthorizedException('Email already Exist ');
        }
        const createUser = new this.userModel(user);
        return createUser.save();
    }    
}
