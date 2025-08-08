<script setup lang="ts"></script>

<template>
  <div class="w-full lg:max-w-[60%] mx-auto py-sm px-2xs lg:py-md lg:px-xs">
    <div
      class="border border-light-4 rounded-md drop-shadow-md py-sm px-xs lg:py-md lg:px-sm bg-light-1"
    >
      <NuxtImg
        src="/img/manguito-regal-512.webp"
        class="rounded-full w-[80%] lg:w-[60%] mx-auto mb-sm drop-shadow-lg border border-light-4"
      />
      <div class="flex flex-col justify-center items-center">
        <h2 class="h2-md mb-sm">Welcome to 👑 Royal Pollo</h2>
        <div class="px-xs py-sm bg-light-3 rounded-md drop-shadow-md">
          <h3 class="h3-md mb-sm">A Regal Feed of Feathers & Fun</h3>
          <p class="mb-xs">
            Welcome to <strong>Royal Pollo</strong> – a photo blog dedicated to
            the charming antics of <strong>Manguito</strong>, the world's most
            adorable (and mischievous) peach-faced lovebird.
          </p>
          <p class="mb-xs">
            We’ve taken the delightful content from the
            <strong>Manguito Page</strong> and delivered it in a more
            mobile-friendly, scroll-happy layout – perfect for enjoying
            bite-sized birdie moments wherever you are.
          </p>
          <ul class="mcl-list mb-xs">
            <li>
              📸 Updated regularly with snapshots of cuteness, fluff, and
              royal-level mischief.
            </li>
            <li>
              📱 Optimized for mobile so you can enjoy the feathery chaos on the
              go.
            </li>
            <li>🧡 Made with love and millet.</li>
          </ul>
          <div class="flex justify-center">
            <NuxtLink to="/post" class="btn btn-primary btn-progress btn-round">
              <span>Go see Pollo!</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
