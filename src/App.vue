<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import type { CommentHistory } from './type'
import CommentService from './services/CommentService'
import StudentService from './services/StudentService'

const authStore = useAuthStore()
const router = useRouter()

const token = localStorage.getItem('access_token')
const user = localStorage.getItem('user')

if (token && user) {
  authStore.reload(token, JSON.parse(user))
} else {
  authStore.logout()
}

function logout() {
  // if(confirm("Are you sure you want to logout?")){
  authStore.logout()
  forceRerender()
  router.push({ name: 'login' })
  // }
}

const componentKey = ref(0)
const forceRerender = () => {
  console.log('forceRerender')
  componentKey.value += 1
  console.log(componentKey.value)
}

const commentView = ref<CommentHistory>({
id: 0,
history: [],
advisorId: 0,
adviseeId: 0
})
if (authStore.isLoggedIn && authStore.isStudent && authStore.user !== null) {
  StudentService.getStudentsById(authStore.user?.id)
    .then((response) => {
      console.log(response.data)
      if (response.data.advisor !== null && response.data.advisor.id !== 0) {
        CommentService.getCommentHistoryByKeyword(response.data.advisor.id, response.data.id, 1, 1)
          .then((commentResponse) => {
            commentView.value = commentResponse.data[0]
          })
          .catch((error) => {
            console.log(error)
            if (error.response && error.response.status === 404) {
              router.push({ name: '404-resource', params: { resource: 'student' } })
            } else {
              router.push({ name: 'network-error' })
            }
          })
      }
    })
    .catch((error) => {
      console.log(error)
      if (error.response && error.response.status === 404) {
        router.push({ name: '404-resource', params: { resource: 'student' } })
      } else {
        router.push({ name: 'network-error' })
      }
    })
}
</script>

