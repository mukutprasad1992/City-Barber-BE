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
    
    async findAll(): Promise<any>  {
        return this.userModel.find()
      }

      async deleteUser(userid: string): Promise<User> {
        const deleteUserById = await this.userModel.findByIdAndDelete(userid).exec();
        return deleteUserById
      }

      async findOne(userid: string): Promise<User> {
        return await this.userModel.findById(userid).exec();
      }

      async update(userId: string, updateUser: User): Promise<User> {
        await this.userModel.findByIdAndUpdate(userId, updateUser).exec();
        const UpdateCity = await this.userModel.findByIdAndUpdate(userId, updateUser).exec();
        return UpdateCity
      }
}
