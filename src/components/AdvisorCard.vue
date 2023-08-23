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
        ><!--?는 체인 오퍼레이션이라고 한다-->
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

<style scoped>
.student {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.student-card {
  padding: 20px;
  width: 990px;
  cursor: pointer;
  /* border: 1px solid #4b464b; */
  margin-bottom: 7px;
  background-color: rgba(246, 246, 246, 0.044);
}

.student-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
.student-link {
  color: #2c3e50;
  text-decoration: none;
}
</style>
