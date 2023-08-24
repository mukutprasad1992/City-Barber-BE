import {
    Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res,
    UploadedFiles,
    UseInterceptors,
} from "@nestjs/common";
import { SaloonService } from "../services/saloon.service";
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Saloon } from "src/schemas/saloon.schema";
import { FileUploadService } from "utils/file-upload/file-upload.service"


@Controller('saloon')
export class SaloonController {
    constructor(private readonly saloonService: SaloonService, private readonly fileUploadService: FileUploadService) { }

    @Post('/uploadDocuments')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'documents', maxCount: 10 }]))
    async uploadFile(@Res() response, @UploadedFiles() documents: Array<Express.Multer.File>) {
        const getFileUploadContent = await this.fileUploadService.uploadFile(documents);
        console.info("getFileUploadContent", getFileUploadContent)
        return response.status(HttpStatus.CREATED).json({
            status: true,
            message: "File uploaded successfully",
            data: getFileUploadContent
        })
    }

    @Post('/register')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'documents', maxCount: 10 }]))
    async createUser(@Res() response, @Body() user: Saloon, @UploadedFiles() documents: Array<Express.Multer.File>) {
        try {
            const getFileUploadContent = await this.fileUploadService.uploadFile(documents);
            user.documents = getFileUploadContent
            user.email = user.email.toLowerCase();
            const createUser = await this.saloonService.createUser(user);
            return response.status(HttpStatus.CREATED).json({
                status: true,
                message: "User registered successfully",
                data: createUser
            })
        }
        catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error creating user",
                error: error.message
            });

        }
    }
    @Get('/getUser')
    async getUser(@Res() response) {
        try {
            const AllUsers = await this.saloonService.getAllUser();
            return response.status(HttpStatus.CREATED).json({
                status: true,
                message: "Fetch all Users successfully",
                data: AllUsers
            })

        }
        catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error creating user",
                error: error.message
            });

        }


    }
    @Get('/getUserByEmail')
    async getUserById(@Res() response, @Body() user: Saloon) {
        try {
            const User = await this.saloonService.getUserByEmail(user);
            console.info('User:', User)
            return response.status(HttpStatus.CREATED).json({
                status: true,
                message: "Fetch all Users successfully",
                data: User
            })

        }
        catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error creating user",
                error: error.message
            });

        }


    }
    @Delete('/deleteUserByEmail')
    async deleteUser(@Res() response, @Body() user: Saloon) {
        try {

            const deletedUser = await this.saloonService.deleteUser(user._id);
            if (!deletedUser) {
                return await response.status(HttpStatus.NOT_FOUND).json({
                    status: false,
                    message: "User not found",
                    data: null
                });
            }

            return response.status(HttpStatus.OK).json({
                status: true,
                message: "User deleted successfully",
                data: deletedUser
            });
        } catch (error) {
            return await response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error deleting user",
                error: error.message
            });

        }
    }
}
