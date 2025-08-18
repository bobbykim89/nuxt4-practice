import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './server/public/schema.graphql',
  generates: {
    './shared/graphql/resolvers-types.ts': {
      config: {},
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
}

export default config
