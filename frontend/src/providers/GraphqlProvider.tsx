import { refocusExchange } from '@urql/exchange-refocus'
import { createClient as createWSClient } from 'graphql-ws'
import { Client, Provider, dedupExchange, fetchExchange, subscriptionExchange } from 'urql'

const API_URL = 'http://localhost:3001/graphql'

const wsClient = createWSClient({ url: API_URL.replace(/^http/, 'ws') })
const client = new Client({
  url: API_URL,
  exchanges: [
    dedupExchange,
    refocusExchange(),
    fetchExchange,
    subscriptionExchange({
      forwardSubscription(request) {
        const input = { ...request, query: request.query || '' }
        return {
          subscribe(sink) {
            const unsubscribe = wsClient.subscribe(input, sink)
            return { unsubscribe }
          },
        }
      },
    }),
  ],
})

export default function GraphqlProvider({ children }: { children: React.ReactNode }) {
  return <Provider value={client}>{children}</Provider>
}