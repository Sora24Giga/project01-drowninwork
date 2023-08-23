<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div
    class="fixed left-0 right-0 top-0 z-10 mb-[20px] h-fit w-full justify-between bg-se-color text-center lg:block lg:h-full lg:w-[20%] lg:px-0 lg:py-[20px]"
  >
    <p class="text-light pb-2 pt-4 text-xl font-semibold text-se-white lg:pt-0 lg:text-4xl">
      ADMIN
    </p>
    <nav
      class="flex h-fit justify-evenly bg-transparent text-center text-base font-[500] text-se-light-gray lg:mt-16 lg:inline-block lg:w-full lg:text-left lg:text-lg"
    >
      <RouterLink
        :to="{ name: 'studentList' }"
        class="flex w-full justify-center p-4 underline-offset-8 transition ease-in-out hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
        active-class="underline text-se-white lg:bg-se-color-light lg:no-underline"
      >
        <span>Students</span>
        <span class="hidden lg:flex">></span>
      </RouterLink>
      <RouterLink
        :to="{ name: 'advisorList' }"
        class="flex w-full justify-center p-4 underline-offset-8 transition ease-in-out hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
        active-class="underline text-se-white lg:bg-se-color-light lg:no-underline"
      >
        <span>Advisors</span>
        <span class="hidden lg:flex">></span>
      </RouterLink>
      <!-- <RouterLink
        :to="{ name: 'studentDetail' }"
        class="flex justify-center w-full p-4 transition ease-in-out underline-offset-8 hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
        active-class="underline text-se-white lg:bg-se-color-light lg:no-underline"
      >
        <span>Form</span>
        <span class="hidden lg:flex">></span>
      </RouterLink> -->
    </nav>
  </div>

  <div class="z-0">
    <RouterView />
  </div>
</template>

<style scoped></style>
