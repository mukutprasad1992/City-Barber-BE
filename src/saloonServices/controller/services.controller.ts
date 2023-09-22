import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { Services } from "src/schemas/services.schema";
import { SaloonServices } from "../service/services.service";

@Controller('services')
export class ServicesController {

    constructor(private readonly saloonServices: SaloonServices) { }


    @Post('/create')
    async createServices(@Res() response, @Body() services: Services) {
        try{
        const createServices = await this.saloonServices.createServices(services);
        return response.status(HttpStatus.CREATED).json({
            status: true,
            message: "State entered successfully",
            data: createServices
        })
    }catch (error) {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: "Error in creating service",
            error: error.message
        });

    }
}

    @Get('/getAll')
    async getAllServices(@Res() response) {
        try{
        const getAllServices = await this.saloonServices.getAllServices();
        return response.status(HttpStatus.OK).json({
            status: true,
            message: "List of all services ",
            data: getAllServices
        })
    }catch (error) {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: "Error in get all services",
            error: error.message
        });

    }
}

    @Get('/serviceID:serviceId')
    async cityServiceId(@Param('serviceId') serviceId: string, @Res() Response) {
        try {
            const getserviceById = await this.saloonServices.findOne(serviceId);
            return Response.status(HttpStatus.OK).json({
                status: true,
                message: "Fetched service by ID successfully",
                data: getserviceById
            });
        } catch (error) {
            return Response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error in fetching service by id",
                error: error.message
            });

        }
    }

    @Delete(':serviceId')
    async deleteServiceById(@Param('serviceId') serviceId: string, @Res() Response) {
        try{
        const deleteServiceById = await this.saloonServices.deleteService(serviceId);
        return Response.status(HttpStatus.OK).json({
            status: true,
            message: "Service deleted successfully",
            data: {}
        })

    }catch (error) {
        return Response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: "Error in deleting service by id",
            error: error.message
        });

    }
}

    @Put(':serviceId')
    async putStateById(@Param('serviceId') serviceId: string, @Body() updateService: Services, @Res() Response) {
        try {
            const putServiceId = await this.saloonServices.update(serviceId, updateService);
            return Response.status(HttpStatus.OK).json({
                status: true,
                message: "service updated successfully",
                data: putServiceId
            });
        } catch (error) {
            return Response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error in updating service",
                error: error.message
            });

        }
    } 
    @Get('/saloonID:saloonID')
    async findServicesBySaloon(@Param('saloonID') saloonID: string, @Res() response): Promise<any> {
        try {
            const findServicesById = await this.saloonServices.getServicesBySaloon(saloonID)
            return response.status(HttpStatus.OK).json({
                status: true,
                message: 'succesfully get services by saloon id',
                data: findServicesById,
            })

        }
        catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error in finding services by salooon id",
                error: error.message
            }); 

        }
    }

}

