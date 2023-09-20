import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { User } from "src/schemas/user.schema";
import { UsersService } from "src/user/services/users.service";
import * as bcrypt from "bcrypt";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Post('/register')
    async createUser(@Res() response, @Body() user: User) {
        try{
        if (user.password !== user.confirmpassword) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                status: false,
                message: "Password Mismatch",
            })
        }
        delete user.confirmpassword;
        const hashedPassword = await bcrypt.hash(user.password, 10);

        user.email = user.email.toLowerCase();
        user.password = hashedPassword;
        const createUser = await this.usersService.createUser(user);
        return response.status(HttpStatus.CREATED).json({
            status: true,
            message: "User registered successfully",
            data: createUser
        })

    }catch(error){
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: "Error in creating user",
            error: error.message
        });

    }
}

    @Get('/getAll')
    async findAllUsers(@Res() response): Promise<any> {
        try {
            const findAllUsers = await this.usersService.findAll();
            return response.status(HttpStatus.CREATED).json({
                status: true,
                message: "List of all users ",
                data: findAllUsers
            })
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error in getting all the  cities",
                error: error.message
            });

        }
    }


    @Delete('/delete/:userId')
    async deleteUserById(@Param('userId') userId: string, @Res() Response) {
        try {
            const deleteUserById = await this.usersService.deleteUser(userId);
            return Response.status(HttpStatus.CREATED).json({
                status: true,
                message: "User deleted successfully",
                data: {}
            })

        } catch (error) {
            return Response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error in deleting user",
                error: error.message
            });

        }
    }
    @Get('/userID/:userId')
    async userById(@Param('userId') userId: string, @Res() Response) {
        try {
            const getUserById = await this.usersService.findOne(userId);
            return Response.status(HttpStatus.OK).json({
                status: true,
                message: "Fetched user by ID successfully",
                data: getUserById
            });
        } catch (error) {
            return Response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error in fetching user by id",
                error: error.message
            });

        }
    }

    @Put(':userId')
    async putUserById(@Param('userId') userId: string, @Body() updateUser: User, @Res() Response) {
        try {
            const putUserId = await this.usersService.update(userId, updateUser);
            return Response.status(HttpStatus.OK).json({
                status: true,
                message: "User updated successfully",
                data: putUserId
            });
        } catch (error) {
            return Response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error in updating user",
                error: error.message
            });
}
}
}
