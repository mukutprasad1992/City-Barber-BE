import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Saloon, SaloonDocument } from "../../schemas/saloon.schema";
import { response } from "express";
@Injectable()
export class SaloonService {
    constructor(@InjectModel(Saloon.name) private saloonModel: Model<SaloonDocument>) { }

    async createUser(user: Saloon): Promise<any> {
        const userExist = await this.saloonModel.findOne({ email: user.email });
        if (userExist) {
            throw new UnauthorizedException('Email already Exist ');
        }
        const registrationNumberExist = await this.saloonModel.findOne({ registrationNumber: user.registrationNumber });
        if (registrationNumberExist) {
            throw new UnauthorizedException('registrationNumber already Exist ');
        }
        const GSTNumberExist = await this.saloonModel.findOne({ GSTNumber: user.GSTNumber });
        if (GSTNumberExist) {
            throw new UnauthorizedException('GSTNumber already Exist ');
        }
        const createUser = new this.saloonModel(user);
        return createUser.save();
    }

    async getAllUser(): Promise<any> {
        return await this.saloonModel.find();
    }

    async getUserByEmail(email: any): Promise<any> {
        return await this.saloonModel.findOne({ email: email });

    }

    async findOneBarber(barberid: string): Promise<any> {
        return await this.saloonModel.findById(barberid);
      }
    // async deleteUser(id: any): Promise<any> {
    //     console.info("id", id)
    //     const userExist = this.saloonModel.findByIdAndDelete(id);
    //     console.info("userExist: ", userExist)
    //     if (!userExist) {
    //         return response.json({
    //             status: false,
    //             message: "User is not Exist",
    //         })
    //     }
    //     return response.json({
    //         status: true,
    //         message: "User is Deleted Succesfully",
    //     })

    // }
    async deleteUserById(userid: string): Promise<any>{
        return await this.saloonModel.findByIdAndDelete(userid)
    }
}
