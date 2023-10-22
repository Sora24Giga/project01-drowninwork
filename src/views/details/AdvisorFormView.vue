<script setup lang="ts">
import type { AdvisorDetail } from '@/type'
import { ref } from 'vue'
import AdvisorService from '@/services/AdvisorService';
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import BaseInput from "@/components/BaseInput.vue";
import ImageUpload from '@/components/ImageUpload.vue';

const store = useMessageStore()
const router = useRouter()

function saveAdvisor() {
  AdvisorService.saveAdvisor(advisor.value)
    .then((response) => {
      console.log(response.data)
      router.push({
        name: 'advisorDetail',
        params: { id: response.data.id }
      })
      store.updateMessage('You have successfully added a new advisor for ' + response.data.firstname)
      setTimeout(() => {
        store.restMessage()
      }, 3000)
    }).catch(() => {
      router.push({ name: 'network-error' })
    })
}

const advisor = ref<AdvisorDetail>({
  id: 0,
  academicPosition: "",
  firstname: "",
  surname: "",
  department: "",
  advisee: [],
  images: []
})
</script>


<template>
  <!-- header -->
  <div
    class="text-xs md:text-base mb-[2rem] ml-0 mt-[108px] h-full w-full bg-se-dark lg:ml-[20%] lg:mt-[60px] lg:w-[80%] flex flex-col">
    <header>
      <div class="max-w-screen-xl py-8 mx-auto lg:ml-16 sm:py-12">
        <div class="sm:flex sm:items-center sm:justify-between">
          <div class="text-center sm:text-left">
            <h1 class="text-2xl font-bold text-se-white sm:text-3xl">
              Create a registration
            </h1>
            <p class="mt-1.5 text-sm text-se-white">
              Register Advisor Information 🗿
            </p>
          </div>
          <div class="flex flex-col gap-4 mt-4 sm:mt-0 sm:flex-row sm:items-center">
          </div>
        </div>
      </div>
    </header>
    <!-- main content -->
    <form @submit.prevent="saveAdvisor">
      <div class="lg:ml-16 lg:mr-64 w-[80%] mx-auto">

        <!-- Academic position -->
        <label for="AcademicPo"
          class="block px-3 py-2 mb-8 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 bg-se-black1800">
          <span class="text-xs font-medium text-se-gray-light">
            Academic Position
          </span>

          <BaseInput v-model="advisor.academicPosition" type="text" placeholder="Insert academic position here"
            class="w-full p-0 mt-1 bg-transparent border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm text-se-white" />
        </label>
        <!--  -->

        <!-- Name -->
        <label for="AcademicPo"
          class="block px-3 py-2 mb-8 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 bg-se-black1800">
          <span class="text-xs font-medium text-se-gray-light">
            First name
          </span>

          <BaseInput v-model="advisor.firstname" type="text" placeholder="Insert Name here"
            class="w-full p-0 mt-1 bg-transparent border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm text-se-white" />
        </label>
        <!--  -->

        <!-- Last Name -->
        <label for="AcademicPo"
          class="block px-3 py-2 mb-8 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 bg-se-black1800">
          <span class="text-xs font-medium text-se-gray-light">
            Last name
          </span>

          <BaseInput v-model="advisor.surname" type="text" placeholder="Insert Last name here"
            class="w-full p-0 mt-1 bg-transparent border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm text-se-white" />
        </label>
        <!--  -->

        <!-- Department -->
        <label for="AcademicPo"
          class="block px-3 py-2 mb-8 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 bg-se-black1800">
          <span class="text-xs font-medium text-se-gray-light">
            Department
          </span>

          <BaseInput v-model="advisor.department" type="text" placeholder="Insert Department here"
            class="w-full p-0 mt-1 bg-transparent border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm text-se-white" />
        </label>
        <!--  -->

        <br>
        <div>
          <h2 class="mb-5 text-sm text-se-white">
            Upload Image here
          </h2>
          <ImageUpload v-model="advisor.images" />
          <br>

        </div>

        <!-- button -->
        <button
          class="flex items-center justify-between gap-4 px-5 py-3 transition-colors border border-current rounded-lg group hover:bg-se-color focus:outline-none focus:ring active:bg-se-color-light bg-se-black1800"
          type="submit">
          <span class="font-medium transition-colors text-se-white">
            Submit
          </span>

          <span class="p-2 border border-indigo-600 rounded-full shrink-0 bg-se-black1800 group-active:border-indigo-500">
            <svg class="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
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