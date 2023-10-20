<script setup lang="ts">
import type {StudentDetail, AdvisorDetail} from '@/type'
import { ref } from 'vue'
import StudentService from '@/services/StudentService';
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import BaseInput from "@/components/BaseInput.vue";
import BaseSelect from "@/components/BaseSelect.vue"
import AdvisorService from "@/services/AdvisorService";

const store = useMessageStore()
const router = useRouter()
const student = ref<StudentDetail>({
  id: 0,
  studentId: "",
  firstname: "",
  surname: "",
  department: "",
  images: [],
  comment: [],
  advisor: {
    id: 0,
    academicPosition: '',
    firstname: '',
    surname: '',
    department: '',
    images: [],
    advisee: []
  }
})

const advisors = ref<AdvisorDetail[]>([])
AdvisorService.getAdvisorlist()
    .then((response) => {
      advisors.value = response.data
    })
    .catch(() => {
      router.push({ name: 'network-error' })
    })

function saveStudent() {
  StudentService.saveStudent(student.value)
  .then((response) => {
    console.log("saved")
    console.log(response.data)
    router.push({
      name: 'studentDetail',
      params: { id: response.data.id }
    })
    store.updateMessage('You have successfully added a new student for ' + response.data.firstname)
    setTimeout(() => {
      store.restMessage()
    }, 3000)
  }).catch((e) => {
    console.log(e)
    router.push({ name: 'network-error' })
  })
}


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
      
        <div class="lines">
          <BaseSelect v-model="student.advisor.id"
          :options="advisors"
          :key-extractor="(x) => x.id"
          :value-extractor="(x) => x.id"
          :text-extractor="(x) => x.firstname"
          label="Advisor"
        />
        </div>
      
        <button type="submit" class="px-4 py-1 pt-1 font-bold text-green-700 bg-transparent border border-green-700 rounded hover:bg-green-800 hover:text-white">Submit</button>
      </div>
    </form>

  </div>
</template>