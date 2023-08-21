<script setup lang="ts">
// import Vue from "vue"

// import { type StudentDetail } from '@/type'
// import { VueElement, type PropType } from 'vue'
// import axios from 'axios'

// defineProps({
//     student: {
//         type: Object as PropType<StudentDetail>,
//         require: true
//     }
// })

import {ref} from 'vue'
import { type StudentDetail } from '@/type'
import type { PropType } from 'vue';
import StudentService from '@/services/StudentService';


const student = ref<StudentDetail | null>(null)
const props = defineProps({
    id: String
})

StudentService.getStudentsById(Number()).then((response) => {
  student.value = response.data
})


</script>

<template>
    <div v-if="student">
        <p>Name: {{ student.first_name }} {{ student.last_name }}</p>
        <p>Student ID: {{ student.sid }}</p>
        <p>Course: {{ student.course }}</p>
    </div>
    <RouterLink class="student-link" :to="{name: 'advisorDetail', params:{id: student?.id}}">
  <div class="student">
    <div class="student-card">
      <span style="font-weight: 700;">Advisor: {{ student?.advisor }}</span><!--?는 체인 오퍼레이션이라고 한다-->
    </div>
  </div>
     </RouterLink>
</template>

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
  border: 1px solid #39495c;
  margin-bottom: 18px;
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