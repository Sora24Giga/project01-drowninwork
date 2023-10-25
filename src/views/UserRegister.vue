<script setup lang="ts">
import type { StudentDetail, AdvisorDetail } from '@/type'
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
studentPw: "",
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
advisee: [],
roles: []
},
roles: []
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
  <div
    class="text-xs md:text-base mb-[2rem] ml-0 mt-[108px] h-full w-full bg-se-dark lg:ml-[20%] lg:mt-[60px] lg:w-[80%] flex flex-col">
    <header>
      <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <div class="text-center sm:text-left">
            <h1 class="text-2xl font-bold text-se-white sm:text-3xl">
              Create a registration
            </h1>
            <p class="mt-1.5 text-sm text-se-white">
              Register Student Information 🗿
            </p>
          </div>
          <div class="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
          </div>
        </div>
      </div>
    </header>
    <form @submit.prevent="saveStudent">
      <div class="ml-16 mr-64">

        <!-- User ID -->
        <label for="AcademicPo"
          class="block overflow-hidden mb-8 rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 bg-se-black1800">
          <span class="text-xs font-medium text-se-white">
            Student ID
          </span>

          <BaseInput v-model="student.studentId" type="text" placeholder="Insert student ID here"
            class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm text-se-white" />
        </label>
        <!--  -->

        <!-- Password -->
        <label for="AcademicPo"
          class="block overflow-hidden mb-8 rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 bg-se-black1800">
          <span class="text-xs font-medium text-se-white">
            Student Password
          </span>

          <BaseInput v-model="student.studentPw" type="text" placeholder="Insert student password here"
            class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm text-se-white" />
        </label>

        <!-- Name -->
        <label for="AcademicPo"
          class="block overflow-hidden mb-8 rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 bg-se-black1800">
          <span class="text-xs font-medium text-se-white">
            First name
          </span>

          <BaseInput v-model="student.firstname" type="text" placeholder="Insert Name here"
            class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm text-se-white" />
        </label>
        <!--  -->

        <!-- Last Name -->
        <label for="AcademicPo"
          class="block overflow-hidden mb-8 rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 bg-se-black1800">
          <span class="text-xs font-medium text-se-white">
            Last name
          </span>

          <BaseInput v-model="student.surname" type="text" placeholder="Insert Last name here"
            class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm text-se-white" />
        </label>
        <!--  -->

        <!-- Department -->
        <label for="AcademicPo"
          class="block overflow-hidden mb-8 rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 bg-se-black1800">
          <span class="text-xs font-medium text-se-white">
            Department
          </span>

          <BaseInput v-model="student.department" type="text" placeholder="Insert Department here"
            class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm text-se-white" />
        </label>

        <!--        <div>-->
        <!--          <label class="text-se-white">Find Your Advisor</label>-->
        <!--          <BaseSelect v-model="student.advisor.id"-->
        <!--                      :options="advisors"-->
        <!--                      :key-extractor="(x) => x.id"-->
        <!--                      :value-extractor="(x) => x.id"-->
        <!--                      :text-extractor="(x) => x.firstname+' '+x.surname"-->
        <!--                      label=""-->
        <!--                      class="mt-1 w-full border-spacing-1 bg-se-dark p-0 focus:border-se-gray-light focus:outline-1 focus:ring-0 sm:text-sm text-se-white" />-->
        <!--        </div>-->

        <br>
        <div>
          <h2 class="mb-5 text-sm text-se-white">
            Upload Your Profile Image here
          </h2>
          <ImageUpload v-model="student.images" />
          <br>

        </div>

        <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
          <!-- button -->
          <button
            class="group flex items-center justify-between gap-4 rounded-lg border border-current px-5 py-3 transition-colors hover:bg-se-color focus:outline-none focus:ring active:bg-se-color-light bg-se-black1800"
            type="submit">
            <span class="font-medium transition-colors text-se-white">
              Submit
            </span>

            <span
              class="shrink-0 rounded-full border border-indigo-600 bg-se-black1800 p-2 group-active:border-indigo-500">
              <svg class="h-5 w-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
          <p class="mt-4 text-sm text-gray-500 text-se-white sm:mt-0">
            Already have an account?
            <router-link to="/login" class="text-gray-700 underline text-se-white">LogIn</router-link>.
          </p>
        </div>
      </div>
    </form>

</div></template>