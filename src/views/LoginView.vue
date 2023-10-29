<script setup lang="ts">
//http.cors(withDefaults()); have to be added to SecurityConfig.java
import { useRouter } from 'vue-router'
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'
import { useMessageStore } from '@/stores/message'

const router = useRouter()

const messageStore = useMessageStore()

const authStore = useAuthStore()
const validationSchema = yup.object({
  username: yup.string().required('The username is required'),
  password: yup.string().required('The password is required')
})
const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    username: '',
    password: ''
  }
})

const { value: username } = useField<string>('username')
const { value: password } = useField<string>('password')

const emit = defineEmits(['forceRerender'])
const onSubmit = handleSubmit((values) => {
  console.log('login Button Pressed')
  console.log(values)
  authStore
    .login(values.username, values.password)
    .then(() => {
      console.log('login done')
      emit('forceRerender')
      router.push({ name: 'studentList' })
    })
    .catch(() => {
      messageStore.updateMessage('could not login')
      setTimeout(() => {
        messageStore.restMessage()
      }, 3000)
    })
})
</script>

<template>
  <div
    class="mb-[2rem] ml-0 mt-[108px] justify-center flex h-full w-full flex-row bg-se-dark text-xs md:text-base lg:ml-[20%] lg:mt-[60px] lg:w-[80%]"
  >
    <div class="w-full lg:w-4/5">
      <header>
        <div class="w-4/5 py-8 mx-auto sm:py-12">
          <div class="sm:flex sm:items-center sm:justify-between">
            <div class="text-center sm:text-left">
              <h1 class="text-2xl font-bold text-se-white sm:text-3xl">Login 🗿</h1>
              <p class="mt-1.5 text-sm text-se-white">Login page</p>
            </div>
            <div class="flex flex-col gap-4 mt-4 sm:mt-0 sm:flex-row sm:items-center"></div>
          </div>
        </div>
      </header>

      <div class="w-4/5 mx-auto">
        <form class="grid grid-cols-6 gap-6" @submit.prevent="onSubmit">
          <!-- Username -->
          <div class="col-span-6">
            <label
              for="email"
              class="block px-3 py-2 overflow-hidden border border-black rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1"
            >
              <span class="text-xs font-medium text-se-gray-light"> Username / Student ID </span>

              <InputText
                v-model="username"
                :error="errors['username']"
                type="text"
                placeholder="Insert Username or Student ID here"
                class="w-full px-2 py-0 mt-1 bg-transparent border-none text-se-white focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              />
            </label>
          </div>

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

          <!-- Button -->
          <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
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

            <p class="mt-4 text-sm text-se-white sm:mt-0">
              Don't have an account yet?
              <router-link to="/register" class="underline text-se-white">Sign Up</router-link>.
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
