<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import type { AdvisorDetail } from '@/type'
import { useMessageStore } from '@/stores/message'
import { useAdvisorStore } from '@/stores/advisor'
import BaseInput from '@/components/BaseInput.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import AdvisorService from "@/services/AdvisorService";

const updating = ref(false)
const router = useRouter()
const store = useAdvisorStore()
const msgStore = useMessageStore()
const advisor = storeToRefs(store).advisor
const advisorUpdated = ref<AdvisorDetail>({
  academicPosition: '',
  advisee: [],
  images: [],
  id: 0,
  studentId: '',
  firstname: '',
  surname: '',
  department: '',
  roles: []
})

function changeUpdating() {
  if (updating.value) {
    updating.value = false
  } else {
    updating.value = true
  }
  console.log(updating.value)
}
function updateInfo(){
  if(advisor.value !== null){
    const newVal = advisorUpdated.value
    const oldVal = advisor.value
    newVal.id = oldVal.id
    newVal.advisee = oldVal.advisee
    if(newVal.academicPosition===''){
      newVal.academicPosition = oldVal.academicPosition
    }
    if(newVal.firstname===''){
      newVal.firstname = oldVal.firstname
    }
    if(newVal.surname===''){
      newVal.surname = oldVal.surname
    }
    if(newVal.department===''){
      newVal.department = oldVal.department
    }
    if(newVal.images.length===0){
      newVal.images = oldVal.images
    }
    AdvisorService.saveAdvisor(advisorUpdated.value)
    .then((response) => {
      console.log(response.data)
      router.go(0)
      msgStore.updateMessage('You have successfully update ' + response.data.firstname)
      setTimeout(() => {
        msgStore.restMessage()
      }, 3000)
    }).catch(() => {
      router.push({ name: 'network-error' })
    })
  }
}
</script>

<template>
  <div class="mt-[138px] flex justify-center lg:mt-[80px]">
    <div class="mb-[20px] w-full flex h-full justify-center bg-se-dark lg:ml-[20%]">
      <div class="flex w-[90%] lg:w-[60%] min-w-[216px] max-w-[500px] flex-col justify-center">
        <p
          class="h-[60px] w-full self-center bg-[#312f2f3a] py-[15px] text-center font-medium text-se-gray-light shadow-[0_3px_12px_0_rgba(0,0,0,0.2)]">
          ADVISOR INFO
        </p>
        <div v-if="advisor"
          class="mb-[18px] mt-0 w-full bg-[#f2f2f208] p-[20px] text-center text-se-gray-light shadow-[0_3px_12px_0_rgba(0,0,0,0.2)]">
          <span class="text-xl font-semibold">{{ advisor.firstname.toLocaleUpperCase() }}
            {{ advisor.surname.toLocaleUpperCase() }}</span>
          <div class="flex flex-row flex-wrap justify-center mt-6 mb-8">
            <div v-if="advisor.images.length !== 0">
              <img v-for="image in advisor.images" :key="image" :src="image" alt="advisors image"
                class="border-gray-200 m-1 w-40 rounded-[50%] border-2 border-solid p-1 hover:shadow-lg" />
            </div>
            <div v-else
              class="relative inline-flex items-center justify-center w-32 h-32 overflow-hidden rounded-full bg-se-color-light">
              <span class="text-5xl font-semibold text-se-white">
                {{ advisor.firstname.charAt(0).toLocaleUpperCase()
                }}{{ advisor.surname.charAt(0).toLocaleUpperCase() }}
              </span>
            </div>
          </div>
          <div class="mx-auto w-[80%] border-t-2 border-se-gray-light pt-4 text-left">
            <form @submit.prevent="updateInfo">
              <div class="flex flex-col w-full mb-1 justify-evenly sm:flex-row">
                <span class="font-semibold sm:w-1/2">First Name:</span>
                <span v-if="updating === false" class="sm:w-1/2">{{ advisor.firstname }}</span>
                <BaseInput v-else type="text" :placeholder="advisor.firstname" v-model="advisorUpdated.firstname"
                  class="h-auto mb-1 rounded sm:w-1/2 text-se-dark" />
              </div>
              <div class="flex flex-col w-full mb-1 justify-evenly sm:flex-row">
                <span class="font-semibold sm:w-1/2">Last Name:</span>
                <span v-if="updating === false" class="sm:w-1/2">{{ advisor.surname }}</span>
                <BaseInput v-else type="text" :placeholder="advisor.surname" v-model="advisorUpdated.surname"
                  class="h-auto mb-1 rounded sm:w-1/2 text-se-dark" />
              </div>
              <div class="flex flex-col w-full mb-1 justify-evenly sm:flex-row">
                <span class="font-semibold sm:w-1/2">Academic Position:</span>
                <span v-if="updating === false" class="sm:w-1/2">{{ advisor.academicPosition }}</span>
                <BaseInput v-else type="text" :placeholder="advisor.academicPosition" v-model="advisorUpdated.academicPosition"
                  class="h-auto mb-1 rounded sm:w-1/2 text-se-dark" />
              </div>
              <div class="flex flex-col w-full mb-1 justify-evenly sm:flex-row">
                <span class="font-semibold sm:w-1/2">Department:</span>
                <span v-if="updating === false" class="sm:w-1/2">{{ advisor.department }}</span>
                <BaseInput v-else type="text" :placeholder="advisor.department" v-model="advisorUpdated.department"
                  class="h-auto mb-1 rounded sm:w-1/2 text-se-dark" />
              </div>
              <span class="font-semibold" v-if="updating">Image:</span>
              <ImageUpload v-if="updating" v-model="advisorUpdated.images" class="mb-4" />
              <button v-if="updating"
                class="transition hover:scale-[1.05] flex items-center justify-between gap-4 px-5 py-3 ml-auto border border-current rounded-lg group bg-se-black1800 hover:bg-se-color focus:outline-none focus:ring active:bg-se-color-light"
                type="submit">
                <span class="font-medium transition-colors text-se-white"> Update </span>

                <span
                  class="p-2 border border-indigo-600 rounded-full group-active:border-indigo-500 shrink-0 bg-se-black1800">
                  <svg class="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </form>
          </div>
          <br />
          <button :onClick="changeUpdating"
            class="ml-auto flex flex-row p-2 font-semibold text-se-gray-light transition hover:scale-[1.05] hover:text-se-color-light">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"
              class="h-4 my-auto mr-2 fill-current">
              <path
                d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
            </svg>
            <span v-if="updating"> Stop Editing </span>
            <span v-else> Edit </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
