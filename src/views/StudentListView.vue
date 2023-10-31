<script setup lang="ts">
import StudentCard from '../components/StudentCard.vue'
import type { StudentDetail } from '@/type'
import StudentService from '@/services/StudentService'
import { computed, ref, type Ref } from 'vue'
import type { AxiosResponse } from 'axios'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import BaseInput from '@/components/BaseInput.vue'
import { useAuthStore } from '@/stores/auth'

const students: Ref<Array<StudentDetail>> = ref([])
const totalStudents = ref<number>(0)
const advisorId = ref(0)
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
const authStore = useAuthStore()
if (authStore.isTeacher && authStore.user !== null) {
  advisorId.value = authStore.user.id
}

let queryFunction
if (keyword.value === null || keyword.value === '') {
  queryFunction = StudentService.getStudentsAdvisor(advisorId.value, props.limit, props.page)
} else {
  queryFunction = StudentService.getStudentsByKeyword(
    advisorId.value,
    keyword.value,
    props.limit,
    props.page
  )
}
queryFunction
  .then((response: AxiosResponse<StudentDetail[]>) => {
    students.value = response.data
    totalStudents.value = response.headers['x-total-count']
  })
  .catch(() => {
    router.push({ name: 'network-error' })
  })

onBeforeRouteUpdate((to, from, next) => {
  if (authStore.isTeacher && authStore.user !== null) {
    advisorId.value = authStore.user.id
  }
  const toPage = Number(to.query.page)
  let queryFunction
  if (keyword.value === null || keyword.value === '') {
    queryFunction = StudentService.getStudentsAdvisor(advisorId.value, props.limit, toPage)
  } else {
    queryFunction = StudentService.getStudentsByKeyword(
      advisorId.value,
      keyword.value,
      props.limit,
      toPage
    )
  }
  queryFunction
    .then((response: AxiosResponse<StudentDetail[]>) => {
      students.value = response.data
      totalStudents.value = response.headers['x-total-count']
      next()
    })
    .catch(() => {
      next({ name: 'network-error' })
    })
})

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalStudents.value / props.limit)
  return props.page.valueOf() < totalPages
})

function updateKeyword(value: string) {
  if (authStore.isTeacher && authStore.user !== null) {
    advisorId.value = authStore.user.id
  }
  let queryFunction
  if (keyword.value === '') {
    queryFunction = StudentService.getStudentsAdvisor(advisorId.value, props.limit, props.page)
  } else {
    queryFunction = StudentService.getStudentsByKeyword(
      advisorId.value,
      keyword.value,
      props.limit,
      1
    )
  }
  queryFunction
    .then((response: AxiosResponse<StudentDetail[]>) => {
      students.value = response.data
      // console.log('students',students.value)
      totalStudents.value = response.headers['x-total-count']
      // console.log('totalStudents',totalStudents.value)
    })
    .catch(() => {
      router.push({ name: 'network-error' })
    })
}
</script>

<template>
  <div
    class="mb-[2rem] ml-0 mt-[100px] justify-center flex h-full w-full flex-col items-center bg-se-dark text-xs md:text-base lg:ml-[17%] lg:mt-[35px] lg:w-[80%]"
  >
    <div class="flex flex-col items-center">
      <h4
        class="mt-[30px] w-[900px] px-6 py-4 text-center text-sm font-bold uppercase text-se-color-light"
      >
        Student List
      </h4>
    </div>
    <div class="mb-4 w-[60%] items-center">
      <BaseInput
        v-model="keyword"
        placeholder="Search..."
        class="w-full rounded-lg bg-[#35363A] px-4 py-2 text-se-white"
        @input="updateKeyword"
      />
    </div>
    <div class="flex flex-col items-center justify-between w-full mx-auto">
      <div class="w-[90%] lg:h-[34rem] mx-auto">
        <div
          class="flex border-b-2 border-se-gray-light px-[20px] py-[10px] text-left text-se-gray-light"
        >
          <div class="hidden w-[8%] lg:flex"></div>
          <span class="w-1/4 lg:w-1/5">STUDENT ID</span>
          <span class="w-1/4 lg:w-1/5">FIRSTNAME</span>
          <span class="w-1/4 lg:w-1/5">LASTNAME</span>
          <span class="w-1/4 lg:w-1/5">DEPARTMENT</span>
        </div>
        <StudentCard
          v-for="student in students"
          :key="student.id"
          :student="student"
          class="bg-se-color-dark even:bg-se-dark"
        ></StudentCard>
      </div>
      <div class="flex w-[90%]">
        <div class="flex flex-row ml-auto">
          <RouterLink
            :to="{ name: 'studentList', query: { limit: limit, page: page - 1 } }"
            rel="prev"
            id="page-prev"
            :style="[page != 1 ? '' : 'pointer-events: none']"
            :class="[page != 1 ? 'bg-transparent text-se-gray-light' : 'text-transparent']"
            class="w-fit rounded border-2 p-2 text-center text-lg font-medium no-underline transition hover:scale-[1.05] hover:text-se-color-light"
          >
            &lt; Prev Page
          </RouterLink>
          <RouterLink
            :to="{ name: 'studentList', query: { limit: limit, page: page + 1 } }"
            rel="next"
            id="page-next"
            :style="[hasNextPage ? '' : 'pointer-events: none']"
            :class="[hasNextPage ? 'bg-transparent text-se-gray-light' : 'text-transparent']"
            class="ml-4 w-fit rounded border-2 p-2 text-center text-lg font-medium no-underline transition hover:scale-[1.05] hover:text-se-color-light"
          >
            Next Page &gt;
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
