import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Appointment, AppointmentDocument } from "../schema/appointment.schema";


@Injectable()
export class AppointmentService {

  constructor(@InjectModel(Appointment.name) private appointmentModel: Model<AppointmentDocument>) { }

  async createAppointment(appointment: Appointment) {
    const { startTime, endTime } = appointment;
  
    if (startTime >= endTime) {
      throw new Error('Start time must be less than end time');
    }
    if (startTime >= endTime) {
      throw new Error('Start time must be less than end time');
    }

    const createAppointment = new this.appointmentModel(appointment);
    return createAppointment.save();
  }

  async findOne(appointmentid: string): Promise<any> {
    const appointment  = await this.appointmentModel.findById(appointmentid).exec();
    if (!appointment) {
      throw new Error('Appointment not found');
    }
     return appointment 
    
  }
  async getAppointments(): Promise<any> {
    return await this.appointmentModel.find()
  }

  async deleteAppointment(appointmentid: string): Promise<Appointment> {
    const deleteAppointmentById = await this.appointmentModel.findByIdAndDelete(appointmentid).exec();
    return deleteAppointmentById
  }

  async update(appointmentId: string, updateAppointment: Appointment): Promise<Appointment> {
    await this.appointmentModel.findByIdAndUpdate(appointmentId, updateAppointment).exec();
    const UpdateAppointment = await this.appointmentModel.findByIdAndUpdate(appointmentId, updateAppointment).exec();
    return UpdateAppointment
  }

}