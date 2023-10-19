<script setup lang="ts">
import AdvisorCard from '../components/AdvisorCard.vue'
import type { AdvisorDetail } from '@/type'
import AdvisorService from '@/services/AdvisorService'
import { computed, ref, type Ref } from 'vue'
import type { AxiosResponse } from 'axios'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import BaseInput from '@/components/BaseInput.vue'

const advisors: Ref<Array<AdvisorDetail>> = ref([])
const totalAdvisors = ref<number>(0)
const props = defineProps({
  limit: {
    type: Number,
    required: true
  },
  page: {
    type: Number,
    required: true
  }
})

const router = useRouter()
const keyword = ref('')

// eslint-disable-next-line vue/no-setup-props-destructure
AdvisorService.getAdvisors(props.limit, props.page)
  .then((response: AxiosResponse<AdvisorDetail[]>) => {
    advisors.value = response.data
    totalAdvisors.value = response.headers['x-total-count']
  })
  .catch(() => {
    router.push({ name: 'network-error' })
  })

onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  // eslint-disable-next-line vue/no-setup-props-destructure
  let queryFunction;
  if (keyword.value === null || keyword.value === '') {
	  queryFunction = AdvisorService.getAdvisors(props.limit, toPage)
	}else{
    queryFunction = AdvisorService.getAdvisorsByKeyword(keyword.value, props.limit, toPage)
  } 
  queryFunction
    .then((response: AxiosResponse<AdvisorDetail[]>) => {
      advisors.value = response.data
      totalAdvisors.value = response.headers['x-total-count']
      next()
    })
    .catch(() => {
      next({ name: 'network-error' })
    })
})

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalAdvisors.value / props.limit)
  return props.page.valueOf() < totalPages
})

function updateKeyword (value: string) {
  let queryFunction;
  if (keyword.value === ''){
    queryFunction = AdvisorService.getAdvisors(props.limit, props.page)
  }else {
    queryFunction = AdvisorService.getAdvisorsByKeyword(keyword.value, props.limit, 1)
  }
  queryFunction.then((response: AxiosResponse<AdvisorDetail[]>) => {
    advisors.value = response.data
    // console.log('students',students.value)
    totalAdvisors.value = response.headers['x-total-count']
    // console.log('totalStudents',totalStudents.value)
  }).catch(() => {
    router.push({ name: 'NetworkError' })
  })
}
</script>

<template>
  <div class="mb-[2rem] ml-0 mt-[80px] h-full w-full bg-se-dark lg:ml-[20%] lg:mt-[35px] lg:w-[80%] flex flex-col items-center">
    <div class="flex flex-col items-center">
      <h4
        class="mt-[30px] w-[900px] px-6 py-4 text-center text-sm font-bold uppercase text-se-color-light"
      >
        Advisor List
      </h4>
    </div>
    <div class="w-[60%] items-center mb-4">
      <BaseInput
        v-model="keyword"
        placeholder="Search..."
        class="w-full px-4 py-2 bg-[#35363A] rounded-lg text-se-white"
        @input="updateKeyword"
      />
    </div>
    <div class="flex min-h-[32rem] justify-between flex-col w-full items-center">
      <div class="w-[90%]">
        <div class="flex border-b-2 text-left border-se-light-gray px-[20px] py-[10px] text-se-light-gray">
          <span class="w-1/4">NO. OF ADVISEES</span>
          <span class="w-1/4">FIRSTNAME</span>
          <span class="w-1/4">LASTNAME</span>
          <span class="w-1/4">DEPARTMENT</span>
        </div>
        <AdvisorCard
          v-for="advisor in advisors"
          :key="advisor.id"
          :advisor="advisor"
          class="bg-se-gray even:bg-se-dark"
        ></AdvisorCard>
      </div>
      <div class="flex justify-between w-[90%]">
        <RouterLink
          :to="{ name: 'advisors', query: { limit: limit, page: page - 1 } }"
          rel="prev"
          v-if="page != 1"
          id="page-prev"
          class="text-lg font-medium text-center no-underline w-fit text-se-light-gray hover:text-se-color-light"
        >
          Prev Page
        </RouterLink>
        <RouterLink
          :to="{ name: 'advisors', query: { limit: limit, page: page + 1 } }"
          rel="next"
          v-if="hasNextPage"
          id="page-next"
          class="text-lg font-medium text-center no-underline w-fit text-se-light-gray hover:text-se-color-light"
        >
          Next Page
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style></style>
