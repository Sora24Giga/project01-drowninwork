<script setup lang="ts">
import Vue from "vue"

import { type StudentDetail } from '@/type'
import { ref, VueElement, type PropType } from 'vue'
import axios from 'axios'
import StudentService from "@/services/StudentService"

const student = ref<StudentDetail | null>(null)
const props = defineProps({
    id: String
})


StudentService.getStudentsById(1).then((response) => {
  student.value = response.data
})

</script>

<template>
  <div class="info-pg-bg">
    <div v-if="student" class="student-card">
        <p>Name: {{ student.first_name }} {{ student.last_name }}</p>
        <p>Student ID: {{ student.sid }}</p>
        <p>Course: {{ student.course }}</p>
    </div>
    </div>
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

.info-pg-bg {
  width: 81%;
  height: 100%;
  padding: 20px;
  margin-bottom: 20px;
  position: fixed; top: 0%; right: 0%;
  background-color: rgb(41, 39, 38);
}

</style>