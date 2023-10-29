<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const authStore = useAuthStore()
const router = useRouter()

const token = localStorage.getItem('access_token')
const user = localStorage.getItem('user')

if (token&&user) {
  authStore.reload(token, JSON.parse(user))
} else {
  authStore.logout()
}

function logout() {
  authStore.logout()
  forceRerender()
  router.push({ name: 'login' })
}

const componentKey = ref(0)
const forceRerender = () => {
  console.log('forceRerender')
  componentKey.value += 1
  console.log(componentKey.value)
}

</script>

<template>
  <p
    v-if="authStore.isLoggedIn" :key="componentKey"
    class="fixed left-0 right-0 top-0 z-10 mb-[1%] ml-0 mt-0 hidden h-[60px] w-full bg-[#1e1e1e53] p-[20px] text-right font-[500] text-se-gray-light shadow-[0_3px_12px_0_rgba(0,0,0,0.471)] lg:block"
  >
    ACCOUNT: {{ authStore.currentUserName.toLocaleUpperCase() }}
  </p>
  <div
    class="p-3 fixed left-0 right-0 top-0 z-10 mb-[20px] h-fit w-full justify-between text-center lg:block lg:h-full lg:w-[20%] "
  >
    <div :key="componentKey" class="lg:px-0 lg:py-[20px] h-full rounded-xl bg-se-color shadow-[3px_0_12px_0_rgba(0,0,0,0.471)]">
      <div class="my-4">
      <div v-if="authStore.user?.images.length !== 0" class="flex justify-center h-32">
        <img v-for="image in authStore.user?.images" :key="image" :src="image" alt="advisors image"
          class="w-32 h-32 hover:shadow-lg rounded-[50%]"
        >
      </div>
      <div v-else class="relative inline-flex items-center justify-center w-32 h-32 overflow-hidden rounded-full bg-se-color-light">
        <span v-if="!authStore.isAdmin" class="text-5xl font-semibold text-se-white">
          {{ authStore.user?.firstname.charAt(0).toLocaleUpperCase() }}{{ authStore.user?.surname.charAt(0).toLocaleUpperCase() }}
        </span>
        <span v-else class="text-3xl font-semibold text-se-white">
          ADMIN
        </span>
      </div>
    </div>
      <p v-if="!authStore.isAdmin" class="pt-4 pb-2 text-xl font-semibold text-light text-se-white lg:pt-0 lg:text-3xl">
        {{authStore.user?.firstname.toLocaleUpperCase()}} {{authStore.user?.surname.toLocaleUpperCase()}}
      </p>

      <nav
        class="px-2 flex h-fit justify-evenly bg-transparent text-center text-sm font-[500] text-se-gray-light md:text-base lg:mt-4 lg:inline-block lg:w-full lg:text-left lg:text-lg"
      >
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
        <span v-if="!authStore.currentUserName">
          <RouterLink
            :to="{ name: 'login' }"
            class="flex justify-center w-full p-4 mb-2 transition ease-in-out rounded-lg underline-offset-8 hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
            active-class="underline text-se-white lg:bg-se-black1800 lg:no-underline"
          >
            <span>Login</span>
            <span class="hidden lg:flex"></span>
          </RouterLink>
        </span>
        <span v-if="authStore.currentUserName">
          <a
            @click="logout"
            class="flex justify-center w-full p-4 mb-2 transition ease-in-out rounded-lg underline-offset-8 hover:text-se-white hover:underline hover:decoration-current active:text-se-dark lg:justify-between lg:py-4 lg:hover:bg-se-color-light"
            active-class="underline text-se-white lg:bg-se-black1800 lg:no-underline"
          >
            <span>Logout</span>
            <span class="hidden lg:flex"></span>
          </a>
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
      </nav>
    </div>
  </div>

  <div class="z-0">
    <RouterView @forceRerender="forceRerender" />
  </div>
</template>

<style scoped></style>
