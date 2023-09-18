import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res } from "@nestjs/common";
import { City } from "../schemas/city.schema";
import { CityService } from "../services/city.service"

@Controller('city')
export class CityController {

    constructor(private readonly cityService: CityService) { }

 
    @Post('/create')
    async createCity(@Res() response, @Body() city: City) {
        try {
            const createCity = await this.cityService.createCity(city);
            //console.log(createUser)
            return response.status(HttpStatus.CREATED).json({
                status: true,
                message: "State entered successfully",
                data: createCity
            })
        }
        catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error creating state",
                error: error.message
            });

        }
    }
    @Get('/stateID:stateId')
    async findCitiesByState(@Param('stateId') stateId: string, @Res() response): Promise<any> {
        try {
            const findCityById = await this.cityService.getCityByState(stateId)
            return response.status(HttpStatus.OK).json({
                status: true,
                message: 'succesfully get cities by state id',
                data: findCityById,
            })

        }
        catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error in finding cities by state id",
                error: error.message
            });

        }
    }


    @Get('/cityID:cityId')
    async cityById(@Param('cityId') cityId: string, @Res() Response) {
        try {
            const getCityById = await this.cityService.findOne(cityId);
            return Response.status(HttpStatus.OK).json({
                status: true,
                message: "Fetched city by ID successfully",
                data: getCityById
            });
        } catch (error) {
            return Response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error in fetching cities by id",
                error: error.message
            });

        }
    }


    @Get("/getAll")
    async getCities(@Res() response): Promise<any> {
        try {
            const getCities = await this.cityService.getCities();
            return response.status(HttpStatus.CREATED).json({
                status: true,
                message: "List of all Cities ",
                data: getCities
            })
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error in getting all the  cities",
                error: error.message
            });

        }
    }


    @Delete('delete:cityId')
    async deleteCityById(@Param('cityId') cityId: string, @Res() Response) {
        try {
            const deleteCityById = await this.cityService.deleteCity(cityId);
            return Response.status(HttpStatus.CREATED).json({
                status: true,
                message: "City deleted successfully",
                data: {}
            })

        } catch (error) {
            return Response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error in deleting city",
                error: error.message
            });

        }
    }

    @Put(':cityId')
    async putStateById(@Param('cityId') cityId: string, @Body() updateCity: City, @Res() Response) {
        try {
            const putCityId = await this.cityService.update(cityId, updateCity);
            return Response.status(HttpStatus.OK).json({
                status: true,
                message: "City updated successfully",
                data: putCityId
            });
        } catch (error) {
            return Response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error in updating city",
                error: error.message
            });

        }
    }
}