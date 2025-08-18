<script setup lang="ts">
import { useRequestURL } from '#app'
import type { PostWithNavigation } from '#shared/graphql/resolvers-types'
import { useFormatDate, useGraphqlQuery } from '@/composables'

const url = useRequestURL()
useHead({
  title: 'Post | Royal Pollo',
  meta: [
    { property: 'og:title', content: 'Post | Royal Pollo' },
    { property: 'og:url', content: url.href },
    { property: 'twitter:domain', content: url.host },
    { property: 'twitter:url', content: url.href },
    {
      name: 'twitter:title',
      content: 'Post | Royal Pollo',
    },
  ],
})

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
          alt="picture of manguito"
          class="w-full rounded-t-sm"
          placeholder="/img/post_placeholder.webp"
          placeholder-class="img-placeholder"
          width="484"
          height="645"
          fit="cover"
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
          <div class="text-dark-1 py-2xs flex items-center">
            <NuxtLink
              :to="formatPrevNextUrl(res?.post.previousPost?._id!)"
              class="hover:bg-light-3 rounded-l-md transition-colors duration-300 ease-linear"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                class="h-md aspect-square"
                fill="currentColor"
              >
                <!-- !Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                <path
                  d="M169.4 297.4C156.9 309.9 156.9 330.2 169.4 342.7L361.4 534.7C373.9 547.2 394.2 547.2 406.7 534.7C419.2 522.2 419.2 501.9 406.7 489.4L237.3 320L406.6 150.6C419.1 138.1 419.1 117.8 406.6 105.3C394.1 92.8 373.8 92.8 361.3 105.3L169.3 297.3z"
                />
              </svg>
            </NuxtLink>
            <NuxtLink
              :to="formatPrevNextUrl(res?.post.nextPost?._id!)"
              class="hover:bg-light-3 rounded-r-md transition-colors duration-300 ease-linear"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                fill="currentColor"
                class="h-md aspect-square"
              >
                <!-- !Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                <path
                  d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z"
                />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.img-placeholder {
  background-color: #e8e8e8;
}
</style>
