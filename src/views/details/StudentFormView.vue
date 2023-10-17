<script setup lang="ts">
import type {StudentDetail, AdvisorDetail, StudentReg} from '@/type'
import { ref } from 'vue'
import StudentService from '@/services/StudentService';
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import BaseInput from "@/components/BaseInput.vue";
//TEST Commit

const store = useMessageStore()

const router = useRouter()


let boolean = true

function saveEvent() {
  StudentService.saveEvent(student.value)
      .then((response) => {
        console.log(response.data)
        router.push({
          name: 'studentDetail',
          params: { id: response.data.id }
        })
        store.updateMessage('You have successfully added a new student for ' + response.data.firstname)
        setTimeout(() => {
          store.restMessage()
        }, 3000)
      }).catch(() => {
    router.push({ name: 'network-error' })
  })
}

const student = ref<StudentReg>({
  id: 0,
  studentId: "",
  firstname: "",
  surname: "",
  images: [],
  department: ""
})
</script>


<template>
  <div>
    <h1>Create an event</h1>
    <form @submit.prevent="saveEvent">

      <BaseInput v-model="student.studentId" type="text" label="Student ID"/>

      <h3>Register Student Information</h3>


      <BaseInput v-model="student.firstname" type="text" label="First Name"/>


      <BaseInput v-model="student.surname" type="text" label="Last Name"/>

      <BaseInput v-model="student.department" type="text" label="Department"/>
      <!-- PLACEHOLDER will change to proper upload in the future -->
      <BaseInput v-model="student.department" type="text" label="Image Link"/>


      <button type="submit" class="px-4 py-1 font-bold text-green-700 bg-transparent border border-green-700 rounded hover:bg-green-800 hover:text-white">Submit</button>
    </form>

    <pre>{{student}}</pre>
  </div>
</template>

<style>

</style>