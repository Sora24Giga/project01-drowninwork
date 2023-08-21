<script setup lang="ts">
import StudentCard from '../components/StudentCard.vue'
import type { StudentDetail } from '@/type'
import StudentService from '@/services/StudentService'
import { ref, type Ref } from 'vue'

const students: Ref<Array<StudentDetail>> = ref([])

StudentService.getStudents().then((response) => {
  students.value = response.data
})

</script>

<template>
<div class="list-box">
  <br>
  <br>
  <br>
  <br>
  <h4 class="card" style="text-align: left; color:aliceblue">Name</h4>
  <br>
  <StudentCard style="left: 20px;">name</StudentCard>
    <main class="students">
      <StudentCard v-for="student in students" :key="student.id" :student="student"></StudentCard>
    </main>
</div>    
</template>

<style scoped>
.students {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card{
  display:flex;
  flex-direction: column;
  align-items: left;
  position: fixed;
  left: 29.5%;
  right: 0%;
  padding: 0px;
  width: 990px;
  cursor: pointer;
  margin-bottom: 18px;
  background-color: rgba(255, 255, 255, 0.085);
}

.bold{
    font-weight: 900;
}

.list-box {
  width: 81%;
  height: 100%;
  padding: 20px;
  margin-bottom: 20px;
  position: fixed; top: 0%; right: 0%;
  background-color: rgb(41, 39, 38);
}
</style>