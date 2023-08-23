<template>
  <div
    class="m-0 w-[90%] text-se-light-gray transition hover:scale-[1.01] hover:text-se-color-light"
  >
    <RouterLink
      class="w-full text-left no-underline"
      :to="{ name: 'advisorDetail', params: { id: advisor?.id } }"
    >
      <div class="cursor-pointer p-[20px]">
        <span class="font-bold">
          {{ props.advisor?.first_name }} {{ props.advisor?.last_name }}</span
        >
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import type { AdvisorDetail } from '@/type'
import type { PropType } from 'vue'
const props = defineProps({
  advisor: {
    type: Object as PropType<AdvisorDetail>,
    require: true
  }
})

// const passenger = ref<Passengers[]>([])
</script>
