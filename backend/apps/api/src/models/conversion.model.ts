import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Rate } from './rate.model'

@ObjectType()
export class Conversion {
  @Field(() => Int)
  id: number

  @Field()
  from: string

  @Field()
  to: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field(() => [Rate])
  rates: Rate[]
}
