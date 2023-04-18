import { Column, Model, Table } from 'sequelize-typescript'

interface userCreationAttrs {
    email: string
    password: string
}

@Table({ tableName: 'users' })
export class Users extends Model<Users, userCreationAttrs> {
    @Column({ allowNull: false, primaryKey: true, autoIncrement: true, unique: true })
    id: number

    @Column({ allowNull: false, unique: true })
    email: string

    @Column({ allowNull: false })
    password: string

    @Column({ allowNull: true, defaultValue: 'user' })
    fullName: string
}
