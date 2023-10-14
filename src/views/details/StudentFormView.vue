<script setup lang="ts">
import type {StudentDetail, AdvisorDetail, StudentReg} from '@/type'
import { ref } from 'vue'
import StudentService from '@/services/StudentService';
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import BaseInput from "@/components/BaseInput.vue";


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
        store.updateMessage('You have successfully added a new event for ' + response.data.title)
        setTimeout(() => {
          store.restMessage()
        }, 3000)
      }).catch(() => {
    router.push({ name: 'network-error' })
  })
}

const student = ref<StudentReg>({
  id: 0,
  sid: "",
  first_name: "",
  last_name: "",
  img: "",
  course: ""
})
</script>


<template>
  <div>
    <h1>Create an event</h1>
    <form @submit.prevent="saveEvent">

      <BaseInput v-model="student.sid" type="text" label="Student ID"/>

      <h3>Register Student Information</h3>


      <BaseInput v-model="student.first_name" type="text" label="First Name"/>


      <BaseInput v-model="student.last_name" type="text" label="Last Name"/>

      <BaseInput v-model="student.course" type="text" label="Department"/>

      <BaseInput v-model="student.img" type="text" label="Image Link"/>


      <button type="submit" class="bg-transparent hover:bg-green-800 border border-green-700 font-bold text-green-700 hover:text-white py-1 px-4 rounded">Submit</button>
    </form>

    <pre>{{student}}</pre>
  </div>
</template>

<style>

</style>