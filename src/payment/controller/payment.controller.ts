import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UnauthorizedException } from "@nestjs/common";
import { PaymentService } from "../service/payment.service";
import { Payment } from "../schema/payment.schema";

@Controller('payment')
export class PaymentController{

    constructor(private readonly paymentService: PaymentService) { }

    @Post('create')
    async createPayment(@Res() response, @Body() payment: Payment){
        try{
        const createPayment = await this.paymentService.createPayment(payment)
        return response.status(HttpStatus.CREATED).json({
            status: true,
            message: "Payment entered successfully",
            data: createPayment
        })
    
}catch(error){
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: "Error in creating Payment",
        error: error.message
    });
}
    }


    @Get('/paymentID:paymentId')
    async cityById(@Param('paymentId') paymentId: string, @Res() Response) {
        try {
            const getPaymentById = await this.paymentService.findOne(paymentId);
            return Response.status(HttpStatus.OK).json({
                status: true,
                message: "Fetched payment by Id successfully",
                data: getPaymentById
            });
        } catch (error) {
            return Response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error in fetching payment by id",
                error: error.message
            });

        }
    }

    @Get('/getAll')
    async getPayments(@Res() response): Promise<any> {
        try {
            const getPayments = await this.paymentService.getPayments();
            return response.status(HttpStatus.OK).json({
                status: true,
                message: "List of all Payments ",
                data: getPayments
            })
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error in getting all the  payments",
                error: error.message
            });

        }
    }

    @Delete('delete:paymentId')
    async deleteCityById(@Param('paymentId') paymentId: string, @Res() Response) {
        try {
            
            const deleteCPaymentById = await this.paymentService.deletePayment(paymentId);
            if(!deleteCPaymentById){
                throw new UnauthorizedException("not exist !")
            }
            return Response.status(HttpStatus.OK).json({
                status: true,
                message: "Payment deleted successfully",
                data: {}
            })

        } catch (error) {
            return Response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error in deleting payment",
                error: error.message
            });

        }
    }

    @Put(':paymentId')
    async putStateById(@Param('paymentId') paymentId: string, @Body() updatePayment: Payment, @Res() Response) {
        try {
            const putPaymentId = await this.paymentService.update(paymentId, updatePayment);
            if(!putPaymentId){
                throw new UnauthorizedException("not exist !")
            }
            return Response.status(HttpStatus.OK).json({
                status: true,
                message: "Payment updated successfully",
                data: putPaymentId
            });
        } catch (error) {
            return Response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error in updating payment",
                error: error.message
            });

        }
    }
}
