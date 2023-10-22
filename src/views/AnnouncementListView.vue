<script setup lang="ts">
import AdvisorCard from '../components/AdvisorCard.vue'
import type { AdvisorDetail } from '@/type'
import AdvisorService from '@/services/AdvisorService'
import { computed, ref, type Ref } from 'vue'
import type { AxiosResponse } from 'axios'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import BaseInput from '@/components/BaseInput.vue'

</script>

<template>
    <div
        class="mb-[2rem] ml-0 mt-[108px] flex h-full w-full flex-col bg-se-dark text-xs md:text-base lg:ml-[20%] lg:mt-[60px] lg:w-[80%]">
        <header>
            <div class="max-w-screen-xl py-8 mx-auto lg:ml-16 sm:py-12">
                <div class="sm:flex sm:items-center sm:justify-between">
                    <div class="text-center sm:text-left">
                        <h1 class="text-2xl font-bold text-se-white sm:text-3xl">Announcement 📣</h1>
                        <p class="mt-1.5 text-sm text-se-gray-light brightness-90">All Announcement</p>
                    </div>
                    <div class="flex flex-col gap-4 mt-4 sm:mt-0 sm:flex-row sm:items-center"></div>
                </div>
            </div>
        </header>


        <!-- Blog -->
        <div class="ml-16 mr-16">
            <!-- temp1 -->
            <article class="rounded-xl bg-white p-4 ring ring-se-color sm:p-6 lg:p-8 bg-se-gray mb-8">
                <div class="flex items-start sm:gap-8">
                    <div>
                        <h3 class="text-lg font-medium sm:text-xl text-se-white">
                            <a href="" class="hover:underline"> Some Interesting Title </a>
                        </h3>

                        <p class="mt-1 text-sm text-se-gray-light brightness-90">
                            私の名前は吉良良景です。 私は33歳です。 私の家はすべての別荘がある森王の北東部にあり、私は結婚していません。
                            私は亀湯百貨店の従業員として働いており、遅くとも午後8時までに毎日家に帰ります。 私は喫煙しませんが、時々飲みます。
                        </p>

                        <div class="mt-4 sm:flex sm:items-center sm:gap-2">
                            <div class="flex items-center gap-1 text-se-white">
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>

                                <p class="text-xs font-medium text-se-white">99/99/9999</p>

                            </div>
                            <p class="text-xs font-medium text-se-gray-light brightness-90 ">Some Prof</p>

                            <span class="hidden sm:block text-se-gray-light brightness-90"
                                aria-hidden="true">&middot;</span>
                        </div>
                    </div>
                </div>
            </article>
            <!-- temp2 -->
            <article class="rounded-xl bg-white p-4 ring ring-se-color sm:p-6 lg:p-8 bg-se-gray mb-8">
                <div class="flex items-start sm:gap-8">
                    <div>
                        <h3 class="text-lg font-medium sm:text-xl text-se-white">
                            <a href="" class="hover:underline"> Crazy? </a>
                        </h3>

                        <p class="mt-1 text-sm text-se-gray-light brightness-90">
                            Crazy? I was crazy once. They locked me in a room. A rubber room! A rubber room with rats,and
                            rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room! A rubber
                            room with rats,and rats make me crazy. Crazy? I was crazy once. They locked me in a room. A
                            rubber room! A rubber room with rats,and rats make me crazy. Crazy? I was crazy once. They
                            locked me in a room. A rubber room! A rubber room with rats,and rats make me crazy. Crazy? I was
                            crazy once. They locked me in a room. A rubber room! A rubber room with rats,and rats make me
                            crazy.
                        </p>

                        <p class="mt-1 text-sm text-se-gray-light brightness-90">LINK</p>

                        <div class="mt-4 sm:flex sm:items-center sm:gap-2">
                            <div class="flex items-center gap-1 text-se-white">
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>

                                <p class="text-xs font-medium text-se-white">99/99/9999</p>

                            </div>
                            <p class="text-xs font-medium text-se-gray-light brightness-90 ">Some Prof</p>

                            <span class="hidden sm:block text-se-gray-light brightness-90"
                                aria-hidden="true">&middot;</span>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </div>
</template>