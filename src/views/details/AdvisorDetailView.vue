<script setup lang="ts">
import type { AdvisorDetail } from '@/type'
import { ref } from 'vue'
import AdvisorService from '@/services/AdvisorService'

const advisor = ref<AdvisorDetail | null>(null)
const props = defineProps({
  id: String
})

console.log(Number(props.id)) //props check

AdvisorService.getAdvisorsById(Number(props.id)).then((response) => {
  advisor.value = response.data
})
</script>

<template>
  <div class="info-pg-bg">

    <p class="label-card">ADVISOR INFO.</p>
    <div v-if="advisor" class="advisor-card">
      <br />
      <br />
      <br />
      <br />
      <p>Name: {{ advisor.first_name }} {{ advisor.last_name }}</p>
      <br />
    </div>
  </div>
</template>

<style scoped>
.advisor {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.advisor-card {
  text-align: center;
  padding: 20px;
  width: 500px;
  height: 400px;
  cursor: pointer;
  margin-bottom: 18px;
  margin-top: 0%;
  margin-left: 32%;
  color: aliceblue;
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  background-color: #f2f2f208;
}

.advisor-link {
  color: #2c3e50;
  text-decoration: none;
}

.info-pg-bg {
  width: 80%;
  height: 100%;
  padding: 20px;
  margin-bottom: 20px;
  position: fixed;
  top: 0%;
  right: 0%;
  background-color: rgb(41, 39, 38);
}

.label-card{
  text-align: center;
  padding: 20px;
  width: 500px;
  height: 60px;
  cursor: pointer;

  /* border: 1px solid #39495c; */
  margin-top: 7%;

  margin-left: 32%;
  color: aliceblue;
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  background-color: #312f2f3a;
}

</style>
