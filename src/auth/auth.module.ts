import { forwardRef, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    imports: [
        forwardRef(() => UsersModule),
        JwtModule.register({
            signOptions: {
                expiresIn: '24h',
            },
            secret: process.env.SECRET_KEY || 'random_key',
        }),
    ],
    exports: [JwtModule],
})
export class AuthModule {}
