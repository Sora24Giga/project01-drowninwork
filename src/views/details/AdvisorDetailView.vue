<script setup lang="ts">
import { useAdvisorStore } from '@/stores/advisor'
import { storeToRefs } from 'pinia'

const store = useAdvisorStore()
const advisor = storeToRefs(store).advisor
</script>

<template>
  <div class="mt-[108px] flex justify-center lg:mt-0">
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
          <div class="flex flex-row flex-wrap justify-center">
            <img v-for="image in advisor.images" :key="image" :src="image" alt="advisors image"
             class="w-40 p-1 m-1 border-2 border-gray-200 border-solid rounded hover:shadow-lg"
            >
          </div>
          <p class="my-2 font-semibold">{{ advisor.firstname }} {{ advisor.surname }}</p>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
