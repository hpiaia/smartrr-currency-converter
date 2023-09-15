import { Field, Float, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Rate {
  @Field(() => Int)
  id: number

  @Field(() => Int)
  conversionId: number

  @Field(() => Float)
  amount: number

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}