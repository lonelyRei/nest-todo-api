import { forwardRef, Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { usersProviders } from './users.providers'
import { DatabaseModule } from '../db/database.module'
import { UsersController } from './users.controller'
import { AuthModule } from '../auth/auth.module'

@Module({
    controllers: [UsersController],
    providers: [UsersService, ...usersProviders],
    imports: [DatabaseModule, forwardRef(() => AuthModule)],
    exports: [UsersService],
})
export class UsersModule {}
