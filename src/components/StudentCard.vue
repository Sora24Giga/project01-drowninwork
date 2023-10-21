<template>
  <div
    class="w-full cursor-pointer p-[20px] m-0 text-se-white transition hover:scale-[1.01] hover:text-se-color-light"
  >
    <RouterLink
      class="text-left no-underline"
      :to="{ name: 'studentDetail', params: { id: student?.id } }"
    >
      <div class="flex">
        <div class="lg:flex hidden w-[8%]">
          <div v-if="props.student?.images.length !== 0" class="pt-3 h-14">
            <img v-for="image in props.student?.images" :key="image" :src="image" alt="advisors image"
              class="w-14 h-14 hover:shadow-lg rounded-[50%]"
            >
          </div>
          <div v-else class="relative inline-flex items-center justify-center overflow-hidden rounded-full w-14 h-14 bg-se-gray-light">
            <span class="text-xl font-semibold text-se-dark">
              {{ student?.firstname.charAt(0).toLocaleUpperCase() }}{{ student?.surname.charAt(0).toLocaleUpperCase() }}
            </span>
          </div>
        </div>
        <span class="w-1/4 pt-0 lg:pt-4 lg:w-1/5">{{ props.student?.studentId}}</span>
        <span class="w-1/4 pt-0 lg:pt-4 lg:w-1/5">{{ props.student?.firstname }}</span>
        <span class="w-1/4 pt-0 lg:pt-4 lg:w-1/5">{{ props.student?.surname }}</span>
        <span class="w-1/4 pt-0 lg:pt-4 lg:w-1/5">{{ props.student?.department }}</span>
        <!--?는 체인 오퍼레이션이라고 한다-->
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import type { StudentDetail } from '@/type'
import type { PropType } from 'vue'
const props = defineProps({
  student: {
    type: Object as PropType<StudentDetail>,
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
