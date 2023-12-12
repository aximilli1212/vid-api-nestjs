import { Field, ObjectType, Int } from '@nestjs/graphql'
import { User } from '../user/user.model'

@ObjectType()
export class Company {
    @Field()
    id: number

    @Field()
    address: string

    @Field()
    city: string

    @Field()
    country: string

    @Field()
    name: string

    @Field({ nullable: true })
    latitude?: number

    @Field({ nullable: true })
    longitude?: number

    @Field({ nullable: true })
    detailContent?: string

    @Field({ nullable: true })
    foundingYear?: string

    @Field({ nullable: true })
    geohash?: string

    @Field({ nullable: true })
    geopointLat?: number

    @Field({ nullable: true })
    geopointLong?: number

    @Field({ nullable: true })
    headerImageUrl?: string

    @Field({ nullable: true })
    logoImageUrl?: string

    @Field(() => Int, { nullable: true })
    totalEmployees?: number

    @Field({ nullable: true })
    dynamicLink?: string

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date

    @Field(() => [User])
    users: User[]

    @Field(() => User, { nullable: true })
    activeUser?: User
}
