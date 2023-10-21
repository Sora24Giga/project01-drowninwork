<script lang="ts">
// In this view it will contain the two registration page of student and advisor.
import {defineComponent} from 'vue'

export default defineComponent({
  name: "RegistrationView"
})
</script>

<template>
<!--Router AdvisorFormView and StudentFromView should be added.-->
  <div class="box">
  <nav><!--this box css is just a temp.-->
  <router-link to="add-advisor" class="mt-1 w-full border-2 bg-transparent p-0 focus:border-transparent focus:outline-1 focus:ring-0 sm:text-sm text-se-white">Advisor registration</router-link>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <router-link to="add-student" class="mt-4 w-full border-2 bg-transparent p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm text-se-white">Student registration</router-link>
  </nav>
  </div>
</template>

<style scoped>
.box {
  padding-left: 35%;
  padding-top: 35%;
  color: #f2f2f2;
}
</style>