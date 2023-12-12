import { Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class UserResolver {
    @Query(() => String)
    sayHello(): string {
        return 'Hi am the new bridge api for the frontend'
    }
}
