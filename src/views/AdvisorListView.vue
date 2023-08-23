<script setup lang="ts">
import AdvisorCard from '../components/AdvisorCard.vue'
import type { AdvisorDetail } from '@/type'
import AdvisorService from '@/services/AdvisorService'
import { computed, ref, type Ref } from 'vue'
import type { AxiosResponse } from 'axios'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'

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
  AdvisorService.getAdvisors(props.limit, toPage)
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
</script>

<template>
  <div class="mb-[2rem] ml-0 mt-[80px] h-full w-full bg-se-dark lg:ml-[20%] lg:mt-0 lg:w-[80%]">
    <div class="flex flex-col items-center">
      <h4
        class="mt-[30px] w-[900px] px-6 py-4 text-center text-sm font-bold uppercase text-se-color-light"
      >
        Advisor List
      </h4>
    </div>

    <div class="flex min-h-[32rem] flex-col items-center justify-between">
      <div class="flex h-full w-full flex-col items-center">
        <AdvisorCard
          v-for="advisor in advisors"
          :key="advisor.id"
          :advisor="advisor"
          class="bg-se-gray even:bg-se-dark"
        ></AdvisorCard>
      </div>
      <div class="flex w-fit">
        <RouterLink
          :to="{ name: 'advisors', query: { limit: limit, page: page - 1 } }"
          rel="prev"
          v-if="page != 1"
          id="page-prev"
          class="flex-1 text-left text-lg font-medium text-se-light-gray no-underline hover:text-se-color-light"
        >
          Prev Page
        </RouterLink>
        <RouterLink
          :to="{ name: 'advisors', query: { limit: limit, page: page + 1 } }"
          rel="next"
          v-if="hasNextPage"
          id="page-next"
          class="flex-1 text-left text-lg font-medium text-se-light-gray no-underline hover:text-se-color-light"
        >
          Next Page
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style></style>
