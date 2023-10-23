<template>
  <article class="p-4 mb-8 bg-white rounded-xl bg-se-gray ring ring-se-color sm:p-6 lg:p-8">
    <div class="flex items-start w-full sm:gap-8">
      <div class="w-full">
        <h3 class="text-lg font-medium text-se-white sm:text-xl">
          {{ ann?.title }}
        </h3>

        <p class="mt-1 mb-3 text-sm text-se-gray-light brightness-90">
          {{ ann?.message }}
        </p>
        <div class="grid w-full grid-cols-6 gap-2">
          <a
            class="font-medium rounded overflow-clip text-se-dark hover:scale-[1.01] transition"
            v-for="file in ann?.files"
            :key="file"
            :href="file"
            :class="
              isImage(file)
                ? 'order-first col-span-3'
                : 'order-last col-span-2 h-12 bg-se-gray-light p-2 lg:p-3'
            "
          >
            <div v-if="isImage(file)">
              <img :src="file"  class="max-h-[400px]"/>
            </div>
            <div v-else class="flex flex-row hover:animate-pulse">
              <div class="mr-2 h-fit"><font-awesome-icon :icon="getExtImg(file)"/></div>
              <div class="truncate text-clip">
                {{ getFileName(file) }}
              </div>
            </div>
          </a>
        </div>
        <div class="mt-4 sm:flex sm:items-center sm:gap-2">
          <div class="flex items-center gap-1 text-se-white">
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>

            <p class="text-xs font-medium text-se-white">{{ ann?.timeSent }}</p>
          </div>
          <p
            class="text-xs font-medium text-se-gray-light brightness-90 hover:text-se-color-light hover:underline hover:underline-offset-4"
          >
            <RouterLink :to="{ name: 'advisorDetail', params: { id: ann?.advisor.id } }">
              {{ ann?.advisor.firstname }} {{ ann?.advisor.surname }}
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Announcement } from '@/type'
import { type PropType } from 'vue'
const props = defineProps({
  ann: {
    type: Object as PropType<Announcement>,
    require: true
  }
})

function getFileName(fileUrl: string) {
  const regex = new RegExp('^[0-9]*-[0-9]*-[0-9]*%[0-9]*-')
  let fileName = fileUrl.split('/').pop()
  let realName: string = ''
  if (fileName != undefined) {
    realName = fileName.replace(regex, '')
    realName = realName.replace(/%20/g,' ')
    realName = realName.split('?')[0]
  }
  return realName
}

function isImage(fileName: string) {
  fileName = getFileName(fileName)
  const ext = fileName.substring(fileName.lastIndexOf('.'))
  const allowedExt = ['.jpg', '.jpeg', '.png', '.gif']
  for (const i of allowedExt) {
    if (ext === i) {
      return true
    }
  }
  return false
}

function getExtImg(fileName: string){
  let icon = 'fa-file'
  fileName = getFileName(fileName)
  const ext = fileName.substring(fileName.lastIndexOf('.'))
  switch (ext) {
    case ".xlsx":
      icon = 'fa-file-excel'
      break;
    case ".docx":
      icon = 'fa-file-word'
      break;
    case ".pptx":
      icon = 'fa-file-powerpoint'
      break;
    case ".pdf":
      icon = 'fa-file-pdf'
      break;
    case ".zip":
      icon = 'fa-file-zipper'
      break;
    case ".rar":
      icon = 'fa-file-zipper'
      break;
    default:
      icon = 'fa-file'
      break;
  }
  return 'fa-solid '+icon;
}
</script>
