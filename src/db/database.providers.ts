import { Sequelize } from 'sequelize-typescript'
import * as process from 'process'
import { sequelize_provide } from './database.types'
import { Users } from '../users/users.model'

export const databaseProviders = [
    {
        provide: sequelize_provide,
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: process.env.DATABASE_HOST,
                port: Number(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
            })
            sequelize.addModels([Users])
            await sequelize.sync()
            return sequelize
        },
    },
]
