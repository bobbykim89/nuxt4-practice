import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './server/schema.graphql',
  generates: {
    './server/resolvers/resolvers-types.ts': {
      config: {},
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
}

export default config
