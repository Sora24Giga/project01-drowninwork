<script setup lang="ts">
import CommentBox from '@/components/CommentBox.vue'
import { storeToRefs } from 'pinia'
import { useStudentStore } from '@/stores/student'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import StudentService from '@/services/StudentService'
import { useRouter } from 'vue-router'
import { type StudentDetail } from '@/type'
const router = useRouter()
const store = useStudentStore()
const commentHistory = storeToRefs(store).commentHistory
const student = storeToRefs(store).student
const authStore = useAuthStore()
console.log(commentHistory.value)
// StudentService.getStudentsById(commentHistory.value.adviseeId)
//   .then((rep) => {
//     student.value = rep.data
//     console.log(student.value)
//   })
//   .catch((error) => {
//     console.log(error)
//     if (error.response && error.response.status === 404) {
//       router.push({ name: '404-resource', params: { resource: 'student' } })
//     } else {
//       router.push({ name: 'network-error' })
//     }
//   })
</script>
<template>
  <div class="mt-[108px] lg:ml-[17%] lg:mt-[60px]">
    <div class="mx-auto w-[95%] pt-4">
      <p
        class="h-[60px] w-full self-center bg-se-black1800 px-8 py-4 text-left text-xl font-bold text-se-gray-light shadow-[0_3px_12px_0_rgba(0,0,0,0.2)]"
      >
        <RouterLink
          :to="{
            name: authStore.isTeacher || authStore.isAdmin ? 'studentDetail' : 'advisorDetail',
            params: {
              id: authStore.isTeacher || authStore.isAdmin ? student?.id : student?.advisor.id
            }
          }"
        >
          <span v-if="authStore.isStudent">
            {{ student?.advisor.firstname.toUpperCase() }}
            {{ student?.advisor.surname.toUpperCase() }}
          </span>
          <span v-else>
            {{ student?.firstname.toUpperCase() }} {{ student?.surname.toUpperCase() }}
          </span>
        </RouterLink>
      </p>

      <div class="h-full lg:h-[550px]">
        <CommentBox
          :adviseeName="student?.firstname + ' ' + student?.surname"
          :advisorName="student?.advisor.firstname + ' ' + student?.advisor.surname"
          :commentHistory="commentHistory"
          :inputBox="!authStore.isAdmin"
          :advisorView="!authStore.isStudent"
        />
      </div>
    </div>
  </div>
</template>
