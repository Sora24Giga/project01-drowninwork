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
  <div class="mt-[200px] text-center text-se-white lg:ml-[17%]">
    <h1 class="mb-8 font-bold text-8xl lg:text-9xl">Oops!</h1>
    <h3>The {{ resource }} you're looking for is not here.</h3>
    <RouterLink :to="{ name: 'studentList' }"
      class="text-se-color-light hover:text-se-color hover:underline hover:underline-offset-8">Back to home page
    </RouterLink>
  </div>
</template>
