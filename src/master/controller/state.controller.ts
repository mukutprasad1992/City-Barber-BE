import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { StateService } from "../services/state.service";
import { State } from "../schemas/state.schema";

@Controller('state')
export class StateController{

    constructor(private readonly stateService: StateService) { }


    @Post('/create')
    async createState(@Res() response, @Body() state: State) {
        
        const createState = await this.stateService.createState(state);
        //console.log(createUser)
        return response.status(HttpStatus.CREATED).json({
            status: true,
            message: "State entered successfully",
            data: createState
        })
    }

    @Get('/getAll')
    async getAllState(@Res() response){
     const   getAllState = await this.stateService.getAllState();
     return response.status(HttpStatus.CREATED).json({
        status: true,
        message: "List of all state ",
        data: getAllState
    })
    }

    @Get('/stateID:stateID')
    async stateById(@Param('stateID') stateID: string, @Res() Response) {
        try {
            const stateById = await this.stateService.findOne(stateID);
            return Response.status(HttpStatus.OK).json({
                status: true,
                message: "Fetched state by ID successfully",
                data: stateById
            });
        } catch (error) {
            return Response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error in fetching state by id",
                error: error.message
            });

        }
    }

    @Delete(':stateId')
    async deleteStateById(@Param('stateId') stateId: string, @Res() Response) {
        const deleteStateById =await this.stateService.deleteState(stateId);
        return Response.status(HttpStatus.CREATED).json({
            status: true,
            message: "State deleted successfully",
            data: {}
        })
        
    }

    @Put(':stateId')
    async putStateById(@Param('stateId') stateId: string, @Body() updateState: State, @Res() Response) {
        const putStateId = await this.stateService.update(stateId, updateState);
        return Response.status(HttpStatus.OK).json({
            status: true,
            message: "State updated successfully",
            data: putStateId
        });
    }

}

