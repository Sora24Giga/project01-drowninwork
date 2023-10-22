<script setup lang="ts">
//http.cors(withDefaults()); have to be added to SecurityConfig.java
import { useRouter } from "vue-router";
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
import { ref } from 'vue'
import { useField, useForm } from "vee-validate";
import { useAuthStore } from "@/stores/auth";
import { useMessageStore } from "@/stores/message";

const router = useRouter()

const messageStore = useMessageStore()

const authStore = useAuthStore()
const validationSchema = yup.object({
  // email: yup.string().required('The email is required').email(6,'Input must be an email.'),
  // password: yup.string().required('The password is required').min(6,'The password must be at least 6 characters.')
  email: yup.string().required('The email is required'),
  password: yup.string().required('The password is required')
})
const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    email: '',
    password: ''
  }
})

const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
// const onSubmit = handleSubmit((values) => {
//   console.log(values)
const onSubmit = handleSubmit((values) => {
  authStore.login(values.email, values.password)
    .then(() => {
      router.push({ name: 'studentList' })
    }).catch(() => {
      messageStore.updateMessage('could not login')
      setTimeout(() => {
        messageStore.restMessage()
      }, 3000)
    })
})
</script>

<template>
  <div
    class="mb-[2rem] ml-0 mt-[108px] flex h-full w-full flex-col bg-se-dark text-xs md:text-base lg:ml-[20%] lg:mt-[60px] lg:w-[80%]">
    <header>
      <div class="max-w-screen-xl py-8 mx-auto lg:ml-16 sm:py-12">
        <div class="sm:flex sm:items-center sm:justify-between">
          <div class="text-center sm:text-left">
            <h1 class="text-2xl font-bold text-se-white sm:text-3xl">LogIn 🗿</h1>
            <p class="mt-1.5 text-sm text-se-white">LogIn page</p>
          </div>
          <div class="flex flex-col gap-4 mt-4 sm:mt-0 sm:flex-row sm:items-center"></div>
        </div>
      </div>
    </header>



    <div class="max-w-xl lg:max-w-3xl">
      <div class="relative -mt-16 block lg:hidden">
        <a class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 dark:bg-gray-900 sm:h-20 sm:w-20"
          href="/">

          <svg class="h-8 sm:h-10" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
              fill="currentColor" />
          </svg>

        </a>

      </div>


      <!-- <label
          class="block px-3 py-2 mt-10 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1"
        > -->
      <form action="#" class="lg:ml-16 grid grid-cols-6 gap-6">
        <!-- Username -->
        <div class="col-span-6">
          <label for="AcademicPo"
            class="block px-3 py-2 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1">
            <span class="text-xs font-medium text-se-gray-light"> Username </span>

            <input type="text" placeholder="Insert User name here"
              class="w-full p-0 mt-1 bg-transparent border-none text-se-white focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
          </label>
        </div>

        <!-- Password -->
        <div class="col-span-6">
          <label for="AcademicPo"
            class="block px-3 py-2 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1">
            <span class="text-xs font-medium text-se-gray-light"> Password </span>

            <input type="text" placeholder="Insert Password here"
              class="w-full p-0 mt-1 bg-transparent border-none text-se-white focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
          </label>
        </div>

        <!-- Button -->
        <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button
            class="flex items-center justify-between gap-4 px-5 py-3 transition-colors border border-current rounded-lg group bg-se-black1800 hover:bg-se-color focus:outline-none focus:ring active:bg-se-color-light"
            type="submit">
            <span class="font-medium transition-colors text-se-white"> Submit </span>

            <span
              class="p-2 border border-indigo-600 rounded-full group-active:border-indigo-500 shrink-0 bg-se-black1800">
              <svg class="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>

          <p class="mt-4 text-sm text-gray-500 text-se-white sm:mt-0">
            Don't have an account yet?
            <router-link to="/register" class="text-gray-700 underline text-se-white">Sign Up</router-link>.
          </p>
        </div>
      </form>
    </div>

  </div>
</template>
<style scoped></style>