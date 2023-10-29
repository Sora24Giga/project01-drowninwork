<script setup lang="ts">
import UniqueID from '@/features/UniqueID'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { computed } from 'vue'
export interface Props {
  placeholder?: string
  modelValue?: any
  error?: string
  required?: boolean
  type: string
}
const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  modelValue: '',
  error: '',
  required: false,
  type: 'text'
})
const uuid = UniqueID().getID()
const placeholderErrorClass = computed(() => {
  return !isError.value
    ? 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 ring-none sm:text-sm sm:leading-6'
    : 'block w-full rounded-md border-0 py=1.5 text-[#b91c1c] shadow-sm ring-1 ring-inset ring-[#fca5a5] placeholder:text-[#f87171] focus:ring-inset focus:ring-[#b91c1c] sm:text-sm sm:leading-6'
})
const isError = computed(() => {
  return props.error ? true : false
})

const emit = defineEmits(['update:modelValue'])
function updateValue(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement)?.value)
}
</script>
<template>
  <div>
    <div class="mt-2">
      <input
        :type="type"
        :id="uuid"
        :class="placeholderErrorClass"
        :placeholder="placeholder"
        :value="modelValue"
        @input="updateValue"
        v-bind="$attrs"
        :aria-describedby="error ? '${uuid}-error' : undefined"
        :aria-invalid="error ? true : false"
      />
      <ErrorMessage
        class="inline-flex mt-1 text-sm text-red-700"
        v-if="error"
        :id="'${uuid}-error'"
      >
        {{ error }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </ErrorMessage>
    </div>
  </div>
</template>
