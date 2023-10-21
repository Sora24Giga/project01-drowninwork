<script setup lang="ts">
import { useAdvisorStore } from '@/stores/advisor'
import { storeToRefs } from 'pinia'

const store = useAdvisorStore()
const advisor = storeToRefs(store).advisor
</script>

<template>
  <div class="mt-[108px] flex justify-center lg:mt-[60px]">
    <div class="mb-[20px] flex h-full w-[80%] justify-center bg-se-dark p-[20px] lg:ml-[20%]">
      <div class="flex w-[60%] min-w-[216px] max-w-[500px] flex-col justify-center">
        <p
          class="h-[60px] w-full self-center bg-[#312f2f3a] py-[15px] text-center font-medium text-se-light-gray shadow-[0_3px_12px_0_rgba(0,0,0,0.2)]"
        >
          ADVISOR INFO
        </p>
        <div
          v-if="advisor"
          class="mb-[18px] mt-0 w-full bg-[#f2f2f208] p-[20px] text-center text-se-light-gray shadow-[0_3px_12px_0_rgba(0,0,0,0.2)]"
        >
          <span class="text-xl font-semibold">{{ advisor.firstname.toLocaleUpperCase() }} {{ advisor.surname.toLocaleUpperCase() }}</span>
          <div class="flex flex-row flex-wrap justify-center mt-6 mb-8">
            <div v-if="advisor.images.length !== 0">
              <img v-for="image in advisor.images" :key="image" :src="image" alt="advisors image"
                class="w-40 p-1 m-1 border-2 border-gray-200 border-solid rounded-[50%] hover:shadow-lg"
              >
            </div>
            <div v-else class="relative inline-flex items-center justify-center w-32 h-32 overflow-hidden rounded-full bg-se-color-light">
              <span class="text-5xl font-semibold text-se-white">
                {{ advisor.firstname.charAt(0).toLocaleUpperCase() }}{{ advisor.surname.charAt(0).toLocaleUpperCase() }}
              </span>
            </div>
          </div>
          <div class="w-[80%] mx-auto pt-4 border-t-2 border-se-light-gray text-left">
            <div class="flex w-full justify-evenly">
              <span class="w-1/2 font-semibold">First Name:</span>
              <span class="w-1/2">{{ advisor.firstname }}</span>
            </div>
            <div class="flex w-full justify-evenly">
              <span class="w-1/2 font-semibold">Last Name:</span>
              <span class="w-1/2">{{ advisor.surname }}</span>
            </div>
            <div class="flex w-full justify-evenly">
              <span class="w-1/2 font-semibold">Academic Position:</span>
              <span class="w-1/2">{{ advisor.academicPosition }}</span>
            </div>
            <div class="flex w-full justify-evenly">
              <span class="w-1/2 font-semibold">Department:</span>
              <span class="w-1/2">{{ advisor.department }}</span>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
