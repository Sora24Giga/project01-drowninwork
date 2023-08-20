<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="h-full w-[20%] py-[20px] mb-[20px] fixed top-0 left-0 bg-se-color z-10">
      <p class="px-[30px] text-light font-semibold text-4xl text-se-white">ADMIN</p>
      <br>
      <nav class="w-full mt-8 text-left text-lg font-[500] text-se-light-gray bg-transparent">
        <RouterLink :to="{name: 'studentList'}" class="justify-between px-[30px] flex py-4 active:text-se-dark hover:underline hover:text-se-white hover:bg-se-color-light hover:decoration-current transition ease-in-out" active-class="text-se-white bg-se-color-light">
          <span>Students</span>
          <span>></span>
        </RouterLink>
        <RouterLink :to="{name: 'advisors'}" class="justify-between px-[30px] flex py-4 active:text-se-dark hover:underline hover:text-se-white hover:bg-se-color-light hover:decoration-current transition ease-in-out" active-class="text-se-white bg-se-color-light">
          <span>Advisors</span>
          <span>></span>
        </RouterLink>
        <RouterLink :to="{name: 'studentDetail'}" class="justify-between px-[30px] flex py-4 active:text-se-dark hover:underline hover:text-se-white hover:bg-se-color-light hover:decoration-current transition ease-in-out" active-class="text-se-white bg-se-color-light">
          <span>Form</span>
          <span>></span>
        </RouterLink>
      </nav>
    </div>

  <div class="z-0 bg-se-dark">
    <RouterView/>
  </div>
  
</template>

<style scoped>
.button {
  width: 90%;
  height: 40px;
  top:50%;
  background-color:#ffffff;
  color: #1d56b1;
  border:none;
  border-radius:9px;
  box-shadow: 1px 2px 5px rgb(27, 23, 155);  
}
</style>
