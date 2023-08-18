<template>
    <RouterLink class="passenger-link" :to="{name: 'passenger-details', params:{id: student?.id}}"> <!--해당 뷰 컴포넌트를 라우터링크로 화면전환 패스를 할당해 액션을 일으킨다.-->
  <div class="passenger">
    <div class="passenger-card">
      <span style="font-weight: 700;">Name: {{ props.student?.first_name }} {{ props.student?.last_name }}</span><!--?는 체인 오퍼레이션이라고 한다-->
    </div>
  </div>
</RouterLink>
</template>

<script setup lang="ts">

import type { StudentDetail } from '@/type'
import type { PropType } from 'vue'
const props = defineProps({
    student: {
      type: Object as PropType<StudentDetail>,
      require:true
    }
})

// const passenger = ref<Passengers[]>([])


</script>

<style scoped>
.passenger{
  display:flex;
  flex-direction: column;
  align-items: center;
}
.passenger-card{
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.passenger-card:hover{
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
.passenger-link{
  color: #2c3e50;
  text-decoration: none;
}

</style>