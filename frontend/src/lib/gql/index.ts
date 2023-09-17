import * as Urql from 'urql'
import gql from 'graphql-tag'

export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  DateTime: { input: string; output: string }
}

export type Conversion = {
  __typename?: 'Conversion'
  createdAt: Scalars['DateTime']['output']
  from: Scalars['String']['output']
  id: Scalars['Int']['output']
  latestRate?: Maybe<Rate>
  rates: Array<Rate>
  to: Scalars['String']['output']
  updatedAt: Scalars['DateTime']['output']
}

export type Mutation = {
  __typename?: 'Mutation'
  createConversion: Conversion
}

export type MutationCreateConversionArgs = {
  from: Scalars['String']['input']
  to: Scalars['String']['input']
}

export type Query = {
  __typename?: 'Query'
  conversion: Conversion
  conversions: Array<Conversion>
}

export type QueryConversionArgs = {
  id: Scalars['Int']['input']
}

export type Rate = {
  __typename?: 'Rate'
  amount: Scalars['Float']['output']
  conversionId: Scalars['Int']['output']
  date: Scalars['DateTime']['output']
  id: Scalars['Int']['output']
}

export type Subscription = {
  __typename?: 'Subscription'
  rateAdded: Rate
}

export type SubscriptionRateAddedArgs = {
  conversionId?: InputMaybe<Scalars['Int']['input']>
}

export type AllConversionsQueryVariables = Exact<{ [key: string]: never }>

export type AllConversionsQuery = {
  __typename?: 'Query'
  conversions: Array<{
    __typename?: 'Conversion'
    id: number
    from: string
    to: string
    latestRate?: { __typename?: 'Rate'; id: number; amount: number; date: string } | null
  }>
}

export type GetConversionQueryVariables = Exact<{
  id: Scalars['Int']['input']
}>

export type GetConversionQuery = {
  __typename?: 'Query'
  conversion: {
    __typename?: 'Conversion'
    id: number
    from: string
    to: string
    rates: Array<{ __typename?: 'Rate'; id: number; conversionId: number; amount: number; date: string }>
  }
}

export type RateAddedSubscriptionVariables = Exact<{
  conversionId?: InputMaybe<Scalars['Int']['input']>
}>

export type RateAddedSubscription = {
  __typename?: 'Subscription'
  rateAdded: { __typename?: 'Rate'; id: number; conversionId: number; amount: number; date: string }
}

export type CreateConversionMutationVariables = Exact<{
  from: Scalars['String']['input']
  to: Scalars['String']['input']
}>

export type CreateConversionMutation = {
  __typename?: 'Mutation'
  createConversion: { __typename?: 'Conversion'; id: number }
}

export const AllConversionsDocument = gql`
  query AllConversions {
    conversions {
      id
      from
      to
      latestRate {
        id
        amount
        date
      }
    }
  }
`

export function useAllConversionsQuery(options?: Omit<Urql.UseQueryArgs<AllConversionsQueryVariables>, 'query'>) {
  return Urql.useQuery<AllConversionsQuery, AllConversionsQueryVariables>({ query: AllConversionsDocument, ...options })
}
export const GetConversionDocument = gql`
  query GetConversion($id: Int!) {
    conversion(id: $id) {
      id
      from
      to
      rates {
        id
        conversionId
        amount
        date
      }
    }
  }
`

export function useGetConversionQuery(options: Omit<Urql.UseQueryArgs<GetConversionQueryVariables>, 'query'>) {
  return Urql.useQuery<GetConversionQuery, GetConversionQueryVariables>({ query: GetConversionDocument, ...options })
}
export const RateAddedDocument = gql`
  subscription RateAdded($conversionId: Int) {
    rateAdded(conversionId: $conversionId) {
      id
      conversionId
      amount
      date
    }
  }
`

export function useRateAddedSubscription<TData = RateAddedSubscription>(
  options: Omit<Urql.UseSubscriptionArgs<RateAddedSubscriptionVariables>, 'query'> = {},
  handler?: Urql.SubscriptionHandler<RateAddedSubscription, TData>,
) {
  return Urql.useSubscription<RateAddedSubscription, TData, RateAddedSubscriptionVariables>(
    { query: RateAddedDocument, ...options },
    handler,
  )
}
export const CreateConversionDocument = gql`
  mutation CreateConversion($from: String!, $to: String!) {
    createConversion(from: $from, to: $to) {
      id
    }
  }
`

export function useCreateConversionMutation() {
  return Urql.useMutation<CreateConversionMutation, CreateConversionMutationVariables>(CreateConversionDocument)
}
