<script setup lang="ts">
import { useGraphqlQuery } from '@/composables'
import type { Post } from '../../server/resolvers/resolvers-types'

type AllPost = {
  allPost: Post[]
}

const res = await useGraphqlQuery<AllPost>(
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

const formatImgUrl = (id: string) => {
  return '/f_auto,q_auto/c_scale,w_480/' + id
}
</script>

<template>
  <div>
    <div>Main page</div>
    <div class="grid grid-cols-3 gap-2">
      <div v-for="post in res?.allPost" :key="post._id">
        <NuxtImg
          provider="cloudinary"
          :src="formatImgUrl(post.imageId)"
          class="aspect-square object-cover object-center"
        />
        <p>{{ post.imageId }}</p>
        <p>{{ post.content }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
