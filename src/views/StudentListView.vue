<script setup lang="ts">
import StudentCard from '../components/StudentCard.vue'
import type { StudentDetail } from '@/type'
import StudentService from '@/services/StudentService'
import { computed, ref, type Ref } from 'vue'
import type { AxiosResponse } from 'axios'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import BaseInput from '@/components/BaseInput.vue'

const students: Ref<Array<StudentDetail>> = ref([])
const totalStudents = ref<number>(0)
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
StudentService.getStudents(props.limit, props.page)
  .then((response: AxiosResponse<StudentDetail[]>) => {
    students.value = response.data
    totalStudents.value = response.headers['x-total-count']
  })
  .catch(() => {
    router.push({ name: 'network-error' })
  })

onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  let queryFunction;
  if (keyword.value === null || keyword.value === '') {
	  queryFunction = StudentService.getStudents(props.limit, toPage)
	}else{
    queryFunction = StudentService.getStudentsByKeyword(keyword.value, props.limit, toPage)
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

function updateKeyword (value: string) {
  let queryFunction;
  if (keyword.value === ''){
    queryFunction = StudentService.getStudents(props.limit, props.page)
  }else {
    queryFunction = StudentService.getStudentsByKeyword(keyword.value, props.limit, 1)
  }
  queryFunction.then((response: AxiosResponse<StudentDetail[]>) => {
    students.value = response.data
    // console.log('students',students.value)
    totalStudents.value = response.headers['x-total-count']
    // console.log('totalStudents',totalStudents.value)
  }).catch(() => {
    router.push({ name: 'NetworkError' })
  })
}
</script>

<template>
  <div class="text-xs md:text-base mb-[2rem] ml-0 mt-[100px] h-full w-full bg-se-dark lg:ml-[20%] lg:mt-[35px] lg:w-[80%] flex flex-col items-center">
    <div class="flex flex-col items-center">
      <h4
        class="mt-[30px] w-[900px] px-6 py-4 text-center text-sm font-bold uppercase text-se-color-light"
      >
        Student List
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
          <span class="w-1/4">ID</span>
          <span class="w-1/4">FIRSTNAME</span>
          <span class="w-1/4">LASTNAME</span>
          <span class="w-1/4">DEPARTMENT</span>
        </div>
        <StudentCard
          v-for="student in students"
          :key="student.id"
          :student="student"
          class="bg-se-gray even:bg-se-dark"
        ></StudentCard>
      </div>
      <div class="flex justify-between w-[90%]">
        <RouterLink
          :to="{ name: 'studentList', query: { limit: limit, page: page - 1 } }"
          rel="prev"
          v-if="page != 1"
          id="page-prev"
          class="text-lg font-medium text-center no-underline w-fit text-se-light-gray hover:text-se-color-light"
        >
          Prev Page
        </RouterLink>
        <div></div>
        <RouterLink
          :to="{ name: 'studentList', query: { limit: limit, page: page + 1 } }"
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
