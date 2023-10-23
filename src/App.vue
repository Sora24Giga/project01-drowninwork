<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

// if(token && user) {
//   authStore.reload(token,JSON.parse(user))
// }else{
//   authStore.logout()
// }

function logout() {
  authStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <p
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
      <RouterLink
        :to="{ name: 'announcement' }"
        class="flex justify-center w-full p-4 transition ease-in-out underline-offset-8 hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
        active-class="underline text-se-white lg:bg-se-color-light lg:no-underline"
      >
        <span>Announcement</span>
        <span class="hidden lg:flex"></span>
      </RouterLink>

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
      <span>
        <RouterLink
          :to="{ name: 'login' }"
          class="flex justify-center w-full p-4 transition ease-in-out underline-offset-8 hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
          active-class="underline text-se-white lg:bg-se-color-light lg:no-underline"
        >
          <span>Login</span>
          <span class="hidden lg:flex"></span>
        </RouterLink>
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

      <!-- <nav class="flex">
        <u1 v-if="!authStore.currentUserName" class="flex ml-auto navbar-nav">
          &nbsp;&nbsp;&nbsp;&nbsp;
          <li class="px-2 nav-item">
            <router-link to="/login" class="nav-link">
              <font-awesome-icon icon="sign-in-alt" /> Login
            </router-link>
          </li>
          <li class="px-2 nav-item">
            <router-link to="/register" class="nav-link">
              <font-awesome-icon icon="user-plus" /> Sign.Up
            </router-link>
          </li>

        </u1>
        <u1 v-if="authStore.currentUserName" class="flex ml-auto navbar-nav">
          <li class="px-2 nav-item">
            <router-link to="/profile" class="nav-link">
              <font-awesome-icon icon="user" />
              {{authStore.currentUserName}}
            </router-link>
          </li> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <li class="px-2 nav-item">
            <a class="nav-link hover:cursor-pointer" @click="logout">
              <font-awesome-icon icon="sign-out-alt" /> LogOut
            </a>
          </li>&nbsp;&nbsp;&nbsp;&nbsp;
        </u1>

      </nav> -->
    </nav>
  </div>

  <div class="z-0">
    <RouterView />
  </div>
</template>

<style scoped></style>
