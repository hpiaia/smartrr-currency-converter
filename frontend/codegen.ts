import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3001/graphql',
  documents: '**/*.graphql',
  generates: {
    'src/lib/gql/index.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-urql'],
      config: {
        scalars: { DateTime: 'string' },
      },
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
}

export default config
