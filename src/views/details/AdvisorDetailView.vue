<script setup lang="ts">
import { useAdvisorStore } from '@/stores/advisor'
import { storeToRefs } from 'pinia'
import { ref } from 'vue';
import BaseInput from '@/components/BaseInput.vue';

const store = useAdvisorStore()
const advisor = storeToRefs(store).advisor
const updating = ref(false)
console.log(advisor.value)
function changeUpdating(){
  if(updating.value){
    updating.value = false;
  } else {
    updating.value = true;
  }
  console.log(updating.value)

}
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
              <span v-if="updating === false" class="w-1/2">{{ advisor.firstname }}</span>
              <BaseInput v-else v-model="advisor.firstname" type="text" class="w-1/2 h-auto text-se-dark"/>
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
          <button :onClick="changeUpdating" class="flex flex-row p-2 ml-auto font-semibold text-se-light-gray hover:text-se-color-light transition hover:scale-[1.05]">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" class="h-4 my-auto mr-2 fill-current">
              <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
            </svg>
            <span>
              Edit
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
