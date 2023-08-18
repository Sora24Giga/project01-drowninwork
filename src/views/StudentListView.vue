<script setup lang="ts">
import StudentCard from '../components/StudentCard.vue'
import type { StudentDetail } from '@/type'
import axios from 'axios'
// import StudentService from '@/services/StudentService'
import { ref } from 'vue'

const students = ref<StudentDetail[]>([])

axios.get<StudentDetail[]>('http://localhost:3004/students')
.then((response) => {
  students.value = response.data
})

</script>

<template>
<div class="list-box">
  <h4 class="bold" style="text-align: center;">Student List</h4>
    <main class="students">
      <StudentCard v-for="student in students" :key="student.id" :event="student"></StudentCard>
    </main>
</div>    
</template>

<style scoped>
.students {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bold{
    font-weight: 900;
}

.list-box {
  width: 83%;
  height: 100%;
  padding: 20px;
  margin-bottom: 20px;
  position: fixed; top: 20px; right: 20px;
  background-color: rgb(242, 242, 242);
}
</style>