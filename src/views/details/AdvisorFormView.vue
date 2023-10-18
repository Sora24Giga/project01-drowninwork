<script setup lang="ts">
import type {AdvisorReg} from '@/type'
import { ref } from 'vue'
import AdvisorService from '@/services/AdvisorService';
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import BaseInput from "@/components/BaseInput.vue";
//TEST Commit

const store = useMessageStore()

const router = useRouter()


let boolean = true

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

const advisor = ref<AdvisorReg>({
  id: 0,
  academicPosition: "",
  firstname: "",
  surname: "",
  department: ""
})
</script>


<template>
  <div>
    <h1>Create a registration</h1>
    <form @submit.prevent="saveAdvisor" >
      <div class="box">
        <h3>Register Advisor Information</h3>
        <div class="lines">
          <BaseInput v-model="advisor.academicPosition" type="text" label="Academic Position"/>
        </div>
        <div class="lines">
          <BaseInput v-model="advisor.firstname" type="text" label="First Name"/>
        </div>
        <div class="lines">
          <BaseInput v-model="advisor.surname" type="text" label="Last Name"/>
        </div>
        <div class="lines">
          <BaseInput v-model="advisor.department" type="text" label="Department"/>
        </div>


        <button type="submit" class="px-4 py-1 pt-1 font-bold text-green-700 bg-transparent border border-green-700 rounded hover:bg-green-800 hover:text-white">Submit</button>
        <!--      <pre>{{advisor}}</pre>-->
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