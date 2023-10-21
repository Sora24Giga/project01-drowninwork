<script setup lang="ts">
import { useStudentStore } from '@/stores/student'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const store = useStudentStore()
const student = storeToRefs(store).student
let comments = ref(store.getComment(student.value.id))
const inputComment = ref('')
function testReview() {
  if (inputComment.value !== '') {
    store.addComment(student.value?.id, inputComment.value)
    comments.value = store.getComment(student.value.id)
    console.log(store.studentList)
  }
}
</script>

<template>
  <div class="student-box mt-[108px] flex justify-center lg:mt-[60px]">
    <div class="mb-[20px] flex h-full w-[80%] justify-center bg-se-dark p-[20px] lg:ml-[20%]">
      <div class="flex w-[60%] min-w-[216px] max-w-[500px] flex-col justify-center">
        <p
          class="h-[60px] w-full self-center bg-[#312f2f3a] py-[15px] text-center font-medium text-se-light-gray shadow-[0_3px_12px_0_rgba(0,0,0,0.2)]"
        >
          STUDENT INFO
        </p>
        <div
          v-if="student"
          class="mb-[18px] mt-0 w-full bg-[#f2f2f208] p-[20px] text-center text-se-light-gray shadow-[0_3px_12px_0_rgba(0,0,0,0.2)]"
        >
          <div class="mx-auto mt-4 mb-8 overflow-hidden rounded-full w-fit">
            <div class="flex flex-row flex-wrap justify-center">
              <div v-if="student.images.length !== 0">
                <img v-for="image in student.images" :key="image" :src="image" alt="advisors image"
                  class="w-40 p-1 m-1 border-2 border-gray-200 border-solid hover:shadow-lg"
                >
              </div>
              <div v-else class="relative inline-flex items-center justify-center w-32 h-32 overflow-hidden bg-se-light-gray">
                <span class="text-5xl font-semibold text-se-dark">
                  {{ student.firstname.charAt(0).toLocaleUpperCase() }}{{ student.surname.charAt(0).toLocaleUpperCase() }}
                </span>
              </div>
            </div>
          </div>
          <p class="mb-2 font-semibold">{{ student.firstname }} {{ student.surname }}</p>
          <p>Student ID: {{ student.studentId }}</p>
          <p>Department: {{ student.department }}</p>
          <br />
        </div>
        <RouterLink
          :to="{ name: 'advisorDetail', params: { id: student?.advisor.id } }"
          class="h-[50px] w-full bg-[#f2f2f208] px-[20px] py-[10px] text-center font-medium text-se-light-gray shadow-[0_3px_12px_0_rgba(0,0,0,0.2)] transition hover:scale-[1.01] hover:text-se-color-light"
          >Advisor: {{ student?.advisor.firstname }} {{ student?.advisor.surname }}</RouterLink
        >
        <p
          class="h-[50px] w-full bg-[#312f2f3a] px-[20px] py-[10px] text-center text-se-light-gray shadow-[0_3px_12px_0_rgba(0,0,0,0.2)]"
        >
          Advisor's Comment
        </p>
        <textarea
          id="commentTextArea"
          v-model="inputComment"
          placeholder="Add a comment here."
          class="mt-0 h-[200px] w-full border-2 border-solid border-se-light-gray bg-[#f2f2f208] p-[20px] text-se-light-gray shadow-[0_3px_12px_0_rgba(0,0,0,0.2)] focus:animate-pulse focus:text-se-white"
        ></textarea>
        <button
          @click="testReview"
          class="mt-1 w-[70%] self-center bg-se-color text-se-light-gray transition hover:scale-[1.01] hover:bg-se-color-light hover:text-se-white"
        >
          Add
        </button>
        <div class="mt-1 w-full text-se-light-gray shadow-[0_3px_12px_0_rgba(0,0,0,0.2)]">
          <div
            :key="comment"
            v-for="comment in comments"
            :comment="comment"
            class="mb-2 bg-[#f2f2f208] p-[20px]"
          >
            <p>{{ comment }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
