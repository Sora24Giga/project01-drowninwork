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
<div class="ml-[20%]">
  <div class="flex flex-col	items-center">
  <h4 class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-se-color-light border-grey-light text-center w-[900px] mt-[30px]">Student List</h4>
  </div>
  
    <table class="students text-left w-full border-collapse ">
      <StudentCard v-for="student in students" :key="student.id" :student="student" class=" odd:bg-se-gray even:bg-se-dark"></StudentCard>
    </table>
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
  width: 81%;
  height: 70%;
  padding: 20px;
  margin-bottom: 20px;
  position: fixed; top: 90px; right: 2%;
  background-color: rgb(242, 242, 242);
}
</style>