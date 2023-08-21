<template>
    <RouterLink class="student-link" :to="{name: 'studentDetail', params:{id: student?.id}}">
  <div class="student">
    <div class="student-card text-se-light-gray">
      <span style="font-weight: 700;">Name: {{ props.student?.first_name }} {{ props.student?.last_name }}</span><!--?는 체인 오퍼레이션이라고 한다-->
    </div>
  </div>
     </RouterLink>
</template>

<script setup lang="ts">

import type { StudentDetail } from '@/type'
import type { PropType } from 'vue'
const props = defineProps({
    student: {
      type: Object as PropType<StudentDetail>,
      require:true
    }
})

// const passenger = ref<Passengers[]>([])


</script>

<style scoped>
.student{
  display:flex;
  flex-direction: column;
  align-items: center;
}
.student-card{
  padding: 20px;
  width: 900px;
  cursor: pointer;
}

.student-card:hover{
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
.student-link{
  color: #2c3e50;
  text-decoration: none;
}

</style>