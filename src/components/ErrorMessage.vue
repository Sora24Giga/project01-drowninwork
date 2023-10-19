<script lang="ts">
import {defineComponent} from 'vue'


let UUID = 0
export default function UniqueID(){
  const getID = (): string => {
    UUID++
    return String(UUID)
  }
  return {
    getID
  }
}

</script>

<template>
<p aria-live="assertive" class="errorMessage" :id="id">
  <slot />
</p>
</template>

<style scoped>

</style>