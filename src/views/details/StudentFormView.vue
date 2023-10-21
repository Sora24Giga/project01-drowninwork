<script setup lang="ts">
import type { StudentDetail, AdvisorDetail } from '@/type'
import { ref } from 'vue'
import StudentService from '@/services/StudentService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import AdvisorService from '@/services/AdvisorService'
import ImageUpload from '@/components/ImageUpload.vue'

const store = useMessageStore()
const router = useRouter()
const student = ref<StudentDetail>({
  id: 0,
  studentId: "",
  studentPw:"",
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
      console.log('saved')
      console.log(response.data)
      router.push({
        name: 'studentDetail',
        params: { id: response.data.id }
      })
      store.updateMessage(
        'You have successfully added a new student for ' + response.data.firstname
      )
      setTimeout(() => {
        store.restMessage()
      }, 3000)
    })
    .catch((e) => {
      console.log(e)
      router.push({ name: 'network-error' })
    })
}
</script>

<template>
  <div
    class="mb-[2rem] ml-0 mt-[108px] flex h-full w-full flex-col bg-se-dark text-xs md:text-base lg:ml-[20%] lg:mt-[60px] lg:w-[80%]"
  >
    <header>
      <div class="max-w-screen-xl py-8 mx-auto lg:ml-16 sm:py-12">
        <div class="sm:flex sm:items-center sm:justify-between">
          <div class="text-center sm:text-left">
            <h1 class="text-2xl font-bold text-se-white sm:text-3xl">Create a registration</h1>
            <p class="mt-1.5 text-sm text-se-white">Register Student Information 🗿</p>
          </div>
          <div class="flex flex-col gap-4 mt-4 sm:mt-0 sm:flex-row sm:items-center"></div>
        </div>
      </div>
    </header>
    <form @submit.prevent="saveStudent">
      <div class="lg:ml-16 lg:mr-64 w-[80%] mx-auto">
        <!-- Academic position -->
        <label
          for="AcademicPo"
          class="block px-3 py-2 mb-8 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1"
        >
          <span class="text-xs font-medium text-se-gray-light"> Student ID </span>

          <BaseInput
            v-model="student.studentId"
            type="text"
            placeholder="Insert student ID here"
            class="w-full p-0 mt-1 bg-transparent border-none text-se-white focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
        </label>
        <!--  -->

        <!-- Name -->
        <label
          for="AcademicPo"
          class="block px-3 py-2 mb-8 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1"
        >
          <span class="text-xs font-medium text-se-gray-light"> First name </span>

          <BaseInput
            v-model="student.firstname"
            type="text"
            placeholder="Insert Name here"
            class="w-full p-0 mt-1 bg-transparent border-none text-se-white focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
        </label>
        <!--  -->

        <!-- Last Name -->
        <label
          for="AcademicPo"
          class="block px-3 py-2 mb-8 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1"
        >
          <span class="text-xs font-medium text-se-gray-light"> Last name </span>

          <BaseInput
            v-model="student.surname"
            type="text"
            placeholder="Insert Last name here"
            class="w-full p-0 mt-1 bg-transparent border-none text-se-white focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
        </label>
        <!--  -->

        <!-- Department -->
        <label
          for="AcademicPo"
          class="block px-3 py-2 mb-8 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1"
        >
          <span class="text-xs font-medium text-se-gray-light"> Department </span>

          <BaseInput
            v-model="student.department"
            type="text"
            placeholder="Insert Department here"
            :required="true"
            class="w-full p-0 mt-1 bg-transparent border-none text-se-white focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
        </label>

        <div>
          <label class="text-se-white">Choose Advisor</label>
          <BaseSelect
            v-model="student.advisor.id"
            :options="advisors"
            :key-extractor="(x) => x.id"
            :value-extractor="(x) => x.id"
            :text-extractor="(x) => x.firstname + ' ' + x.surname"
            label=""
            class="w-full p-0 mt-1 border-spacing-1 bg-se-dark text-se-white focus:border-se-gray-light focus:outline-1 focus:ring-0 sm:text-sm"
          />
        </div>

        <br />
        <div>
          <h2 class="mb-5 text-sm text-se-white">Upload Image here</h2>
          <ImageUpload v-model="student.images" />
          <br />
        </div>

        <!-- button -->
        <button
          class="flex items-center justify-between gap-4 px-5 py-3 transition-colors border border-current rounded-lg group bg-se-black1800 hover:bg-se-color focus:outline-none focus:ring active:bg-se-color-light"
          type="submit"
        >
          <span class="font-medium transition-colors text-se-white"> Submit </span>

          <span
            class="p-2 border border-indigo-600 rounded-full group-active:border-indigo-500 shrink-0 bg-se-black1800"
          >
            <svg
              class="w-5 h-5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </button>
      </div>
    </form>
  </div>
</template>
