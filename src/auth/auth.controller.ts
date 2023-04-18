import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserCreateDto } from '../users/dto/user-create.dto'
import { UserLoginDto } from '../users/dto/user-login.dto'

@Controller({ path: '/auth' })
export class AuthController {
    constructor(private authService: AuthService) {}

    // Регистрация
    @Post('/sign-up')
    signUp(@Body() dto: UserCreateDto) {
        return this.authService.signUp(dto)
    }

    // Авторизация
    @Post('/sign-in')
    signIn(@Body() dto: UserLoginDto) {
        return this.authService.signIn(dto)
    }
}
