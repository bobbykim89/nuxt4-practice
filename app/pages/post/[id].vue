<script setup lang="ts">
import { useFormatDate, useGraphqlQuery } from '@/composables'
import type { PostWithNavigation } from '../../../server/resolvers/resolvers-types'

type PostType = {
  post: PostWithNavigation
}

const route = useRoute()
const router = useRouter()

const GET_POST_WITH_NAVIGATION_QUERY = `#graphql
  query Post($postId: ID!) {
    post(id: $postId) {
      post {
        _id
        content
        imageId
        date
      }
      previousPost {
        _id
      }
      nextPost {
        _id
      }
    }
  }
`

const res = await useGraphqlQuery<PostType>(
  GET_POST_WITH_NAVIGATION_QUERY,
  {
    postId: route.params.id as string,
  },
  { key: `single-post-${route.params.id}` },
)

const formatImgUrl = (id: string) => {
  return '/f_auto,q_auto,w_484,h_645,c_fill/' + id
}
const onClickOutside = () => {
  router.push({ path: '/post' })
}
const formatPrevNextUrl = (id: string) => {
  return '/post/' + id
}

console.log(res)
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
          :src="formatImgUrl(res?.post.post?.imageId!)"
          class="w-full rounded-t-sm"
        />
        <div class="px-3xs">
          <div class="py-2xs border-b-2 border-dark-1/50">
            <p>{{ res?.post.post?.content }}</p>
          </div>
          <div class="py-2xs border-b-2 border-dark-1/50">
            <p class="text-end text-sm text-dark-1">
              {{ useFormatDate(res?.post.post?.date!) }}
            </p>
          </div>
          <div>
            <NuxtLink
              :to="formatPrevNextUrl(res?.post.previousPost?._id!)"
              class="btn btn-secondary"
              >Previous {{ res?.post.previousPost?._id }}</NuxtLink
            >
            <NuxtLink
              :to="formatPrevNextUrl(res?.post.nextPost?._id!)"
              class="btn btn-warning"
              >Next {{ res?.post.nextPost?._id }}</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
