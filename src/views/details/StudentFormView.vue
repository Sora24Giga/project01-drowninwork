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
import CommentService from '@/services/CommentService'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import InputText from '@/components/InputText.vue'
import {notify} from '@kyvg/vue3-notification'
const store = useMessageStore()
const router = useRouter()
const student = ref<StudentDetail>({
  id: 0,
  studentId: '',
  firstname: '',
  surname: '',
  department: '',
  images: [],
  comment: [],
  advisor: {
    academicPosition: '',
    advisee: [],
    images: [],
    id: 0,
    studentId: '',
    firstname: '',
    surname: '',
    department: '',
    roles: [],
    username: '',
    password: ''
  },
  roles: [],
  password: ''
})

const validationSchema = yup.object({
  studentId: yup.string().required('The Student Id is required'),
  password: yup
    .string()
    .required('The Password is required')
    .min(6, 'Password must be at least 6 characters long'),
  firstname: yup.string().required('The First Name is required'),
  surname: yup.string().required('The Last Name is required'),
  department: yup.string().required('The Department is required')
})
const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    studentId: '',
    password: '',
    firstname: '',
    surname: '',
    department: ''
  }
})

const { value: studentId } = useField<string>('studentId')
const { value: password } = useField<string>('password')
const { value: firstname } = useField<string>('firstname')
const { value: surname } = useField<string>('surname')
const { value: department } = useField<string>('department')

const advisors = ref<AdvisorDetail[]>([])
AdvisorService.getAdvisorlist()
  .then((response) => {
    advisors.value = response.data
  })
  .catch(() => {
    router.push({ name: 'network-error' })
  })

const saveStudent = handleSubmit((values) => {
  student.value.studentId = values.studentId
  student.value.password = values.password
  student.value.firstname = values.firstname
  student.value.surname = values.surname
  student.value.department = values.department
  StudentService.saveStudent(student.value)
    .then((response) => {
      console.log('saved')
      console.log(response.data)
      if (response.data.advisor !== null && response.data.advisor.id !== 0) {
        CommentService.saveCommentHistory({
          id: 0,
          history: [],
          advisorId: response.data.advisor.id,
          adviseeId: response.data.id
        }).catch((e) => {
          console.log(e)
          router.push({ name: 'network-error' })
        })
      }
      notify({
        title: 'Registration',
        text: 'Student has been added!',
        type: 'success'
      })
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
})
</script>

<template>
  <div
    class="mb-[2rem] ml-0 mt-[108px] flex h-full w-full flex-col bg-se-dark text-xs md:text-base lg:ml-[17%] lg:mt-[60px] lg:w-[80%]"
  >
    <header>
      <div class="mx-auto w-[80%] py-8 sm:py-12">
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
      <div class="mx-auto w-[80%]">
        <!-- StudentId -->
        <label
          for="StudentId"
          class="block px-3 py-2 mb-8 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1"
        >
          <span class="text-xs font-medium text-se-gray-light"> Student ID </span>

          <InputText
            v-model="studentId"
            :error="errors['studentId']"
            type="text"
            placeholder="Insert Student ID here"
            class="w-full px-2 py-0 mt-1 bg-transparent border-none text-se-white focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
        </label>
        <!--  -->

        <!-- Password -->
        <label
          for="password"
          class="block px-3 py-2 mb-8 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1"
        >
          <span class="text-xs font-medium text-se-gray-light"> Password </span>

          <InputText
            v-model="password"
            :error="errors['password']"
            type="text"
            placeholder="Insert Password here"
            class="w-full px-2 py-0 mt-1 bg-transparent border-none text-se-white focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
        </label>
        <!--  -->

        <!-- Name -->
        <label
          for="AcademicPo"
          class="block px-3 py-2 mb-8 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1"
        >
          <span class="text-xs font-medium text-se-gray-light"> First Name </span>

          <InputText
            v-model="firstname"
            :error="errors['firstname']"
            type="text"
            placeholder="Insert First Name here"
            class="w-full px-2 py-0 mt-1 bg-transparent border-none text-se-white focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
        </label>
        <!--  -->

        <!-- Last Name -->
        <label
          for="AcademicPo"
          class="block px-3 py-2 mb-8 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1"
        >
          <span class="text-xs font-medium text-se-gray-light"> Last Name </span>

          <InputText
            v-model="surname"
            :error="errors['surname']"
            type="text"
            placeholder="Insert Last Name here"
            class="w-full px-2 py-0 mt-1 bg-transparent border-none text-se-white focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
        </label>
        <!--  -->

        <!-- Department -->
        <label
          for="AcademicPo"
          class="block px-3 py-2 mb-8 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1"
        >
          <span class="text-xs font-medium text-se-gray-light"> Department </span>

          <InputText
            v-model="department"
            :error="errors['department']"
            type="text"
            placeholder="Insert Department here"
            :required="true"
            class="w-full px-2 py-0 mt-1 bg-transparent border-none text-se-white focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
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
            class="p-2 border border-indigo-600 rounded-full group-active:border-indigo-500 shrink-0 bg-se-black1800 text-se-white group-hover:bg-se-color"
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
