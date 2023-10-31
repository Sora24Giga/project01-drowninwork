<script setup lang="ts">
import type { AdvisorDetail } from '@/type'
import { ref } from 'vue'
import AdvisorService from '@/services/AdvisorService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import BaseInput from '@/components/BaseInput.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import InputText from '@/components/InputText.vue'
import {notify} from '@kyvg/vue3-notification'

const store = useMessageStore()
const router = useRouter()

const validationSchema = yup.object({
  username: yup.string().required('The Username is required'),
  password: yup
    .string()
    .required('The Password is required')
    .min(6, 'Password must be at least 6 characters long'),
  academicPosition: yup.string().required('The Academic Position is required'),
  firstname: yup.string().required('The First Name is required'),
  surname: yup.string().required('The Last Name is required'),
  department: yup.string().required('The Department is required')
})
const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    username: '',
    password: '',
    academicPosition: '',
    firstname: '',
    surname: '',
    department: ''
  }
})

const { value: username } = useField<string>('username')
const { value: password } = useField<string>('password')
const { value: academicPosition } = useField<string>('academicPosition')
const { value: firstname } = useField<string>('firstname')
const { value: surname } = useField<string>('surname')
const { value: department } = useField<string>('department')

const saveAdvisor = handleSubmit((values) => {
  advisor.value.username = values.username
  advisor.value.password = values.password
  advisor.value.academicPosition = values.academicPosition
  advisor.value.firstname = values.firstname
  advisor.value.surname = values.surname
  advisor.value.department = values.department
  AdvisorService.saveAdvisor(advisor.value)
    .then((response) => {
      console.log(response.data)
      notify({
        title: 'Registration',
        text: 'Advisor has been added!',
        type: 'success'
      })
      router.push({
        name: 'advisorDetail',
        params: { id: response.data.id }
      })
      store.updateMessage(
        'You have successfully added a new advisor for ' + response.data.firstname
      )
      setTimeout(() => {
        store.restMessage()
      }, 3000)
    })
    .catch(() => {
      router.push({ name: 'network-error' })
    })
})

const advisor = ref<AdvisorDetail>({
  username: '',
  academicPosition: '',
  advisee: [],
  id: 0,
  password: '',
  studentId: '',
  firstname: '',
  surname: '',
  department: '',
  roles: [],
  images: []
})
</script>

<template>
  <!-- header -->
  <div
    class="mb-[2rem] ml-0 mt-[108px] flex h-full w-full flex-col bg-se-dark text-xs md:text-base lg:ml-[17%] lg:mt-[60px] lg:w-[80%]"
  >
    <header>
      <div class="mx-auto w-[80%] py-8 sm:py-12">
        <div class="sm:flex sm:items-center sm:justify-between">
          <div class="text-center sm:text-left">
            <h1 class="text-2xl font-bold text-se-white sm:text-3xl">Create a registration</h1>
            <p class="mt-1.5 text-sm text-se-white">Register Advisor Information 🗿</p>
          </div>
          <div class="flex flex-col gap-4 mt-4 sm:mt-0 sm:flex-row sm:items-center"></div>
        </div>
      </div>
    </header>
    <!-- main content -->
    <form @submit.prevent="saveAdvisor">
      <div class="mx-auto w-[80%]">
        <!-- Username -->
        <label
          for="Username"
          class="block px-3 py-2 mb-8 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1"
        >
          <span class="text-xs font-medium text-se-gray-light"> Username </span>

          <InputText
            v-model="username"
            :error="errors['username']"
            type="text"
            placeholder="Insert username here"
            class="w-full px-2 py-0 mt-1 bg-transparent border-none text-se-white focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
        </label>

        <!-- Password -->
        <label
          for="Password"
          class="block px-3 py-2 mb-8 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1"
        >
          <span class="text-xs font-medium text-se-gray-light"> Password </span>

          <InputText
            v-model="password"
            :error="errors['password']"
            type="text"
            placeholder="Insert password here"
            class="w-full px-2 py-0 mt-1 bg-transparent border-none text-se-white focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
        </label>

        <!-- Academic position -->
        <label
          for="AcademicPo"
          class="block px-3 py-2 mb-8 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1"
        >
          <span class="text-xs font-medium text-se-gray-light"> Academic Position </span>

          <InputText
            v-model="academicPosition"
            :error="errors['academicPosition']"
            type="text"
            placeholder="Insert academic position here"
            class="w-full px-2 py-0 mt-1 bg-transparent border-none text-se-white focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
        </label>
        <!--  -->

        <!-- Name -->
        <label
          for="AcademicPo"
          class="block px-3 py-2 mb-8 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1"
        >
          <span class="text-xs font-medium text-se-gray-light"> First name </span>

          <InputText
            v-model="firstname"
            :error="errors['firstname']"
            type="text"
            placeholder="Insert Name here"
            class="w-full px-2 py-0 mt-1 bg-transparent border-none text-se-white focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
        </label>
        <!--  -->

        <!-- Last Name -->
        <label
          for="AcademicPo"
          class="block px-3 py-2 mb-8 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1"
        >
          <span class="text-xs font-medium text-se-gray-light"> Last name </span>

          <InputText
            v-model="surname"
            :error="errors['surname']"
            type="text"
            placeholder="Insert Last name here"
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
            class="w-full px-2 py-0 mt-1 bg-transparent border-none text-se-white focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
        </label>
        <!--  -->

        <br />
        <div>
          <h2 class="mb-5 text-sm text-se-white">Upload Image here</h2>
          <ImageUpload v-model="advisor.images" />
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

<style>
.box {
  padding-left: 35%;
  padding-top: 15%;
  color: #f2f2f208;
}

.lines {
  padding-top: 5%;
}

.button {
  align-items: center;
}
</style>
