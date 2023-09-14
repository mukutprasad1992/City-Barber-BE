import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Services, ServicesDocument } from "src/schemas/services.schema";
import { Staffs, StaffsDocument } from "src/schemas/staffs.schema";

@Injectable()
export class StaffsService{
    constructor(@InjectModel(Staffs.name) private staffsModel: Model<StaffsDocument>) { }


    async createStaffs(staffs: Staffs){
        const createStaffs = new this.staffsModel(staffs);
      return  createStaffs.save();
        
    }

    async getAllStaffs(){
       return this.staffsModel.find()
    }

    async findOne(staffsid: string): Promise<any> {
      return await this.staffsModel.findById(staffsid).exec();
    }
      
      async deleteStaffsById(staffsid: string): Promise<Staffs> {
        const deleteStaffsById = await this.staffsModel.findByIdAndDelete(staffsid).exec();
        return deleteStaffsById
      }

      async update(staffsId: string, updateStaffs: Staffs): Promise<Staffs> {
        await this.staffsModel.findByIdAndUpdate(staffsId, updateStaffs).exec();
        const UpdateStaffs = await this.staffsModel.findByIdAndUpdate(staffsId, updateStaffs).exec();
        return UpdateStaffs
      }

      async getStaffsBySaloon(saloonId: string): Promise<any> {
        return this.staffsModel.find({ saloonId }).exec();
    
      }



  }
