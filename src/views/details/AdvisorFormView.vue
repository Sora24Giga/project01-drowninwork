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
      <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <div class="text-center sm:text-left">
            <h1 class="text-2xl font-bold text-se-white sm:text-3xl">
              Create a registration
            </h1>
            <p class="mt-1.5 text-sm text-se-white">
              Register Advisor Information 🗿
            </p>
          </div>
          <div class="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
          </div>
        </div>
      </div>
    </header>
    <!-- main content -->
    <form @submit.prevent="saveAdvisor">
      <div class="ml-16 mr-64">

        <!-- Academic position -->
        <label for="AcademicPo"
          class="block overflow-hidden mb-8 rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 bg-se-black1800">
          <span class="text-xs font-medium text-se-white">
            Academic Position
          </span>

          <BaseInput v-model="advisor.academicPosition" type="text" placeholder="Insert academic position here"
            class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm text-se-white" />
        </label>
        <!--  -->

        <!-- Name -->
        <label for="AcademicPo"
          class="block overflow-hidden mb-8 rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 bg-se-black1800">
          <span class="text-xs font-medium text-se-white">
            First name
          </span>

          <BaseInput v-model="advisor.firstname" type="text" placeholder="Insert Name here"
            class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm text-se-white" />
        </label>
        <!--  -->

        <!-- Last Name -->
        <label for="AcademicPo"
          class="block overflow-hidden mb-8 rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 bg-se-black1800">
          <span class="text-xs font-medium text-se-white">
            Last name
          </span>

          <BaseInput v-model="advisor.surname" type="text" placeholder="Insert Last name here"
            class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm text-se-white" />
        </label>
        <!--  -->

        <!-- Department -->
        <label for="AcademicPo"
          class="block overflow-hidden mb-8 rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 bg-se-black1800">
          <span class="text-xs font-medium text-se-white">
            Department
          </span>

          <BaseInput v-model="advisor.department" type="text" placeholder="Insert Department here"
            class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm text-se-white" />
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
        <button class="group flex items-center justify-between gap-4 rounded-lg border border-current px-5 py-3 transition-colors hover:bg-se-color focus:outline-none focus:ring active:bg-se-color-light bg-se-black1800"
          type="submit">
          <span class="font-medium transition-colors text-se-white">
            Submit
          </span>

          <span class="shrink-0 rounded-full border border-indigo-600 bg-se-black1800 p-2 group-active:border-indigo-500">
            <svg class="h-5 w-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
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
  color: #f2f2f2;
}

.lines {
  padding-top: 5%;
}

.button {
  align-items: center;
}
</style>