import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtAuthGuard implements CanActivate {
    private BEARER_TOKEN_TYPE = 'Bearer'

    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // Получаем объект запроса
        const request = context.switchToHttp().getRequest()

        try {
            // Забираем заголовок: Authorization
            const authHeader: string = request.headers.authorization

            // разбиваем по пробелам
            const data = authHeader.split(' ')

            // Получаем тип токена
            const tokenType = data[0]

            // Получаем сам токен
            const token = data[1]

            // Если токена нет или тип токена не bearer, то выкидываем исключение
            if (tokenType !== this.BEARER_TOKEN_TYPE || !token) {
                this.throwUnauthorizedException()
            }

            // Верифицируем токен и обновляем request
            request.user = this.jwtService.verify(token)

            // Возвращаем true
            return true
        } catch {
            this.throwUnauthorizedException()
        }
    }

    // Метод для генерации ошибки неавторизованного пользователя
    private throwUnauthorizedException() {
        throw new HttpException('Пользователь не авторизован', HttpStatus.UNAUTHORIZED)
    }
}
