<script setup lang="ts">
import type { Comment, CommentHistory } from '@/type'
import CommentMessage from './CommentMessage.vue'
import { ref, type PropType } from 'vue'
import { boolean } from 'yup'
import CommentService from '@/services/CommentService'
import type { AxiosResponse } from 'axios'
import { onBeforeRouteUpdate } from 'vue-router'
import router from '@/router'
const history = ref<Comment[]>([])
// const history = ref<Comment[]>([
//   {
//     id: 1,
//     from: {
//       id: 0,
//       history: [],
//       advisorId: 0,
//       adviseeId: 0
//     },
//     message: "test",
//     timeSent: "when",
//     sentFromAdvisor: true
//   },
//   {
//     id: 2,
//     from: {
//       id: 0,
//       history: [],
//       advisorId: 0,
//       adviseeId: 0
//     },
//     message: "123",
//     timeSent: "when",
//     sentFromAdvisor: false
//   },
//   {
//     id: 3,
//     from: {
//       id: 0,
//       history: [],
//       advisorId: 0,
//       adviseeId: 0
//     },
//     message: "456",
//     timeSent: "when",
//     sentFromAdvisor: true
//   },
//   {
//     id: 4,
//     from: {
//       id: 0,
//       history: [],
//       advisorId: 0,
//       adviseeId: 0
//     },
//     message: "456",
//     timeSent: "when",
//     sentFromAdvisor: true
//   },
//   {
//     id: 5,
//     from: {
//       id: 0,
//       history: [],
//       advisorId: 0,
//       adviseeId: 0
//     },
//     message: "456",
//     timeSent: "when",
//     sentFromAdvisor: true
//   },
//   {
//     id: 6,
//     from: {
//       id: 0,
//       history: [],
//       advisorId: 0,
//       adviseeId: 0
//     },
//     message: "456",
//     timeSent: "when",
//     sentFromAdvisor: true
//   }
// ])

const props = defineProps({
  inputBox: Boolean,
  commentHistory: {
    type: Object as PropType<CommentHistory>,
    require: true
  },
  advisorName: {
    type: String
  },
  adviseeName: {
    type: String
  }
})

</script>
<template>
  <!-- This is an example component -->
  <div class="justify-center w-full h-full shadow-lg">
    <!-- Chatting -->
    <div class="flex flex-row justify-between h-full bg-se-gray">
      <!-- message -->
      <div class="flex flex-col justify-between w-full h-full p-5">
        <div :class="inputBox ? 'h-[82%]' : 'h-full'" class="flex flex-col mt-5 overflow-auto">
          <CommentMessage
            v-for="comment in props.commentHistory?.history"
            :key="comment.id"
            :comment="comment"
            :advisor-view="false"
            :advisorName="advisorName"
            :adviseeName="adviseeName"
          />
        </div>
        <div class="h-[18%] pt-2" v-if="inputBox">
          <textarea
            class="w-full h-full bg-black1800-300 rounded-xl"
            type="text"
            placeholder="type your message here..."
          />
        </div>
      </div>
      <!-- end message -->
    </div>
  </div>
</template>
