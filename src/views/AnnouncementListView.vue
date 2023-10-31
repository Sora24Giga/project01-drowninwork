<script setup lang="ts">
import { type Ref, ref, computed } from 'vue'
import type { Announcement } from '@/type'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import AnnService from '@/services/AnnService'
import AnnCard from '@/components/AnnCard.vue'
import type { AxiosResponse } from 'axios'
import { useAuthStore } from '@/stores/auth'
import StudentService from '@/services/StudentService'

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
const authStore = useAuthStore()

if (authStore.user !== null) {
  if (authStore.isStudent) {
    StudentService.getStudentsById(authStore.user?.id)
      .then((response) => {
        keyword.value = response.data.advisor.id
        let queryFunction
        if (keyword.value === null || keyword.value === 0) {
          queryFunction = AnnService.getAnnouncements(props.limit, props.page)
        } else {
          queryFunction = AnnService.getAnnouncementsByKeyword(
            keyword.value,
            props.limit,
            props.page
          )
        }
        queryFunction
          .then((response: AxiosResponse<Announcement[]>) => {
            anns.value = response.data
            totalAnns.value = response.headers['x-total-count']
          })
          .catch(() => {
            router.push({ name: 'network-error' })
          })
      })
      .catch((err) => {
        console.log(err)
      })
  } else if (authStore.isTeacher) {
    keyword.value = authStore.user.id
    let queryFunction
    if (keyword.value === null || keyword.value === 0) {
      queryFunction = AnnService.getAnnouncements(props.limit, props.page)
    } else {
      queryFunction = AnnService.getAnnouncementsByKeyword(keyword.value, props.limit, props.page)
    }
    queryFunction
      .then((response: AxiosResponse<Announcement[]>) => {
        anns.value = response.data
        totalAnns.value = response.headers['x-total-count']
      })
      .catch(() => {
        router.push({ name: 'network-error' })
      })
  }
}

onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  // eslint-disable-next-line vue/no-setup-props-destructure
  let queryFunction
  if (authStore.user !== null) {
    if (authStore.isStudent) {
      StudentService.getStudentsById(authStore.user?.id)
        .then((response) => {
          keyword.value = response.data.advisor.id
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
        .catch((err) => {
          console.log(err)
        })
    } else if (authStore.isTeacher) {
      keyword.value = authStore.user.id
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
    }
  }
})

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalAnns.value / props.limit)
  return props.page.valueOf() < totalPages
})

function updateKeyword(value: string) {
  let queryFunction
  if (keyword.value === 0) {
    queryFunction = AnnService.getAnnouncements(props.limit, props.page)
  } else {
    queryFunction = AnnService.getAnnouncementsByKeyword(keyword.value, props.limit, 1)
  }
  queryFunction
    .then((response: AxiosResponse<Announcement[]>) => {
      anns.value = response.data
      totalAnns.value = response.headers['x-total-count']
    })
    .catch(() => {
      router.push({ name: 'network-error' })
    })
}
console.log('keyword ')
console.log(keyword.value)
</script>

<template>
  <div
    class="mb-[2rem] ml-0 mt-[108px] flex h-full flex-col bg-se-dark text-xs md:text-base lg:ml-[17%] lg:mt-[60px]"
  >
    <header>
      <div class="max-w-screen-xl py-8 mx-auto sm:py-12 lg:ml-16">
        <div class="sm:flex sm:items-center sm:justify-between">
          <div class="text-center sm:text-left">
            <h1 class="text-2xl font-bold text-se-white sm:text-3xl">Announcement 📣</h1>
            <p class="mt-1.5 text-sm text-se-gray-light brightness-90">All Announcement</p>
          </div>
          <div class="flex flex-col gap-4 mt-4 sm:mt-0 sm:flex-row sm:items-center"></div>
        </div>
      </div>
    </header>

    <!-- Blog -->
    <div class="mx-auto max-w-[90%]">
      <div class="flex flex-row mb-10 ml-auto" v-if="page != 1 || hasNextPage">
        <RouterLink
          :to="{ name: 'announcement', query: { limit: limit, page: page - 1 } }"
          rel="prev"
          id="page-prev"
          :style="[page != 1 ? '' : 'pointer-events: none']"
          :class="[page != 1 ? 'bg-transparent text-se-gray-light' : 'text-transparent']"
          class="w-fit rounded border-2 p-2 text-center text-lg font-medium no-underline transition hover:scale-[1.05] hover:text-se-color-light"
        >
          &lt; Prev Page
        </RouterLink>
        <RouterLink
          :to="{ name: 'announcement', query: { limit: limit, page: page + 1 } }"
          rel="next"
          id="page-next"
          :style="[hasNextPage ? '' : 'pointer-events: none']"
          :class="[hasNextPage ? 'bg-transparent text-se-gray-light' : 'text-transparent']"
          class="ml-4 w-fit rounded border-2 p-2 text-center text-lg font-medium no-underline transition hover:scale-[1.05] hover:text-se-color-light"
        >
          Next Page &gt;
        </RouterLink>
      </div>
      <AnnCard v-for="ann in anns" :key="ann.id" :ann="ann" />
    </div>
  </div>
</template>
