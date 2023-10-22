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
  } else {
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

function updateKeyword(value: string) {
  let queryFunction;
  if (keyword.value === '') {
    queryFunction = AdvisorService.getAdvisors(props.limit, props.page)
  } else {
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
  <div
    class="text-xs md:text-base mb-[2rem] ml-0 mt-[100px] h-full w-full bg-se-dark lg:ml-[20%] lg:mt-[35px] lg:w-[80%] flex flex-col items-center">
    <div class="flex flex-col items-center">
      <h4 class="mt-[30px] w-[900px] px-6 py-4 text-center text-sm font-bold uppercase text-se-color-light">
        Advisor List
      </h4>
    </div>
    <div class="w-[60%] items-center mb-4">
      <BaseInput v-model="keyword" placeholder="Search..." class="w-full px-4 py-2 bg-[#35363A] rounded-lg text-se-white"
        @input="updateKeyword" />
    </div>
    <div class="flex flex-col items-center justify-between w-full">
      <div class="w-[90%] lg:h-[34rem]">
        <div class="flex border-b-2 text-left border-se-gray-light px-[20px] py-[10px] text-se-gray-light">
          <div class="lg:flex hidden w-[8%]"></div>
          <span class="w-1/4 lg:w-1/5">NO. OF ADVISEES</span>
          <span class="w-1/4 lg:w-1/5">FIRSTNAME</span>
          <span class="w-1/4 lg:w-1/5">LASTNAME</span>
          <span class="w-1/4 lg:w-1/5">DEPARTMENT</span>
        </div>
        <AdvisorCard v-for="advisor in advisors" :key="advisor.id" :advisor="advisor"
          class="bg-se-color-dark even:bg-se-dark"></AdvisorCard>
      </div>
      <div class="flex w-[90%]">
        <div class="flex flex-row ml-auto">
          <RouterLink :to="{ name: 'advisors', query: { limit: limit, page: page - 1 } }" rel="prev" id="page-prev"
            :style="[page != 1 ? '' : 'pointer-events: none']"
            :class="[page != 1 ? 'text-se-gray-light bg-transparent' : '']"
            class="w-fit rounded border-2 p-2 text-center text-lg font-medium no-underline transition hover:scale-[1.05] hover:text-se-color-light">
            &lt; Prev Page
          </RouterLink>
          <RouterLink :to="{ name: 'advisors', query: { limit: limit, page: page + 1 } }" rel="next" id="page-next"
            :style="[hasNextPage ? '' : 'pointer-events: none']"
            :class="[hasNextPage ? 'text-se-gray-light bg-transparent' : '']"
            class="ml-4 w-fit rounded border-2 p-2 text-center text-lg font-medium no-underline transition hover:scale-[1.05] hover:text-se-color-light">
            Next Page &gt;
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
