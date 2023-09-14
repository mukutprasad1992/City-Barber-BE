import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { City, CityDocument } from "../schemas/city.schema"


@Injectable()
export class CityService {

  constructor(@InjectModel(City.name) private cityModel: Model<CityDocument>) { }

  async createCity(city: City) {
    const createCity = new this.cityModel(city);
    return createCity.save();

  }

  async getCities(): Promise<any>  {
    return this.cityModel.find()
  }

  async getCityByState(stateId: string): Promise<any> {
    return this.cityModel.find({ stateId }).exec();

  }

  async findOne(cityid: string): Promise<any> {
    return await this.cityModel.findById(cityid).exec();
  }

  async deleteCity(cityid: string): Promise<City> {
    const deleteCityById = await this.cityModel.findByIdAndDelete(cityid).exec();
    return deleteCityById
  }

  async update(cityId: string, updateCity: City): Promise<City> {
    await this.cityModel.findByIdAndUpdate(cityId, updateCity).exec();
    const UpdateCity = await this.cityModel.findByIdAndUpdate(cityId, updateCity).exec();
    return UpdateCity
  }
}

