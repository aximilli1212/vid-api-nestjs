import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { GraphQLErrorFilter } from './filters/custom-exception.filter';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: '*',
        credentials: true,
        // all headers that client are allowed to use
        allowedHeaders: [
            'Accept',
            'Authorization',
            'Content-Type',
            'X-Requested-With',
            'apollo-require-preflight',
        ],
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    });
    app.use(cookieParser());
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            exceptionFactory: (errors) => {
                const formattedErrors = errors.reduce((accumulator, error) => {
                    accumulator[error.property] = Object.values(error.constraints).join(
                        ', ',
                    );
                    return accumulator;
                }, {});
                console.log('formattedErrors123', formattedErrors);
                // return formatted errors being an object with properties mapping to errors
                throw new BadRequestException(formattedErrors);
            },
        }),
    );
    app.useGlobalFilters(new GraphQLErrorFilter());
    await app.listen(3001);
}
bootstrap();
