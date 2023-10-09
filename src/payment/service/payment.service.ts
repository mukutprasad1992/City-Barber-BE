import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Payment, PaymentDocument } from "../schema/payment.schema";
import { Model } from "mongoose";
import { AppointmentService } from "src/appointments/service/appointment.services";

@Injectable()
export class PaymentService {

    constructor(@InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,private appointmentService:AppointmentService) { }

    async createPayment(payment: Payment) {

        const appointment = await this.appointmentService.findOne(payment.appointmentId);
        if (!appointment) {
          throw new Error('Invalid appointmentId. Appointment not found.');
        }
        const createPayment = new this.paymentModel(payment)
        return createPayment.save()
    }

    async findOne(paymentid: string): Promise<any> {
        const payment = await this.paymentModel.findById(paymentid).exec();

        if (!payment) {
            throw new Error('Appointment not found');
          }
          return payment
    }

    async getPayments(): Promise<any> {
        return this.paymentModel.find()
    }

    async deletePayment(paymentid: string): Promise<Payment> {
        const deletePaymentById = await this.paymentModel.findByIdAndDelete(paymentid).exec();
        return deletePaymentById
    }

    async update(paymentId: string, updatePayment: Payment): Promise<Payment> {
        await this.paymentModel.findByIdAndUpdate(paymentId, updatePayment).exec();
        const UpdatePayment = await this.paymentModel.findByIdAndUpdate(paymentId, updatePayment).exec();
        return UpdatePayment

    }

}