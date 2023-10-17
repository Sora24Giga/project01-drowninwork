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

function saveStudent() {
  StudentService.saveStudent(student.value)
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
    <h1>Create a registration</h1>
    <form @submit.prevent="saveStudent" >
      <div class="box">
      <h3>Register Student Information</h3>
      <div class="lines">
      <BaseInput v-model="student.sid" type="text" label="Student ID"/>
      </div>
        <div class="lines">
      <BaseInput v-model="student.first_name" type="text" label="First Name"/>
        </div>
        <div class="lines">
      <BaseInput v-model="student.last_name" type="text" label="Last Name"/>
      </div>
        <!-- PLACEHOLDER will change to proper upload in the future -->
        <div class="lines">
      <BaseInput v-model="student.course" type="text" label="Department"/>
        </div>
      <div class="lines">
      <BaseInput v-model="student.img" type="text" label="Image Link"/>
      </div>

      <button type="submit" class="bg-transparent hover:bg-green-800 border border-green-700 font-bold text-green-700 hover:text-white py-1 px-4 rounded">Submit</button>
      <pre>{{student}}</pre>
      </div>
    </form>

  </div>
</template>

<style>
.box {
  padding-left: 20%;
  padding-top: 15%;
  color: #f2f2f2;
}
.lines {
  padding-top: 5%;
}

.button {

}

</style>