<template>
  <p
    v-if="authStore.isLoggedIn"
    :key="componentKey"
    class="fixed left-0 right-0 top-0 z-10 mb-[1%] ml-0 mt-0 hidden h-[60px] w-full bg-[#1e1e1e53] p-[20px] text-right font-[500] text-se-gray-light shadow-[0_3px_12px_0_rgba(0,0,0,0.471)] lg:block"
  >
    {{ authStore.currentUserName.toLocaleUpperCase() }}
  </p>
  <div
    class="fixed left-0 right-0 top-0 z-10 mb-[20px] h-fit w-full justify-between p-3 text-center lg:block lg:h-full lg:w-[17%]"
  >
    <div
      :key="componentKey"
      class="h-full rounded-xl bg-se-color shadow-[3px_0_12px_0_rgba(0,0,0,0.471)] lg:px-0 lg:py-[20px]"
    >
      <div class="mb-6 mt-3 flex h-[2.25rem] w-full flex-row justify-center">
        <img src="/src/assets/logo.svg" class="" />
        <span class="ml-2 hidden text-[2.25rem] font-bold leading-none text-se-white lg:flex"
          >ADLINK</span
        >
      </div>
      <div class="my-3" v-if="authStore.isLoggedIn">
        <div class="mb-3">
          <div v-if="authStore.user?.images.length !== 0" class="flex justify-center h-20">
            <img
              v-for="image in authStore.user?.images"
              :key="image"
              :src="image"
              alt="advisors image"
              class="h-20 w-20 rounded-[50%] hover:shadow-lg"
            />
          </div>
          <div
            v-else
            class="relative inline-flex items-center justify-center w-20 h-20 overflow-hidden rounded-full bg-se-color-light"
          >
            <span v-if="!authStore.isAdmin" class="text-lg font-semibold text-se-white">
              {{ authStore.user?.firstname.charAt(0).toLocaleUpperCase()
              }}{{ authStore.user?.surname.charAt(0).toLocaleUpperCase() }}
            </span>
            <span v-else class="text-lg font-semibold text-se-white"> ADMIN </span>
          </div>
        </div>
        <p
          v-if="!authStore.isAdmin"
          class="flex flex-col pt-4 pb-2 text-xl font-semibold text-se-white lg:pt-0 lg:text-lg"
        >
          <span>
            {{ authStore.user?.firstname.toLocaleUpperCase() }}
            {{ authStore.user?.surname.toLocaleUpperCase() }}
          </span>
          <span class="text-xs font-medium leading-none text-se-gray-light">{{
            authStore.isStudent ? 'STUDENT' : 'ADVISOR'
          }}</span>
        </p>
        <p
          v-else
          class="flex flex-col pt-4 pb-2 text-xl font-semibold text-se-white lg:pt-0 lg:text-lg"
        >
          <span>ADMINISTRATOR</span>
          <span class="text-sm font-medium leading-none text-se-gray-light">ADMIN</span>
        </p>
      </div>

      <nav
        class="flex h-fit justify-evenly bg-transparent px-2 text-center text-sm font-[500] text-se-gray-light lg:inline-block lg:w-full lg:text-left"
      >
        <span>
          <RouterLink
            v-if="!authStore.isAdmin && authStore.isLoggedIn"
            :to="{
              name: authStore.isTeacher ? 'advisorDetail' : 'studentDetail',
              params: { id: authStore.user?.id }
            }"
            class="flex justify-center w-full p-4 mb-2 transition ease-in-out rounded-lg underline-offset-8 hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
            active-class="underline text-se-white lg:bg-se-black1800 lg:no-underline"
          >
            <span>Profile</span>
            <span class="hidden lg:flex"></span>
          </RouterLink>
        </span>
        <span v-if="!authStore.isLoggedIn">
          <RouterLink
            :to="{ name: 'login' }"
            class="flex justify-center w-full p-4 mb-2 transition ease-in-out rounded-lg underline-offset-8 hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
            active-class="underline text-se-white lg:bg-se-black1800 lg:no-underline"
          >
            <span>Login</span>
            <span class="hidden lg:flex"></span>
          </RouterLink>
        </span>
        <span v-if="authStore.isLoggedIn">
          <button
            @click="logout"
            class="flex justify-center w-full p-4 mb-2 transition ease-in-out rounded-lg underline-offset-8 hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
          >
            <span>Logout</span>
            <span class="hidden lg:flex"></span>
          </button>
        </span>
        <span v-if="!authStore.isLoggedIn">
          <RouterLink
            :to="{ name: 'register' }"
            class="flex justify-center w-full p-4 mb-2 transition ease-in-out rounded-lg underline-offset-8 hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
            active-class="underline text-se-white lg:bg-se-black1800 lg:no-underline"
          >
            <span>Register</span>
            <span class="hidden lg:flex"></span>
          </RouterLink>
        </span>
        <div class="w-full mb-2 border-b-2 border-se-color-light"></div>

        <span v-if="authStore.isLoggedIn && !authStore.isStudent">
          <RouterLink
            :to="{ name: 'studentList' }"
            class="flex justify-center w-full p-4 mb-2 transition ease-in-out rounded-lg underline-offset-8 hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
            active-class="underline text-se-white lg:bg-se-black1800 lg:no-underline"
          >
            <span>Student List</span>
            <span class="hidden lg:flex"></span>
          </RouterLink>
        </span>

        <span v-if="authStore.isLoggedIn && !authStore.isAdmin">
          <RouterLink
            :to="{ name: 'announcement' }"
            class="flex justify-center w-full p-4 mb-2 transition ease-in-out rounded-lg underline-offset-8 hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
            active-class="underline text-se-white lg:bg-se-black1800 lg:no-underline"
          >
            <span>Announcement</span>
            <span class="hidden lg:flex"></span>
          </RouterLink>
        </span>

        <span v-if="authStore.isLoggedIn && authStore.isTeacher">
          <RouterLink
            :to="{ name: 'add-announcement' }"
            class="flex justify-center w-full p-4 mb-2 transition ease-in-out rounded-lg underline-offset-8 hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
            active-class="underline text-se-white lg:bg-se-black1800 lg:no-underline"
          >
            <span>Add Announcement</span>
            <span class="hidden lg:flex"></span>
          </RouterLink>
        </span>

        <span v-if="authStore.isLoggedIn && authStore.isAdmin">
          <RouterLink
            :to="{ name: 'advisors' }"
            class="flex justify-center w-full p-4 mb-2 transition ease-in-out rounded-lg underline-offset-8 hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
            active-class="underline text-se-white lg:bg-se-black1800 lg:no-underline"
          >
            <span>Advisor List</span>
            <span class="hidden lg:flex"></span>
          </RouterLink>
        </span>

        <span v-if="authStore.isLoggedIn && authStore.isAdmin">
          <RouterLink
            :to="{ name: 'add-student' }"
            class="flex justify-center w-full p-4 mb-2 transition ease-in-out rounded-lg underline-offset-8 hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
            active-class="underline text-se-white lg:bg-se-black1800 lg:no-underline"
          >
            <span>Add Student</span>
            <span class="hidden lg:flex"></span>
          </RouterLink>
        </span>

        <span v-if="authStore.isLoggedIn && authStore.isAdmin">
          <RouterLink
            :to="{ name: 'add-advisor' }"
            class="flex justify-center w-full p-4 mb-2 transition ease-in-out rounded-lg underline-offset-8 hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
            active-class="underline text-se-white lg:bg-se-black1800 lg:no-underline"
          >
            <span>Add Advisor</span>
            <span class="hidden lg:flex"></span>
          </RouterLink>
        </span>

        <span v-if="authStore.isLoggedIn && authStore.isStudent && commentView.id !== 0">
          <RouterLink
            :to="{ name: 'comment', params: { id: commentView?.id } }"
            class="flex justify-center w-full p-4 mb-2 transition ease-in-out rounded-lg underline-offset-8 hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
            active-class="underline text-se-white lg:bg-se-black1800 lg:no-underline"
          >
            <span>Comments</span>
            <span class="hidden lg:flex"></span>
          </RouterLink>
        </span>
      </nav>
    </div>
  </div>

  <div class="z-0">
    <RouterView @forceRerender="forceRerender" />
  </div>
</template>

<style scoped></style>
