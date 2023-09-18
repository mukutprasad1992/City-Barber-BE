import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { User } from "src/schemas/user.schema";
import { UsersService } from "src/user/services/users.service";
import { bcrypt } from "bcrypt";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    // @Post('/register')
    // async createUser(@Res() response, @Body() user: User) {
    //     if (user.password !== user.confirmpassword) {
    //         return response.status(HttpStatus.BAD_REQUEST).json({
    //             status: false,
    //             message: "Password Mismatch",
    //         })
    //     }
    //     delete user.confirmpassword;
    //     const hashedPassword = await bcrypt.hash(user.password, 10);

    //     user.email = user.email.toLowerCase();
    //     user.password = hashedPassword;
    //     const createUser = await this.usersService.createUser(user);
    //     return response.status(HttpStatus.CREATED).json({
    //         status: true,
    //         message: "User registered successfully",
    //         data: createUser
    //     })
    // }

    @Post('/register')
    async createUser(@Res() response, @Body() user: User) {
        try {
            if (user.password !== user.confirmpassword) {
                return response.status(HttpStatus.BAD_REQUEST).json({
                    status: false,
                    message: "Password Mismatch",
                });
            }

            delete user.confirmpassword;
            user.email = user.email.toLowerCase();
            const hashedPassword = await bcrypt.hash(user.password, process.env.BCRYPT_SALT_ROUNDS || 10);
            user.password = hashedPassword;

            const createUser = await this.usersService.createUser(user);

            return response.status(HttpStatus.CREATED).json({
                status: true,
                message: "User registered successfully",
                data: createUser
            });
        } catch (error) {
            console.error("Error creating user:", error);
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Internal Server Error",
            });
        }
    }
}


