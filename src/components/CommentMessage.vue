<script setup lang="ts">
import type { Comment } from '@/type'
import type { PropType } from 'vue'
const props = defineProps({
  comment: {
    type: Object as PropType<Comment>,
    require: true
  },
  advisorView: {
    type: Boolean,
    require: true
  }
})
function checkWhoseView(truePart: string, falsePart: string) {
  if (
    (props.advisorView && props.comment?.sentFromAdvisor) ||
    (!props.advisorView && !props.comment?.sentFromAdvisor)
  ) {
    return truePart
  } else if (
    (props.advisorView && !props.comment?.sentFromAdvisor) ||
    (!props.advisorView && props.comment?.sentFromAdvisor)
  ) {
    return falsePart
  }
}
</script>
<template>
  <div :class="checkWhoseView('justify-end', 'justify-start')" class="flex mb-4">
    <img v-if="(props.advisorView && !props.comment?.sentFromAdvisor) || (!props.advisorView && props.comment?.sentFromAdvisor)"
      src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
      class="mt-[16px] h-[49px] rounded-full object-cover"
      alt=""
    />
    <div class="flex flex-col">
      <span
        :class="checkWhoseView('mr-2 text-right', 'ml-1 text-left')"
        class="text-se-gray-light h-[16px] text-right text-xs"
        >Someone 22/10/2566 14:48</span
      >
      <div
        :class="checkWhoseView('mr-2 bg-se-color-light', 'ml-2 bg-se-black1800')"
        class="mr-2 rounded-xl border border-se-dark px-4 py-3 text-se-white shadow-[0_3px_12px_0_rgba(0,0,0,0.2)]"
      >
        {{ props.comment?.message }}
      </div>
    </div>
    <img v-if="(props.advisorView && props.comment?.sentFromAdvisor) || (!props.advisorView && !props.comment?.sentFromAdvisor)"
      src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
      class="mt-[16px] h-[49px] rounded-full object-cover"
      alt=""
    />
  </div>
</template>
