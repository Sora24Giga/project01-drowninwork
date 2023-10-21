<script setup lang="ts">
import type {AdvisorDetail} from '@/type'
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
  <div class="text-xs md:text-base mb-[2rem] ml-0 mt-[108px] h-full w-full bg-se-dark lg:ml-[20%] lg:mt-[60px] lg:w-[80%] flex flex-col">
    <h1>Create a registration</h1>
    <form @submit.prevent="saveAdvisor" >
      <div>
        <h3>Register Advisor Information</h3>
        <div>
          <BaseInput v-model="advisor.academicPosition" type="text" label="Academic Position"/>
        </div>
        <div>
          <BaseInput v-model="advisor.firstname" type="text" label="First Name"/>
        </div>
        <div>
          <BaseInput v-model="advisor.surname" type="text" label="Last Name"/>
        </div>
        <div>
          <BaseInput v-model="advisor.department" type="text" label="Department"/>
        </div>
        <br>
        <div>
          <label>Upload Profile Picture</label>
        <ImageUpload v-model="advisor.images" class="px-4"/>
          <br>
        <button type="submit" class="px-4 py-1 pt-1 font-bold text-green-700 bg-transparent border border-green-700 rounded hover:bg-green-800 hover:text-white">Submit</button>
        </div>
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