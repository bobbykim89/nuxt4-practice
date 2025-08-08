<script setup lang="ts">
import { useFormatDate, useGraphqlQuery } from '@/composables'
import type { Post } from '../../../server/resolvers/resolvers-types'

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

const formatLinkUrl = (id: string) => {
  return '/post/' + id
}
const formatImgUrl = (id: string) => {
  return '/f_auto,q_auto/c_scale,w_480/' + id
}
</script>

<template>
  <div class="w-full lg:max-w-[60%] mx-auto py-sm px-2xs lg:py-md lg:px-xs">
    <div class="grid grid-cols-3 gap-2">
      <NuxtLink
        v-for="post in res?.allPost"
        :key="post._id"
        class="relative overflow-hidden group"
        :to="formatLinkUrl(post._id)"
      >
        <NuxtImg
          provider="cloudinary"
          :src="formatImgUrl(post.imageId)"
          class="relative aspect-square w-full object-cover object-center"
        />
        <div
          class="absolute inset-0 bg-warning bg-opacity-0 group-hover:opacity-100 group-hover:bg-opacity-50 transition-colors duration-300 flex justify-end items-end p-xs ease-linear"
        >
          <span
            class="group-hover:opacity-100 opacity-0 transition-opacity duration-300 ease-linear text-light-3 text-sm"
          >
            {{ useFormatDate(post.date) }}
          </span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
:root {
  --filter-color: #ec489a;
}
</style>
