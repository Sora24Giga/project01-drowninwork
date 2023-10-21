<template>
  <div
    class="w-full cursor-pointer p-[20px] m-0 text-se-white transition hover:scale-[1.01] hover:text-se-color-light"
  >
    <RouterLink
    class="text-left no-underline"
      :to="{ name: 'advisorDetail', params: { id: advisor?.id } }"
    >
      <div class="flex">
        <div class="lg:flex hidden w-[8%]">
          <div v-if="props.advisor?.images.length !== 0" class="pt-3 h-14">
            <img v-for="image in props.advisor?.images" :key="image" :src="image" alt="advisors image"
              class="w-14 hover:shadow-lg rounded-[50%]"
            >
          </div>
          <div v-else class="relative inline-flex items-center justify-center overflow-hidden rounded-full w-14 h-14 bg-se-color-light">
            <span class="text-xl font-semibold text-se-white">
              {{ advisor?.firstname.charAt(0).toLocaleUpperCase() }}{{ advisor?.surname.charAt(0).toLocaleUpperCase() }}
            </span>
          </div>
        </div>
        <span class="w-1/4 pt-0 lg:pt-4 lg:w-1/5">{{ props.advisor?.advisee.length }}</span>
        <span class="w-1/4 pt-0 lg:pt-4 lg:w-1/5">{{ props.advisor?.firstname }}</span>
        <span class="w-1/4 pt-0 lg:pt-4 lg:w-1/5">{{ props.advisor?.surname }}</span>
        <span class="w-1/4 pt-0 lg:pt-4 lg:w-1/5">{{ props.advisor?.department }}</span>
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
