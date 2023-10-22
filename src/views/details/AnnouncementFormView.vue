<script setup lang="ts">
import type { AdvisorDetail } from '@/type'
import AdvisorService from '@/services/AdvisorService'
import { computed, ref, type Ref } from 'vue'
import type { AxiosResponse } from 'axios'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import BaseInput from '@/components/BaseInput.vue'
import FileUpload from 'primevue/fileupload';

</script>

<template>
    <div
        class="mb-[2rem] ml-0 mt-[108px] flex h-full w-full flex-col bg-se-dark text-xs md:text-base lg:ml-[20%] lg:mt-[60px] lg:w-[80%]">
        <header>
            <div class="max-w-screen-xl py-8 mx-auto lg:ml-16 sm:py-12">
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
            <div class="lg:ml-16 lg:mr-64 w-[80%] mx-auto">
                <!-- Header -->
                <label for="Headers"
                    class="block px-3 py-2 mb-8 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1">
                    <span class="text-xs font-medium text-se-gray-light"> Header </span>

                    <BaseInput type="text" placeholder="Insert Header here"
                        class="w-full p-0 mt-1 bg-transparent border-none text-se-white focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                </label>

            </div>

            <div class="lg:ml-16 lg:mr-64 w-[80%] mx-auto">
                <!-- INFO -->
                <label for="Info"
                    class="block px-3 py-2 mb-8 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1">
                    <span class="text-xs font-medium text-se-gray-light"> Info </span>

                    <textarea id="OrderNotes"
                        class="mt-2 w-full rounded-lg align-top sm:text-sm bg-transparent outline-none text-se-white border-transparent border-none ring-0"
                        rows="4" placeholder="Enter any additional information notes..."></textarea>
                </label>

            </div>

            <!-- <div class="lg:ml-16 lg:mr-64 w-[80%] mx-auto">
                <label for="Upload"
                    class="block px-3 py-2 mb-8 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1">
                    <span class="text-xs font-medium text-se-gray-light"> Upload </span>

                    <FileUpload name="demo[]" url="./upload.php" :multiple="true" accept="image/*" :maxFileSize="1000000"
                        class="mr-4 text-se-white">
                    </FileUpload>
                </label>
            </div> -->

            <div class="lg:ml-16 lg:mr-64 w-[80%] mx-auto">
                <button
                    class="flex items-center justify-between gap-4 px-5 py-3 transition-colors border border-current rounded-lg group bg-se-black1800 hover:bg-se-color focus:outline-none focus:ring active:bg-se-color-light"
                    type="submit">
                    <span class="font-medium transition-colors text-se-white"> Submit </span>

                    <span
                        class="p-2 border border-indigo-600 rounded-full group-active:border-indigo-500 shrink-0 bg-se-black1800">
                        <svg class="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                </button>
            </div>

        </div>
    </div>
</template>