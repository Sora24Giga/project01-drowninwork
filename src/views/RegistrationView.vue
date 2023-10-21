<script lang="ts">
// In this view it will contain the two registration page of student and advisor.
import {defineComponent} from 'vue'

export default defineComponent({
  name: "RegistrationView"
})
</script>

<template>
<!--Router AdvisorFormView and StudentFromView should be added.-->
  <nav class="box"><!--this box css is just a temp.-->
  <router-link to="add-advisor">Advisor registration</router-link>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <router-link to="add-student">Student registration</router-link>
  </nav>
</template>

<style scoped>
.box {
  padding-left: 35%;
  padding-top: 15%;
  color: #f2f2f2;
}
</style>