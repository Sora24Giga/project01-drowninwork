<script setup lang="ts"></script>
<template>
  <p>Unused</p>
  <!-- <div class="title-box">Create Form</div>
  <div class="info-box">
    If you are Adding student click student.<br> If Advisor click Advisor.
  </div>
  <div class="invisible-box">
    <RouterLink :to="{name: 'addStudentView'}" class="select-box">Student</RouterLink>
    <RouterLink :to="{name: 'addAdvisorView'}" class="select-box2">Advisor</RouterLink>
  </div> -->
</template>

<style scoped>
.select-box {
  text-align: center;

  padding: 20px;
  width: 120px;
  height: 60px;

  cursor: pointer;

  margin-top: 1000px;
  margin-left: 20%;

  color: aliceblue;
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.471);
  background-color: #49494953;
}
.select-box2 {
  text-align: center;

  padding: 20px;
  width: 10px;
  height: 60px;

  cursor: pointer;

  margin-top: 20%;
  margin-left: 10%;

  color: aliceblue;
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.471);
  background-color: #49494953;
}

.title-box {
  text-align: center;
  color: aliceblue;
  font-size: x-large;

  width: 400px;
  height: 40px;

  margin-top: 16%;
  margin-left: 47%;
  margin-bottom: 0%;
  margin-right: 50%;
  background-color: rgba(27, 27, 27, 0.49);
}

.info-box {
  text-align: center;
  color: aliceblue;

  width: 400px;
  height: 50px;

  margin-top: 0%;
  margin-left: 47%;
  margin-bottom: 0%;
  margin-right: 50%;
  background-color: rgb(55, 55, 55);
}

.invisible-box {
  width: 400px;
  height: 0px;

  margin-top: 4%;
  margin-left: 47%;
  margin-bottom: 50%;
  margin-right: 50%;
  background-color: rgb(55, 55, 55);
}
</style>
