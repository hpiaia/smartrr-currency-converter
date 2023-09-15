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
  createdAt: string

  @Field()
  updatedAt: string

  @Field(() => [Rate])
  rates: Rate[]
}
