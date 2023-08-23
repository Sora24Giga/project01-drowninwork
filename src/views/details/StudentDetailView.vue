<script setup lang="ts">
import type { StudentDetail } from '@/type'
import { ref} from 'vue'
import StudentService from "@/services/StudentService"

const student = ref<StudentDetail | null> (null)
const props = defineProps({
  id: String
})

console.log(Number(props.id)) //props check

StudentService.getStudentsById(Number(props.id)).then((response) => {
  student.value = response.data
})

</script>

<template>
  <div class="student-box">
  <div class="info-pg-bg">
    <p class="label-card">STUDENT INFO.</p>
    <div v-if="student" class="student-card">
      <br>
      <br>
      <br>
      <br>
        <p>Name: {{ student.first_name }} {{ student.last_name }}</p>
        <p>Student ID: {{ student.sid }}</p>
        <p>Course: {{ student.course }}</p>
        <br>
        <a v-bind:href="student.studentImgLink">[Profile Photo]</a>
    </div>
    <RouterLink :to="{name:'advisorDetail', params: { id: student?.advisorID } }" class="advisor-card">Advisor: {{ student?.advisor }}</RouterLink>
    <p class="label-card">Advisor Comment</p>
    <textarea class="comment-card"></textarea>
    <button class="button2">EDIT</button>
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
  text-align: center;
  padding: 20px;
  width: 500px;
  height: 400px;
  cursor: pointer;
  margin-bottom: 18px;
  margin-top: 0%;
  margin-left: 32%;
  color: aliceblue;
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  background-color: #312f2f3a;
}

.advisor-card{
  text-align: center;
  padding: 20px;
  width: 500px;
  height: 50px;
  cursor: pointer;
  /* border: 1px solid #39495c; */
  margin-bottom: 4%;

  margin-left: 32%;
  color: aliceblue;
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  background-color: #312f2f3a;
}

.comment-card{
  text-align: center;
  padding: 20px;
  width: 500px;
  height: 200px;
  cursor: pointer;

  /* border: 1px solid #39495c; */
  margin-top: 0%;

  margin-left: 32%;
  color: aliceblue;
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  background-color: #312f2f3a;
}

.label-card{
  text-align: center;
  padding: 20px;
  width: 500px;
  height: 60px;
  cursor: pointer;

  /* border: 1px solid #39495c; */
  margin-top: 3%;

  margin-left: 32%;
  color: aliceblue;
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  background-color: #312f2f3a;
}

/* .student-card:hover{
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
} */
.student-link{
  color: #2c3e50;
  text-decoration: none;
}

.info-pg-bg {
  width: 80%;
  height: 100%;
  padding: 20px;
  margin-bottom: 20px;
  position: fixed; top: 0%; right: 0%;
  background-color: rgb(41, 39, 38);
}

.button{
  position: absolute;
  background-color: aliceblue;
  width: 100px;
  top: 88%;
  right: 40%;
  align-items: center;
}
.button2{
  position: relative;
  background-color: rgb(225, 226, 227);
  width: 100px;
  top:30px;
  right: 100px;
  align-items: center;
}

</style>