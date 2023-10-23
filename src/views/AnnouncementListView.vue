<script setup lang="ts">
import { type Ref, ref, computed } from 'vue'
import type { Announcement } from '@/type'
import { onBeforeRouteUpdate, useRouter } from 'vue-router';
import AnnService from '@/services/AnnService';
import AnnCard from '@/components/AnnCard.vue'
import type { AxiosResponse } from 'axios';

const router = useRouter()
const anns: Ref<Array<Announcement>> = ref([])
const totalAnns = ref<number>(0)
const keyword = ref<number>(0)
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
AnnService.getAnnouncements(props.limit, props.page)
  .then((response: AxiosResponse<Announcement[]>) => {
    anns.value = response.data
    totalAnns.value = response.headers['x-total-cound']
  }).catch(() => {
    router.push({ name: 'network-error' })
  })

onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  // eslint-disable-next-line vue/no-setup-props-destructure
  let queryFunction;
  if (keyword.value === null || keyword.value === 0) {
    queryFunction = AnnService.getAnnouncements(props.limit, toPage)
  } else {
    queryFunction = AnnService.getAnnouncementsByKeyword(keyword.value, props.limit, toPage)
  }
  queryFunction
    .then((response: AxiosResponse<Announcement[]>) => {
      anns.value = response.data
      totalAnns.value = response.headers['x-total-count']
      next()
    })
    .catch(() => {
      next({ name: 'network-error' })
    })
})

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalAnns.value / props.limit)
  return props.page.valueOf() < totalPages
})

function updateKeyword(value: string) {
  let queryFunction;
  if (keyword.value === 0) {
    queryFunction = AnnService.getAnnouncements(props.limit, props.page)
  } else {
    queryFunction = AnnService.getAnnouncementsByKeyword(keyword.value, props.limit, 1)
  }
  queryFunction.then((response: AxiosResponse<Announcement[]>) => {
    anns.value = response.data
    totalAnns.value = response.headers['x-total-count']
  }).catch(() => {
    router.push({ name: 'network-error' })
  })
}
</script>

<template>
  <div
    class="mb-[2rem] ml-0 mt-[108px] flex h-full w-full flex-col bg-se-dark text-xs md:text-base lg:ml-[20%] lg:mt-[60px] lg:w-[80%]"
  >
    <header>
      <div class="max-w-screen-xl py-8 mx-auto sm:py-12 lg:ml-16">
        <div class="sm:flex sm:items-center sm:justify-between">
          <div class="text-center sm:text-left">
            <h1 class="text-2xl font-bold text-se-white sm:text-3xl">Announcement 📣</h1>
            <p class="text-se-gray-light mt-1.5 text-sm brightness-90">All Announcement</p>
          </div>
          <div class="flex flex-col gap-4 mt-4 sm:mt-0 sm:flex-row sm:items-center"></div>
        </div>
      </div>
    </header>

    <!-- Blog -->
    <div class="ml-16 mr-16">
      <AnnCard
        v-for="ann in anns"
        :key="ann.id"
        :ann="ann"
      />
    </div>
  </div>
</template>
