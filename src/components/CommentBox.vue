<script setup lang="ts">
import type { Comment, CommentHistory } from '@/type'
import CommentMessage from './CommentMessage.vue'
import { ref, type PropType } from 'vue'
import CommentService from '@/services/CommentService'
import { useRouter } from 'vue-router'

const router = useRouter()
const componentKey = ref(0);
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

const commentMsg = ref<Comment>({
  id: 0,
  from: {
    id: 0,
    history: [],
    advisorId: 0,
    adviseeId: 0
  },
  message: '',
  timeSent: '',
  sentFromAdvisor: false
})
function saveComment() {
  console.log(commentMsg.value)
  if(props.commentHistory !== null && props.commentHistory !== undefined){
    const now = new Date()
    const timeNow = now.getDate()+'/'+now.getMonth()+'/'+now.getFullYear()+' '+now.getHours()+':'+now.getMinutes()
    commentMsg.value.from = props.commentHistory
    commentMsg.value.timeSent = timeNow
    CommentService.saveComment(commentMsg.value)
    .then((response) => {
      console.log("sent")
      console.log(response.data)
      router.go(0)
    })
    .catch((err) => {
      console.log(err)
      router.push({ name: 'network-error' })
    })
  }
}
</script>
<template>
  <!-- This is an example component -->
  <div class="justify-center w-full h-full shadow-lg" :key="componentKey">
    <!-- Chatting -->
    <div class="flex flex-row justify-between h-full bg-se-gray">
      <!-- message -->
      <div class="flex flex-col justify-between w-full h-full p-4">
        <div :class="inputBox ? 'h-[80%]' : 'h-full'" class="flex flex-col mt-5 overflow-auto">
          <CommentMessage
            v-for="comment in props.commentHistory?.history"
            :key="comment.id"
            :comment="comment"
            :advisor-view="false"
            :advisorName="advisorName"
            :adviseeName="adviseeName"
          />
        </div>
        <div class="h-[20%] pt-2" v-if="inputBox">
          <form class="h-full" @submit.prevent="saveComment">
            <textarea
              v-model="commentMsg.message"
              required
              class="w-full h-[60%] bg-black1800-300 rounded-xl"
              type="text"
              placeholder="type your message here..."
            />
            <div class="flex h-[40%] justify-end">
              <button
                class="flex items-center justify-between gap-4 px-3 py-1 transition-colors border border-current rounded-lg group bg-se-black1800 hover:bg-se-color focus:outline-none focus:ring active:bg-se-color-light"
                type="submit"
              >
                <span class="font-medium transition-colors text-se-white"> Submit </span>

                <span
                  class="p-1 border rounded-full shrink-0 bg-se-black1800 text-se-white group-hover:bg-se-color"
                >
                  <svg
                    class="w-3 h-3 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <!-- end message -->
    </div>
  </div>
</template>
