import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AppointmentService } from "../service/appointment.services";
import { Appointment } from "../schema/appointment.schema";


@Controller('appointment')
export class AppointmentController {

    constructor(private readonly appointmentService: AppointmentService) { }


    @Post('/create')
    async createAppointment(@Res() response, @Body() appointment: Appointment) {
        try {
            const createdAppointment = await this.appointmentService.createAppointment(appointment);
            return response.status(HttpStatus.CREATED).json({
                status: true,
                message: "Appointment entered successfully",
                data: createdAppointment 
            });
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error creating appointment",
                error: error.message
            });
        }
    }

    @Get('/appointmentID:appointmentId')
    async cityById(@Param('appointmentId') appointmentId: string, @Res() Response) {
        try {
            const getAppointmentById = await this.appointmentService.findOne(appointmentId);
            return Response.status(HttpStatus.OK).json({
                status: true,
                message: "get appointment by ID successfully",
                data: getAppointmentById
            });
        } catch (error) {
            return Response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error in getting appointment by id",
                error: error.message
            });

        }
    }

    @Get("/getAll")
    async getAllAppointment(@Res() response): Promise<any> {
        try {
            const getAppointments = await this.appointmentService.getAppointments();
            return response.status(HttpStatus.OK).json({
                status: true,
                message: "List of all appointments ",
                data: getAppointments
            })
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error in getting all the  appointments",
                error: error.message
            });

        }
    }

    @Delete('delete:appointmentId')
    async deleteCityById(@Param('appointmentId') appointmentId: string, @Res() Response) {
        try {
            const deleteAppointmentById = await this.appointmentService.deleteAppointment(appointmentId);
            if(!deleteAppointmentById){
                throw new UnauthorizedException("not exist !")
            }
            return Response.status(HttpStatus.OK).json({
                status: true,
                message: "Appointment deleted successfully",
                data: {}
            })

        } catch (error) {
            return Response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error in deleting appointment",
                error: error.message
            });

        }
    }

    @Put(':appointmentId')
    async putAppointmentById(@Param('appointmentId') appointmentId: string, @Body() updateappointment: Appointment, @Res() Response) {
        try {
            const putAppointmentId = await this.appointmentService.update(appointmentId, updateappointment);
            return Response.status(HttpStatus.OK).json({
                status: true,
                message: "Appointment updated successfully",
                data: putAppointmentId
            });
        } catch (error) {
            return Response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error in updating appointment",
                error: error.message
            });

        }
    }

}