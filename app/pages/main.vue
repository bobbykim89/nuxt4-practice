<script setup lang="ts">
import { useGraphqlQuery } from '@/composables'
import type { Post } from '../../server/resolvers/resolvers-types'
const res = await useGraphqlQuery<Post[]>(
  `#graphql
query AllPost {
  allPost(sort:  {
     by: "date",
     order: ASC,
     limit: 3
  }) {
    _id
    content
    imageId
    date
    updatedAt
  }
}
`,
  {},
  { key: 'all-posts' },
)
</script>

<template>
  <div>
    <div>Main page</div>
    <div>{{ res }}</div>
  </div>
</template>

<style scoped></style>
