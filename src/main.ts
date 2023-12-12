import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { BadRequestException, ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors({
        origin: '*', //TODO: change to frontend url
        credentials: true,
        allowedHeaders: [
            'Accept',
            'Authorization',
            'Content-Type',
            'X-Requested-With',
            'apollo-require-preflight',
        ],
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    })
    app.use(cookieParser())
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            exceptionFactory: (errors) => {
                const formattedErrors = errors.reduce((accumulator, error) => {
                    accumulator[error.property] = Object.values(
                        error.constraints
                    ).join(', ')
                    return accumulator
                }, {})
                console.log('formattedErrors123', formattedErrors)
                throw new BadRequestException(formattedErrors)
            },
        })
    )
    await app.listen(parseInt(process.env.PORT) || 8900)
}

bootstrap()
