<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div
    class="fixed left-0 top-0 z-10 mb-[20px] h-fit w-full justify-between bg-se-color text-center lg:block lg:h-full lg:w-[20%] lg:px-0 lg:py-[20px]"
  >
    <p class="text-light mb-2 mt-4 text-xl font-semibold text-se-white lg:mt-0 lg:text-4xl">
      ADMIN
    </p>
    <nav
      class="flex h-fit justify-evenly bg-transparent text-center text-base font-[500] text-se-light-gray lg:mt-16 lg:inline-block lg:w-full lg:text-left lg:text-lg"
    >
      <RouterLink
        :to="{ name: 'studentList' }"
        class="flex w-full justify-center p-4 underline-offset-8 transition ease-in-out hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
        active-class="text-se-white lg:bg-se-color-light"
      >
        <span>Students</span>
        <span class="hidden lg:flex">></span>
      </RouterLink>
      <RouterLink
        :to="{ name: 'advisors' }"
        class="flex w-full justify-center p-4 underline-offset-8 transition ease-in-out hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
        active-class="text-se-white lg:bg-se-color-light"
      >
        <span>Advisors</span>
        <span class="hidden lg:flex">></span>
      </RouterLink>
      <RouterLink
        :to="{ name: 'studentDetail' }"
        class="flex w-full justify-center p-4 underline-offset-8 transition ease-in-out hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
        active-class="text-se-white lg:bg-se-color-light"
      >
        <span>Form</span>
        <span class="hidden lg:flex">></span>
      </RouterLink>
    </nav>
  </div>

  <div class="z-0 bg-se-dark">
    <RouterView />
  </div>
</template>

<style scoped>
.button {
  width: 90%;
  height: 40px;
  top: 50%;
  background-color: #ffffff;
  color: #1d56b1;
  border: none;
  border-radius: 9px;
  box-shadow: 1px 2px 5px rgb(27, 23, 155);
}
</style>
