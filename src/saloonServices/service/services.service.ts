import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Services, ServicesDocument } from "src/schemas/services.schema";

@Injectable()
export class SaloonServices{
    constructor(@InjectModel(Services.name) private servicesModel: Model<ServicesDocument>) { }


    async createServices(services: Services){
        const createServices = new this.servicesModel(services);
      return  createServices.save();
        
    }

    async getAllServices(){
       return this.servicesModel.find().exec();
    }

    async findOne(serviceid: string): Promise<any> {
      return await this.servicesModel.findById(serviceid).exec();
    }
      
      async deleteService(serviceid: string): Promise<Services> {
        const deleteServiceById = await this.servicesModel.findByIdAndDelete(serviceid).exec();
        return deleteServiceById
      }

      async update(serviceId: string, updateService: Services): Promise<Services> {
        await this.servicesModel.findByIdAndUpdate(serviceId, updateService).exec();
        const UpdateService = await this.servicesModel.findByIdAndUpdate(serviceId, updateService).exec();
        return UpdateService
      }

      async getServicesBySaloon(saloonId: string): Promise<any> {
        return this.servicesModel.find({ saloonId }).exec();
    
      }

  }
    



