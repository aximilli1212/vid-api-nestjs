import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { ConfigModule } from '@nestjs/config'
import { UserService } from './user/user.service'
import { UserResolver } from './user/user.resolver'
import { UserModule } from './user/user.module'
import { CompanyService } from './company/company.service'
import { CompanyModule } from './company/company.module'
import { PrismaService } from './prisma.service'

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
            playground: true,
            introspection: true,
            context: ({ req, res }) => ({ req, res }),
        }),
        ConfigModule.forRoot({}),
        UserModule,
        CompanyModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        UserService,
        UserResolver,
        CompanyService,
        PrismaService,
    ],
})
export class AppModule {}
