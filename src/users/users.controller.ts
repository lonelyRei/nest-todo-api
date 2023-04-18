import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { UsersService } from './users.service'
import { UserChangeFullNameDto } from './dto/user-change-full-name.dto'

@Controller({ path: '/api/users' })
export class UsersController {
    constructor(private usersService: UsersService) {}
    @Get()
    @UseGuards(JwtAuthGuard)
    getAllUsers() {
        return this.usersService.getAll()
    }

    @Post('/change')
    @UseGuards(JwtAuthGuard)
    changeUserFullName(@Body() dto: UserChangeFullNameDto) {
        return this.usersService.changeUserFullName(dto)
    }
}
