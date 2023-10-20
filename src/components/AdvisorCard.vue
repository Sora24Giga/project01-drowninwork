<template>
  <div
    class="w-full cursor-pointer p-[20px] m-0 text-se-white transition hover:scale-[1.01] hover:text-se-color-light"
  >
    <RouterLink
    class="text-left no-underline"
      :to="{ name: 'advisorDetail', params: { id: advisor?.id } }"
    >
      <div class="flex">
        <span class="w-1/4">{{ props.advisor?.advisee.length }}</span>
        <span class="w-1/4">{{ props.advisor?.firstname }}</span>
        <span class="w-1/4">{{ props.advisor?.surname }}</span>
        <span class="w-1/4">{{ props.advisor?.department }}</span>
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import type { AdvisorDetail } from '@/type'
import { type PropType } from 'vue'
const props = defineProps({
  advisor: {
    type: Object as PropType<AdvisorDetail>,
    require: true
  }
})

</script>
