import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { Services } from "src/schemas/services.schema";
import { Staffs } from "src/schemas/staffs.schema";
import { StaffsService } from "../service/satffs.servic";

@Controller('staffs')
export class StaffsController {

    constructor(private readonly staffsService: StaffsService) { }


    @Post('/create')
    async createStaffs(@Res() response, @Body() staffs: Staffs) {
        const createStaffs = await this.staffsService.createStaffs(staffs);
        return response.status(HttpStatus.CREATED).json({
            status: true,
            message: "Staffs entered successfully",
            data: createStaffs
        })
    }

    @Get('/getAll')
    async getAllStaffs(@Res() response) {
        const getAllStaffs = await this.staffsService.getAllStaffs();
        return response.status(HttpStatus.CREATED).json({
            status: true,
            message: "List of all staffs ",
            data: getAllStaffs
        })
    }

    @Get('/staffsID:staffsID')
    async cityById(@Param('staffsID') staffsID: string, @Res() Response) {
        try {
            const getStaffsById = await this.staffsService.findOne(staffsID);
            return Response.status(HttpStatus.OK).json({
                status: true,
                message: "Fetched city by ID successfully",
                data: getStaffsById
            });
        } catch (error) {
            return Response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error in fetching staffs by id",
                error: error.message
            });

        }
    }

    @Delete(':staffsId')
    async deleteStaffsById(@Param('staffsId') staffsId: string, @Res() Response) {
        const deleteStaffsById = await this.staffsService.deleteStaffsById(staffsId);
        return Response.status(HttpStatus.CREATED).json({
            status: true,
            message: "Staffs deleted successfully",
            data: {}
        })

    }

    @Put(':staffsId')
    async putStaffsById(@Param('staffsId') staffsId: string, @Body() updateStaffs: Staffs, @Res() Response) {
        try {
            const putStaffsId = await this.staffsService.update(staffsId, updateStaffs);
            return Response.status(HttpStatus.OK).json({
                status: true,
                message: "staffs updated successfully",
                data: putStaffsId
            });
        } catch (error) {
            return Response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error in updating staffs",
                error: error.message
            });

        }
    }

    @Get('/saloonID:saloonID')
    async findStaffsBySaloon(@Param('saloonID') saloonID: string, @Res() response): Promise<any> {
        try {
            const findStaffsById = await this.staffsService.getStaffsBySaloon(saloonID)
            return response.status(HttpStatus.OK).json({
                status: true,
                message: 'succesfully get staffs by saloon id',
                data: findStaffsById,
            })

        }
        catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error in finding staffs by salooon id",
                error: error.message
            }); 

        }
    }

}

