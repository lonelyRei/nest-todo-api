import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as process from 'process'

const start = async () => {
    try {
        const server = await NestFactory.create(AppModule)
        const port = process.env.PORT || 5000
        await server.listen(port, () => console.log(`the server started on port: ${port}`))
    } catch (e) {
        console.log('the server failure with error:', e)
    }
}

start()
