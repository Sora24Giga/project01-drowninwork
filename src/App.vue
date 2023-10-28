<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

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
  authStore.logout()
  router.push({ name: 'login' })
}

const isLoggedIn = ref(authStore.isLoggedIn)
</script>

<template>
  <p
    v-if="isLoggedIn"
    class="fixed left-0 right-0 top-0 z-10 mb-[1%] ml-0 mt-0 hidden h-[60px] w-full bg-[#1e1e1e53] p-[20px] text-right font-[500] text-se-gray-light shadow-[0_3px_12px_0_rgba(0,0,0,0.471)] lg:block"
  >
    ACCOUNT: ADMINISTRATOR
  </p>
  <div
    class="fixed left-0 right-0 top-0 z-10 mb-[20px] h-fit w-full justify-between bg-se-color text-center lg:block lg:h-full lg:w-[20%] lg:px-0 lg:py-[20px]"
  >
    <p class="pt-4 pb-2 text-xl font-semibold text-light text-se-white lg:pt-0 lg:text-4xl">
      ADMIN
    </p>
    <nav
      class="flex h-fit justify-evenly bg-transparent text-center text-sm font-[500] text-se-gray-light md:text-base lg:mt-16 lg:inline-block lg:w-full lg:text-left lg:text-lg"
    >
      <span v-if="authStore.isLoggedIn">
        <RouterLink
          :to="{ name: 'announcement' }"
          class="flex justify-center w-full p-4 transition ease-in-out underline-offset-8 hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
          active-class="underline text-se-white lg:bg-se-color-light lg:no-underline"
        >
          <span>Announcement</span>
          <span class="hidden lg:flex"></span>
        </RouterLink>
      </span>

      <span>
        <RouterLink
          :to="{ name: 'studentList' }"
          class="flex justify-center w-full p-4 transition ease-in-out underline-offset-8 hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
          active-class="underline text-se-white lg:bg-se-color-light lg:no-underline"
        >
          <span>Student List</span>
          <span class="hidden lg:flex"></span>
        </RouterLink>
      </span>

      <span>
        <RouterLink
          :to="{ name: 'advisors' }"
          class="flex justify-center w-full p-4 transition ease-in-out underline-offset-8 hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
          active-class="underline text-se-white lg:bg-se-color-light lg:no-underline"
        >
          <span>Advisor List</span>
          <span class="hidden lg:flex"></span>
        </RouterLink>
      </span>

      <span>
        <RouterLink
          :to="{ name: 'add-announcement' }"
          class="flex justify-center w-full p-4 transition ease-in-out underline-offset-8 hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
          active-class="underline text-se-white lg:bg-se-color-light lg:no-underline"
        >
          <span>Add Announcement</span>
          <span class="hidden lg:flex"></span>
        </RouterLink>
      </span>

      <span>
        <RouterLink
          :to="{ name: 'add-student' }"
          class="flex justify-center w-full p-4 transition ease-in-out underline-offset-8 hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
          active-class="underline text-se-white lg:bg-se-color-light lg:no-underline"
        >
          <span>Add Student</span>
          <span class="hidden lg:flex"></span>
        </RouterLink>
      </span>

      <span>
        <RouterLink
          :to="{ name: 'add-advisor' }"
          class="flex justify-center w-full p-4 transition ease-in-out underline-offset-8 hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
          active-class="underline text-se-white lg:bg-se-color-light lg:no-underline"
        >
          <span>Add Advisor</span>
          <span class="hidden lg:flex"></span>
        </RouterLink>
      </span>
      <span v-if="!authStore.currentUserName">
        <RouterLink
          :to="{ name: 'login' }"
          class="flex justify-center w-full p-4 transition ease-in-out underline-offset-8 hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
          active-class="underline text-se-white lg:bg-se-color-light lg:no-underline"
        >
          <span>Login</span>
          <span class="hidden lg:flex"></span>
        </RouterLink>
      </span>
      <span v-if="authStore.currentUserName">
        <a
          @click="logout"
          class="flex justify-center w-full p-4 transition ease-in-out underline-offset-8 hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
          active-class="underline text-se-white lg:bg-se-color-light lg:no-underline"
        >
          <span>Logout</span>
          <span class="hidden lg:flex"></span>
        </a>
      </span>
      <span>
        <RouterLink
          :to="{ name: 'register' }"
          class="flex justify-center w-full p-4 transition ease-in-out underline-offset-8 hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
          active-class="underline text-se-white lg:bg-se-color-light lg:no-underline"
        >
          <span>Sign Up</span>
          <span class="hidden lg:flex"></span>
        </RouterLink>
      </span>
    </nav>
  </div>

  <div class="z-0">
    <RouterView />
  </div>
</template>

<style scoped></style>
