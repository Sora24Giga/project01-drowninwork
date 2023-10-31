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
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const messageStore = useMessageStore()
const router = useRouter()

const validationSchema = yup.object({
  studentId: yup.string().required('The username is required'),
  password: yup.string().required('The password is required'),
  firstname: yup.string().required('The firstname is required'),
  surname: yup.string().required('The surname is required'),
  department: yup.string().required('The department is required')
})
const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    studentId: '',
    password: '',
    firstname: '',
    surname: '',
    department: '',
    images: []
  }
})

const { value: studentId } = useField<string>('studentId')
const { value: password } = useField<string>('password')
const { value: firstname } = useField<string>('firstname')
const { value: surname } = useField<string>('surname')
const { value: department } = useField<string>('department')
const { value: images } = useField<string[]>('images')

const emit = defineEmits(['forceRerender'])

const onSubmit = handleSubmit((values) => {
  console.log('login Button Pressed')
  console.log(values)
  authStore
    .register(
      values.studentId,
      values.password,
      values.firstname,
      values.surname,
      values.department,
      values.images
    )
    .then(() => {
      console.log('register done')
      emit('forceRerender')
      if(authStore.isStudent){
        router.push({ name: 'announcement'})
      } else {
        router.push({ name: 'studentList' })
      }
    })
    .catch(() => {
      messageStore.updateMessage('could not register')
      setTimeout(() => {
        messageStore.restMessage()
      }, 3000)
    })
})

// const advisors = ref<AdvisorDetail[]>([])
// AdvisorService.getAdvisorlist()
//   .then((response) => {
//     advisors.value = response.data
//   })
//   .catch(() => {
//     router.push({ name: 'network-error' })
//   })

// const student = ref<StudentDetail>({
//   advisor: {
//     academicPosition: '',
//     advisee: [],
//     images: [],
//     id: 0,
//     studentId: '',
//     firstname: '',
//     surname: '',
//     department: '',
//     roles: [],
//     username: '',
//     password: ''
//   },
//   images: [],
//   comment: [],
//   id: 0,
//   studentId: '',
//   firstname: '',
//   surname: '',
//   department: '',
//   roles: [],
//   password: ''
// })
// function saveStudent() {
//   StudentService.saveStudent(student.value)
//     .then((response) => {
//       console.log('saved')
//       console.log(response.data)
//       router.push({
//         name: 'studentDetail',
//         params: { id: response.data.id }
//       })
//       messageStore.updateMessage(
//         'You have successfully added a new student for ' + response.data.firstname
//       )
//       setTimeout(() => {
//         messageStore.restMessage()
//       }, 3000)
//     })
//     .catch((e) => {
//       console.log(e)
//       router.push({ name: 'network-error' })
//     })
// }
</script>

<template>
  <div
    class="mb-[2rem] ml-0 mt-[108px] flex h-full w-full flex-row justify-center bg-se-dark text-xs md:text-base lg:ml-[17%] lg:mt-[60px] lg:w-[80%]"
  >
    <div class="w-full lg:w-4/5">
      <header>
        <div class="w-4/5 py-8 mx-auto sm:py-12">
          <div class="sm:flex sm:items-center sm:justify-between">
            <div class="text-center sm:text-left">
              <h1 class="text-2xl font-bold text-se-white sm:text-3xl">Register</h1>
              <p class="mt-1.5 text-sm text-se-gray-light">Register Student Account 🗿</p>
            </div>
            <div class="flex flex-col gap-4 mt-4 sm:mt-0 sm:flex-row sm:items-center"></div>
          </div>
        </div>
      </header>
      <div class="w-full mx-auto lg:w-4/5">
        <form @submit.prevent="onSubmit">
          <div class="grid w-4/5 grid-cols-6 gap-6 mx-auto lg:w-full">
            <!-- User ID -->
            <div class="col-span-6">
              <label
                for="studentId"
                class="block px-3 py-2 overflow-hidden border border-black rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1"
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
            </div>
            <!--  -->

            <!-- Password -->
            <div class="col-span-6">
              <label
                for="password"
                class="block px-3 py-2 overflow-hidden border border-black rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1"
              >
                <span class="text-xs font-medium text-se-gray-light"> Password </span>

                <InputText
                  v-model="password"
                  :error="errors['password']"
                  type="password"
                  placeholder="Insert Password here"
                  class="w-full px-2 py-0 mt-1 bg-transparent border-none text-se-white focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                />
              </label>
            </div>

            <!-- Name -->
            <div class="col-span-6">
              <label
                for="firstname"
                class="block px-3 py-2 overflow-hidden border border-black rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1"
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
            </div>
            <!--  -->

            <!-- Last Name -->
            <div class="col-span-6">
              <label
                for="surname"
                class="block px-3 py-2 overflow-hidden border border-black rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1"
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
            </div>
            <!--  -->

            <!-- Department -->
            <div class="col-span-6">
              <label
                for="department"
                class="block px-3 py-2 overflow-hidden border border-black rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1"
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
            </div>

            <!--        <div>-->
            <!--          <label class="text-se-white">Find Your Advisor</label>-->
            <!--          <BaseSelect v-model="student.advisor.id"-->
            <!--                      :options="advisors"-->
            <!--                      :key-extractor="(x) => x.id"-->
            <!--                      :value-extractor="(x) => x.id"-->
            <!--                      :text-extractor="(x) => x.firstname+' '+x.surname"-->
            <!--                      label=""-->
            <!--                      class="w-full p-0 mt-1 border-spacing-1 bg-se-dark focus:border-se-gray-light focus:outline-1 focus:ring-0 sm:text-sm text-se-white" />-->
            <!--        </div>-->

            <!-- <div class="col-span-6">
              <div>
                <h2 class="mb-5 text-sm text-se-white">Upload Your Profile Image here</h2>
                <ImageUpload v-model="images" />
                <br />
              </div>
            </div> -->

            <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
              <!-- button -->
              <button
                type="submit"
                class="flex items-center justify-between gap-4 px-5 py-3 transition-colors border border-current rounded-lg group bg-se-black1800 hover:bg-se-color focus:outline-none focus:ring active:border-se-color-light"
              >
                <span class="font-medium transition-colors text-se-white"> Sign in </span>

                <span
                  class="p-2 transition border rounded-full shrink-0 bg-se-black1800 group-hover:bg-se-color group-active:border-se-color-light"
                >
                  <svg
                    class="w-5 h-5 stroke-se-white rtl:rotate-180"
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
              <p class="mt-4 text-sm text-gray-500 text-se-white sm:mt-0">
                Already have an account?
                <router-link to="/login" class="text-gray-700 underline text-se-white hover:text-se-color-light"
                  >Login</router-link
                >.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
