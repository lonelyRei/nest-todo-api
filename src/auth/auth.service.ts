import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserCreateDto } from '../users/dto/user-create.dto'
import { UserLoginDto } from '../users/dto/user-login.dto'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { Users } from '../users/users.model'

@Injectable({})
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async signUp(dto: UserCreateDto) {
        const candidate = await this.usersService.getUserByEmail(dto.email)

        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        }

        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(dto.password, 5)

        // Создаем пользователя в бд
        const user = await this.usersService.createUser({ ...dto, password: hashedPassword })

        // Генерируем токен и возвращаем дату
        const token = this.generateToken(user)
        return this.makeReturnData(token, user)
    }

    async signIn(dto: UserLoginDto) {
        const user = await this.validateUser(dto)
        const token = this.generateToken(user)
        return this.makeReturnData(token, user)
    }

    // Метод для генерации токена
    private generateToken(user: Users) {
        // Создаем наполнение для токена
        const payload = { email: user.email, id: user.id }

        // Возвращаем сгенерированный токен
        return this.jwtService.sign(payload)
    }

    private async validateUser(dto: UserLoginDto) {
        // Проверяем существование пользователя
        const user = await this.usersService.getUserByEmail(dto.email)
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }

        // Проверяем совпадение паролей
        if (!(await bcrypt.compare(dto.password, user.password))) {
            throw new HttpException('Пароли не совпадают', HttpStatus.UNAUTHORIZED)
        }

        return user
    }

    private makeReturnData(token: string, user: Users) {
        return {
            token: token,
            user: {
                email: user.email,
                id: user.id
            }
        }
    }
}
