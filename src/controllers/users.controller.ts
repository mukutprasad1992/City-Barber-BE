import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { User } from "src/schemas/user.schema";
import { UsersService } from "src/services/users.service";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Post()
    async createBook(@Res() response, @Body() user: User) {
        const createUser = await this.usersService.createUser(user);
        return response.status(HttpStatus.CREATED).json({
            status: true,
            message: "User registered successfully",
            data: createUser
        })
    }
}
