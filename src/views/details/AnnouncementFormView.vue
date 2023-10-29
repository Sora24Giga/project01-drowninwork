<script setup lang="ts">
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

import BaseInput from '@/components/BaseInput.vue'
import { ref } from 'vue'
import { type Announcement } from '@/type'
import AnnService from '@/services/AnnService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const store = useMessageStore()
const router = useRouter()
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview)
const uploadUrl = ref(import.meta.env.VITE_UPLOAD_FILE_URL)
function handleFilePondInit() {
  console.log('FilePond has initialized')
}
const pond = ref()

const ann = ref<Announcement>({
  id: 0,
  title: '',
  message: '',
  timeSent: '',
  advisor: {
    academicPosition: '',
    advisee: [],
    images: [],
    id: 0,
    studentId: '',
    firstname: '',
    surname: '',
    department: '',
    roles: [],
    username: '',
    password: ''
  },
  files: []
})

function saveAnn() {
  const now = new Date()
  let min = now.getMinutes() + ''
  min = min.toLocaleString().length === 1 ? '0' + min : '' + min
  const timeNow =
    now.getDate() +
    '/' +
    now.getMonth() +
    '/' +
    now.getFullYear() +
    ' ' +
    now.getHours() +
    ':' +
    min
  var files = pond.value.getFiles()
  for (var i = 0; i < files.length; i++) {
    console.log(files[i].serverId.slice(9, -2))
    ann.value.files.push(files[i].serverId.slice(9, -2))
  }
  console.log(ann.value.files)
  ann.value.timeSent = timeNow
  AnnService.saveAnnouncement(ann.value)
    .then((response) => {
      console.log('saved')
      console.log(response.data)
      router.push({
        name: 'announcement'
      })
      store.updateMessage('You have successfully added a new announcement')
      setTimeout(() => {
        store.restMessage()
      }, 3000)
    })
    .catch((e) => {
      console.log(e)
      router.push({ name: 'network-error' })
    })
}

function filesChange() {
  console.log('in filechange')

  var files = pond.value.getFiles()

  for (var i = 0; i < files.length; i++) {
    console.log(files[i].serverId.slice(9, -2))
  }
  console.log(ann.value.files)
}
</script>

<template>
  <div
    class="mb-[2rem] ml-0 mt-[108px] flex h-full w-full flex-col bg-se-dark text-xs md:text-base lg:ml-[20%] lg:mt-[60px] lg:w-[80%]"
  >
    <header>
      <div class="max-w-screen-xl py-8 mx-auto sm:py-12 lg:ml-16">
        <div class="sm:flex sm:items-center sm:justify-between">
          <div class="text-center sm:text-left">
            <h1 class="text-2xl font-bold text-se-white sm:text-3xl">Add Announcement 📣</h1>
            <p class="mt-1.5 text-sm text-se-gray-light brightness-90">Import Announcement here</p>
          </div>
          <div class="flex flex-col gap-4 mt-4 sm:mt-0 sm:flex-row sm:items-center"></div>
        </div>
      </div>
    </header>

    <div>
      <form @submit.prevent="saveAnn">
        <div class="mx-auto w-[80%] lg:ml-16 lg:mr-64">
          <!-- Header -->
          <label
            for="Title"
            class="block px-3 py-2 mb-8 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1"
          >
            <span class="text-xs font-medium text-se-gray-light"> Title </span>

            <BaseInput
              :required="true"
              v-model="ann.title"
              type="text"
              placeholder="Insert Title here"
              class="w-full px-3 py-2 mt-1 bg-transparent border-none text-se-white focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />
          </label>
        </div>

        <div class="mx-auto w-[80%] lg:ml-16 lg:mr-64">
          <!-- INFO -->
          <label
            for="Info"
            class="block px-3 py-2 mb-8 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1"
          >
            <span class="text-xs font-medium text-se-gray-light"> Info </span>

            <textarea
              required
              v-model="ann.message"
              id="OrderNotes"
              class="w-full mt-2 align-top bg-transparent border-transparent border-none rounded-lg outline-none text-se-white ring-0 sm:text-sm"
              rows="4"
              placeholder="Enter any additional information notes..."
            ></textarea>
          </label>
        </div>

        <div class="mx-auto w-[80%] lg:ml-16 lg:mr-64">
          <label
            for="Upload"
            class="block px-3 py-2 mb-8 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1"
          >
            <span class="text-xs font-medium text-se-gray-light"> File Upload </span>

            <file-pond
              class="mt-2"
              name="file"
              ref="pond"
              label-idle="Click this to upload or drop files here..."
              allow-multiple="true"
              :server="uploadUrl"
              :files="ann.files"
              allowRevert="false"
              allowFileSizeValidation="true"
              maxFileSize="1MB"
              labelMaxFileSizeExceeded="File is too large"
              v-on:init="handleFilePondInit"
              v-on:processfiles="filesChange"
            />
          </label>
        </div>

        <div class="mx-auto w-[80%] lg:ml-16 lg:mr-64">
          <button
            class="flex items-center justify-between gap-4 px-5 py-3 transition-colors border border-current rounded-lg group bg-se-black1800 hover:bg-se-color focus:outline-none focus:ring active:bg-se-color-light"
            type="submit"
          >
            <span class="font-medium transition-colors text-se-white"> Submit </span>

            <span
              class="p-2 border border-indigo-600 rounded-full group-active:border-indigo-500 shrink-0 bg-se-black1800 text-se-white group-hover:bg-se-color"
            >
              <svg
                class="w-5 h-5 rtl:rotate-180"
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
</template>
