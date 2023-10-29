<script setup lang="ts">
import CommentBox from '@/components/CommentBox.vue'
import { storeToRefs } from 'pinia'
import { useCommentHistoryStore } from '@/stores/commentHistory'
import { useStudentStore } from '@/stores/student'
import { useAuthStore } from '@/stores/auth'
const commentStore = useCommentHistoryStore()
const commentHistory = storeToRefs(commentStore).commentHistory
const store = useStudentStore()
const student = storeToRefs(commentStore).student
const authStore = useAuthStore()
console.log(student.value.firstname)
</script>
<template>
  <div class="mt-[108px] lg:ml-[20%] lg:mt-[60px]">
    <div class="mx-auto w-[95%] pt-4">
      <p
        class="text-se-gray-light h-[60px] w-full self-center bg-se-black1800 px-8 py-4 text-left text-xl font-bold shadow-[0_3px_12px_0_rgba(0,0,0,0.2)]"
      >
        {{ student.advisor.firstname.toUpperCase() }} {{ student.advisor.surname.toUpperCase() }}
      </p>
      <div class="h-full lg:h-[550px]">
        <CommentBox
          :adviseeName="student.firstname + ' ' + student.surname"
          :advisorName="student.advisor.firstname + ' ' + student.advisor.surname"
          :commentHistory="commentHistory"
          :inputBox="!authStore.isAdmin"
        />
      </div>
    </div>
  </div>
</template>
