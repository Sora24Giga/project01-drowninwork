<script setup lang="ts">
defineProps({
  resource: {
    type: String,
    required: true,
    default: 'page'
  }
})
</script>

<template>
  <div class="mt-[200px] text-center text-se-white lg:ml-[20%]">
    <h1 class="mb-8 text-8xl font-bold lg:text-9xl">Oops!</h1>
    <h3>The {{ resource }} you're looking for is not here.</h3>
    <RouterLink
      :to="{ name: 'studentList' }"
      class="text-se-color-light hover:text-se-white hover:underline hover:underline-offset-8"
      >Back to home page</RouterLink
    >
  </div>
</template>
