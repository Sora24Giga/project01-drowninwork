<script setup lang="ts">
import type {StudentDetail, AdvisorDetail} from '@/type'
import { ref } from 'vue'
import StudentService from '@/services/StudentService';
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import BaseInput from "@/components/BaseInput.vue";
import BaseSelect from "@/components/BaseSelect.vue"
import AdvisorService from "@/services/AdvisorService";
import ImageUpload from '@/components/ImageUpload.vue';

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
  <div class="text-xs md:text-base mb-[2rem] ml-0 mt-[108px] h-full w-full bg-se-dark lg:ml-[20%] lg:mt-[60px] lg:w-[80%] flex flex-col">
    <h1>Create a registration</h1>
    <form @submit.prevent="saveStudent" >
      <div>
        <h3>Register Student Information</h3>
        <div>
          <BaseInput v-model="student.studentId" type="text" label="Student ID"/>
        </div>
        <div>
          <BaseInput v-model="student.firstname" type="text" label="First Name"/>
        </div>
        <div>
          <BaseInput v-model="student.surname" type="text" label="Last Name"/>
        </div>
        <div>
          <BaseInput v-model="student.department" type="text" label="Department"/>
        </div>
      
        <div>
          <BaseSelect v-model="student.advisor.id"
          :options="advisors"
          :key-extractor="(x) => x.id"
          :value-extractor="(x) => x.id"
          :text-extractor="(x) => x.firstname+' '+x.surname"
          label="Advisor"
        />
        </div>
        <br>
        <div>
          <label>Upload Profile Picture</label>
          <ImageUpload v-model="student.images" class="px-4"/>
          <br>
          <button type="submit" class="px-4 py-1 pt-1 font-bold text-green-700 bg-transparent border border-green-700 rounded hover:bg-green-800 hover:text-white">Submit</button>
        </div>
      </div>
    </form>

  </div>
</template>