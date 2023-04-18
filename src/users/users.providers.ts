import { Users } from './users.model'
import { repository_names } from '../db/database.types'

export const usersProviders = [
    {
        provide: repository_names.users_repository,
        useValue: Users,
    },
]
