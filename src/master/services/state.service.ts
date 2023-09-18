import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { State, StateDocument } from "../schemas/state.schema";
import { Model } from "mongoose";

@Injectable()
export class StateService{
    constructor(@InjectModel(State.name) private stateModel: Model<StateDocument>) { }


    async createState(state: State){
        const createState = new this.stateModel(state);
      return  createState.save();
        
    }

    async getAllState(){
       return this.stateModel.find()
    }

    async findOne(stateid: string): Promise<any> {
      return await this.stateModel.findById(stateid).exec();
    }
      
      async deleteState(stateid: string): Promise<State> {
        const deleteStateById = await this.stateModel.findByIdAndDelete(stateid).exec();
        return deleteStateById
      }

      async update(stateId: string, updateState: State): Promise<State> {
        await this.stateModel.findByIdAndUpdate(stateId, updateState).exec();
        const UpdateState = await this.stateModel.findByIdAndUpdate(stateId, updateState).exec();
        return UpdateState
    }

  }
    



