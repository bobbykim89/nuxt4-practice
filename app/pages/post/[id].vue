<script setup lang="ts">
import { useFormatDate, useGraphqlQuery } from '@/composables'
import type { Post } from '../../../server/resolvers/resolvers-types'

type PostType = {
  post: Post
}

const route = useRoute()
const router = useRouter()

const res = await useGraphqlQuery<PostType>(
  `#graphql
  query Post($postId: ID!) {
    post(id: $postId) {
      _id
      content
      imageId
      date
    }
  }
`,
  {
    postId: route.params.id as string,
  },
  { key: 'single-post' },
)

const formatImgUrl = (id: string) => {
  return '/f_auto,q_auto,w_484,h_645,c_fill/' + id
}
const onClickOutside = () => {
  router.push({ path: '/post' })
  console.log('click outside')
}
</script>

<template>
  <div @click="onClickOutside">
    <div class="w-full lg:max-w-[40%] mx-auto py-sm px-2xs lg:py-md lg:px-xs">
      <div
        class="p-sm bg-light-1 rounded-sm border border-light-3 drop-shadow-md"
        @click.stop
      >
        <NuxtImg
          provider="cloudinary"
          :src="formatImgUrl(res?.post.imageId!)"
          class="w-full rounded-t-sm"
        />
        <div class="px-3xs">
          <div class="py-2xs border-b-2 border-dark-1/50">
            <p>{{ res?.post.content }}</p>
          </div>
          <div class="py-2xs border-b-2 border-dark-1/50">
            <p class="text-end text-sm text-dark-1">
              {{ useFormatDate(res?.post.date!) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
