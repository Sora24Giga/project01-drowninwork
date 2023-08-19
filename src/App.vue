<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="menu">
      <p style="text-align: left; font-size: x-large; font-weight: 600;" class="text-slate-900">ADMIN</p>
      <br>
      <button class="button" style="font-weight: 600;">  + New Form</button>
      <br>
      <br>
      <br>
      <nav>
        <RouterLink :to="{name: 'studentList'}" class="menu-font">Students</RouterLink>
      </nav>
      <nav>
        <RouterLink :to="{name: 'advisors'}" class="menu-font">Advisors</RouterLink>
      </nav>
      <nav>
        <RouterLink :to="{name: 'studentDetail'}"  class="menu-font">Form</RouterLink>
      </nav>
    </div>


  <RouterView />
  
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.menu { /*this is where we could decorate the menu page*/
  width: 15%;
  height: 100%;
  padding: 20px;
  margin-bottom: 20px;
  position: fixed; top: 0px; left: 0;
  /* background-color: rgb(67, 82, 222); */
  background-image: linear-gradient(to top right, rgb(99, 175, 255),rgb(67, 82, 222));
}
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

.menu-font {
  font-size: large;
  font-weight: 400;
  color:aliceblue;
}


.vertical {

}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color:rgb(0, 255, 229);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 0.2rem 0;
    margin-top: 1rem;
  }
}
</style>
