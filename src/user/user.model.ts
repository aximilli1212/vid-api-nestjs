import { Field, ObjectType } from '@nestjs/graphql'
import { Company } from '../company/company.model'
@ObjectType()
export class User {
    @Field()
    id?: number

    @Field()
    email?: string

    @Field()
    name: string

    @Field({ nullable: true })
    status?: string

    @Field(() => [String], { nullable: true })
    phoneNumbers?: string[]

    @Field({ nullable: true })
    avatarImageUrl?: string

    @Field({ nullable: true })
    companyId?: string

    @Field(() => [String], { nullable: true })
    rights?: string[]

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date

    @Field(() => [Company], { nullable: true })
    companies?: Company[]

    @Field(() => Company, { nullable: true })
    activeCompany?: Company
}
