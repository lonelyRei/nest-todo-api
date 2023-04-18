import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { repository_names } from '../db/database.types'
import { Users } from './users.model'
import { UserCreateDto } from './dto/user-create.dto'
import { UserChangeFullNameDto } from './dto/user-change-full-name.dto'

@Injectable()
export class UsersService {
    constructor(@Inject(repository_names.users_repository) private usersRepo: typeof Users) {}

    async createUser(dto: UserCreateDto) {
        return await this.usersRepo.create(dto)
    }

    async getUserByEmail(email: string) {
        return await this.usersRepo.findOne({ where: { email } })
    }

    async getAll() {
        return await this.usersRepo.findAll()
    }

    async changeUserFullName(dto: UserChangeFullNameDto) {
        if (dto.fullName.length < 4) {
            throw new HttpException('Некорректная длинна имени пользователя', HttpStatus.BAD_REQUEST)
        }

        const user = await this.usersRepo.findByPk(dto.userId)

        console.log(user)

        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }

        user.fullName = dto.fullName
        await user.save()
        return user
    }
}
