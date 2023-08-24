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
    console.log(store.getComment(student.value.id))
  }
}
</script>

<template>
  <div class="student-box mt-[108px] flex justify-center lg:mt-0">
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
          <div class="mx-auto my-4 w-fit overflow-hidden rounded-[50%]">
            <img :src="student.img" class="h-44 object-contain" />
          </div>
          <p class="mb-2 font-semibold">{{ student.first_name }} {{ student.last_name }}</p>
          <p>Student ID: {{ student.sid }}</p>
          <p>Course: {{ student.course }}</p>
          <br />
        </div>
        <RouterLink
          :to="{ name: 'advisorDetail', params: { id: student?.advisorID } }"
          class="h-[50px] w-full bg-[#f2f2f208] px-[20px] py-[10px] text-center font-medium text-se-light-gray shadow-[0_3px_12px_0_rgba(0,0,0,0.2)] transition hover:scale-[1.05] hover:text-se-color-light"
          >Advisor: {{ student?.advisor }}</RouterLink
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
          class="mt-1 w-[70%] self-center bg-se-color text-se-light-gray transition hover:scale-[1.05] hover:bg-se-color-light hover:text-se-white"
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
