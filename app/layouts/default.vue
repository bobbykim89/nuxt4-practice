<script setup lang="ts">
import { HeaderHorizontal } from '@bobbykim/manguito-theme'
import type { MenuItemType } from '@bobbykim/mcl-footer'
import { MclFooterA } from '@bobbykim/mcl-footer'

const router = useRouter()
const titleText: string = 'Royal <span class="text-primary">Pollo</span>'
const MenuItems: MenuItemType[] = [
  { title: 'Home', url: '/', target: '_self' },
  { title: 'Main', url: '/main', target: '_self' },
  { title: 'About', url: '/about', target: '_self' },
]
const currentYear = ref<number>()

const onFooterLogoClick = (e: Event, link: string) => {
  e.preventDefault()
  router.push({ path: link })
}
const onFooterMenuClick = (e: Event, menu: MenuItemType) => {
  e.preventDefault()
  router.push({ path: menu.url })
}

onMounted(() => {
  const currentDate = new Date()
  currentYear.value = currentDate.getFullYear()
})
</script>

<template>
  <div class="bg-light-2">
    <HeaderHorizontal bg-color="light-1">
      <template #content>
        <div>
          <NuxtLink to="/" class="flex gap-2 items-center">
            <NuxtImg src="/img/manguito-transparent-192.webp" width="40" />
            <h2 class="h2-md" v-html="titleText" />
          </NuxtLink>
        </div>
      </template>
      <template #content-right>
        <div class="flex items-center text-lg">
          <NuxtLink
            v-for="(link, idx) in MenuItems"
            :key="idx"
            :to="link.url"
            class="px-xs hover:opacity-60 transition-opacity duration-300 ease-linear"
            >{{ link.title }}</NuxtLink
          >
        </div>
      </template>
      <template #mobile-content="{ headerClose }">
        <div
          class="flex flex-col justify-center items-center text-lg py-xs gap-2"
        >
          <NuxtLink
            v-for="(link, idx) in MenuItems"
            :key="idx"
            :to="link.url"
            class="px-xs hover:opacity-60 transition-opacity duration-300 ease-linear"
            @click="headerClose"
            >{{ link.title }}</NuxtLink
          >
        </div>
      </template>
    </HeaderHorizontal>
    <div class="container min-h-[70dvh]">
      <slot />
    </div>
    <MclFooterA
      bg-color="dark-3"
      logo="/img/manguito-transparent-192.webp"
      :title="titleText"
      social-icon-color="primary"
      logo-link="/"
      :menu-items="MenuItems"
      :display-social-icons="false"
      @logo-click="onFooterLogoClick"
      @menu-click="onFooterMenuClick"
    >
      <span class="text-warning text-sm"
        >&copy; Royal Pollo {{ currentYear }}</span
      >
    </MclFooterA>
  </div>
</template>

<style scoped></style>
