<script setup lang="ts">
//http.cors(withDefaults()); have to be added to SecurityConfig.java
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
import {ref} from 'vue'
import {useField, useForm} from "vee-validate";
import {useAuthStore} from "@/stores/auth";

const authStore = useAuthStore()
const validationSchema = yup.object({
  // email: yup.string().required('The email is required').email(6,'Input must be an email.'),
  // password: yup.string().required('The password is required').min(6,'The password must be at least 6 characters.')
  email: yup.string().required('The email is required'),
  password: yup.string().required('The password is required')
})
const {errors, handleSubmit} = useForm({
  validationSchema,
  initialValues: {
    email: '',
    password: ''
  }
})

const {value: email} = useField<string> ('email')
const {value: password} = useField<string> ('password')
// const onSubmit = handleSubmit((values) => {
//   console.log(values)
const onSubmit = handleSubmit((values) => {
  authStore.login(values.email, values.password)
      .then(()=> {
        console.log('login success')
      }).catch((err) => {
        console.log('error', err)
  })
})
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto h-10 w-auto"
    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
    <h2 class="mt-10 text-se-white text-center text-2x1 font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
<!--      <form class="space-y-6" action="#" method="POST">-->
      <form class="space-y-6" @submit.prevent="onSubmit">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
<!--          <div class="mt-2">-->
<!--            <input id="email" name="email" type="email" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />-->
<!--          </div>-->
<!--        <InputText type="email" v-model="email" :error="errors['email']"></InputText>-->
          <InputText type="text" v-model="email" :error="errors['email']"></InputText>
        </div>
        <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="text-sm">
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500 text-se-white">Forgot password?</a>
          </div>
        </div>
<!--        <div class="mt-2">-->
<!--          <input id="password" name="password" type="password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />-->
<!--        </div>-->
          <InputText type="password" v-model="password" :error="errors['password']"></InputText>
        </div>
        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-se-white font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>
      <p class="mt-10 text-center text-se-white text-sm text-gray-500">
        Not a Member?
        {{' '}}
        <a href="#" class="font-semibold text-se-white leading-6 text-indigo-600 hover:text-indigo-500">Try to register here</a>
      </p>

    </div>

  </div>
</template>
<style scoped>

</style>