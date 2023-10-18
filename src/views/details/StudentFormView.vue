<script setup lang="ts">
import type {StudentDetail, AdvisorDetail, StudentReg, AdvisorOption} from '@/type'
import { ref } from 'vue'
import StudentService from '@/services/StudentService';
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import BaseInput from "@/components/BaseInput.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import AdvisorService from "@/services/AdvisorService";
//TEST Commit

const store = useMessageStore()

const router = useRouter()


const advisors = ref<AdvisorOption[]>([])
AdvisorService.getAdvisorlist()
    .then((response) => {
      advisors.value = response.data
    })
    .catch(() => {
      router.push({ name: 'network-error' })
    })

let boolean = true

function saveStudent() {
  StudentService.saveStudent(student.value)
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
  advisor: {id: 0, name: ''},
  department: ""
})
</script>


<template>
  <div>
    <h1>Create a registration</h1>
    <form @submit.prevent="saveStudent" >
      <div class="box">
      <h3>Register Student Information</h3>
      <div class="lines">
      <BaseInput v-model="student.studentId" type="text" label="Student ID"/>
      </div>
        <div class="lines">
      <BaseInput v-model="student.firstname" type="text" label="First Name"/>
        </div>
        <div class="lines">
      <BaseInput v-model="student.surname" type="text" label="Last Name"/>
      </div>
        <!-- PLACEHOLDER will change to proper upload in the future -->
        <div class="lines">
      <BaseInput v-model="student.department" type="text" label="Department"/>
        </div>
        <!-- Going to add the option function for the advisor. -->
      <div class="lines">
        <BaseSelect v-model="student.advisor.id" label="Advisor" :options="advisors" />
      </div>

      <button type="submit" class="px-4 py-1 pt-1 font-bold text-green-700 bg-transparent border border-green-700 rounded hover:bg-green-800 hover:text-white">Submit</button>
<!--      <pre>{{student}}</pre>-->
      </div>
    </form>

  </div>
</template>

<style>
.box {
  padding-left: 35%;
  padding-top: 15%;
  color: #f2f2f2;
}
.lines {
  padding-top: 5%;
}

.button {
  align-items: center;
}

</style>