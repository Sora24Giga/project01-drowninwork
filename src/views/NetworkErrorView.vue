<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="network-error mt-[200px] text-center text-se-white lg:mx-0 lg:ml-[20%]">
    <h1 class="mb-8 text-8xl font-bold lg:text-9xl">Uh-oh!</h1>
    <div class="mx-4">
      <h3>
        It look like you're experiencing some network issues, please take a breath and
        <a
          href="#"
          @click="router.go(-1)"
          class="text-se-color-light hover:text-se-color hover:underline hover:underline-offset-8"
          >click here</a
        >
        to try again.
      </h3>
      <p>Sorry, we can't get the data from the server.</p>
      <p>Please try again later.</p>
    </div>
  </div>
</template>
