<script setup lang="ts">
import { useRequestURL } from '#app'
import { useFormatDate, useGraphqlQuery } from '@/composables'
import type {
  Post,
  PostConnection,
} from '../../../server/resolvers/resolvers-types'

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

// const offsetRef = ref<number>(0)
const posts = ref<Post[]>([])
// const loading = ref<boolean>(false)
const hasMore = ref<boolean>(true)
const nextOffset = ref<number>(0)
const totalCount = ref<number>(0)
const error = ref<string | null>(null)
const loadingMore = ref<boolean>(false)

const GET_POSTS_QUERY = `#graphql
  query AllPost($pagination: PaginationInput) {
    allPost(sort:  {
      by: "date",
      order: DESC
    }, pagination: $pagination) {
      posts {
      _id
      content
      imageId
      date
      updatedAt
      }
      totalCount
      hasMore
      nextOffset
    }
  }
`

// const res = await useGraphqlQuery<AllPost>(
//   `#graphql
//   query AllPost($pagination: PaginationInput) {
//     allPost(sort:  {
//       by: "date",
//       order: DESC
//     }, pagination: $pagination) {
//       posts {
//       _id
//       content
//       imageId
//       date
//       updatedAt
//       }
//       totalCount
//       hasMore
//       nextOffset
//     }
//   }
// `,
//   {
//     pagination: {
//       limit: 30,
//       offset: offsetRef.value,
//     },
//   },
//   { key: 'all-posts' },
// )

const { data: initialData } = await useAsyncData('initial-posts', async () => {
  try {
    const paginationOption = { limit: 30, offset: 0 }
    const key = `posts-${JSON.stringify(paginationOption)}`
    const res = await useGraphqlQuery<{ allPost: PostConnection }>(
      GET_POSTS_QUERY,
      { pagination: paginationOption },
      { key, server: true },
    )
    return res
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
    return null
  }
})

watch(
  initialData,
  (data) => {
    if (data?.allPost) {
      posts.value = data.allPost.posts
      hasMore.value = data.allPost.hasMore
      nextOffset.value = data.allPost.nextOffset!
      totalCount.value = data.allPost.totalCount
      error.value = null
    }
  },
  { immediate: true },
)

// const loadPosts = async (loadMore: boolean = false) => {
//   loading.value = true
//   try {
//     console.log('before fetch', nextOffset.value)
//     const res = await useGraphqlQuery<AllPost>(
//       `#graphql
//       query AllPost($pagination: PaginationInput) {
//         allPost(sort:  {
//           by: "date",
//           order: DESC
//         }, pagination: $pagination) {
//           posts {
//           _id
//           content
//           imageId
//           date
//           updatedAt
//           }
//           totalCount
//           hasMore
//           nextOffset
//         }
//       }
//     `,
//       {
//         pagination: {
//           limit: 30,
//           offset: loadMore ? nextOffset.value : 0,
//         },
//       },
//       { key: 'all-posts' },
//     )
//     const loadedPosts = res?.allPost.posts
//     if (!loadedPosts) throw new Error('Failed to load post')
//     if (loadMore) {
//       posts.value = [...posts.value, ...loadedPosts]
//     } else {
//       posts.value = loadedPosts
//     }
//     hasMore.value = res.allPost.hasMore
//     nextOffset.value = res.allPost.nextOffset!
//     totalCount.value = res.allPost.totalCount
//     console.log(res.allPost.nextOffset, nextOffset.value)
//   } catch (error) {
//     console.error('Error loading posts:', error)
//   } finally {
//     loading.value = false
//   }
// }
const loadMorePosts = async () => {
  if (!hasMore.value || loadingMore.value) return
  try {
    const paginationOption = { limit: 30, offset: nextOffset.value }
    const key = `posts-${JSON.stringify(paginationOption)}`
    const res = await useGraphqlQuery<{ allPost: PostConnection }>(
      GET_POSTS_QUERY,
      { pagination: paginationOption },
      { key, server: true },
    )
    if (res?.allPost) {
      // Append new posts to existing ones
      posts.value = [...posts.value, ...res.allPost.posts]
      hasMore.value = res.allPost.hasMore
      nextOffset.value = res.allPost.nextOffset || 0
      totalCount.value = res.allPost.totalCount
    }
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : 'Failed to load more posts'
    console.error('Error loading more posts:', err)
  } finally {
    loadingMore.value = false
  }
}

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
        v-for="post in posts"
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
    <button
      v-if="hasMore"
      class="btn btn-primary btn-full mt-3xs btn-no-ring"
      @click="loadMorePosts"
    >
      Load more
    </button>
  </div>
</template>

<style scoped>
:root {
  --filter-color: #ec489a;
}
</style>
