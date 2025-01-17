<script setup lang="ts">
import { ref } from 'vue'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useStudentStore } from '@/stores/student'
import { useMessageStore } from '@/stores/message'
import type { StudentDetail, AdvisorDetail, Comment, CommentHistory } from '@/type'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import CommentBox from '@/components/CommentBox.vue'
import StudentService from '@/services/StudentService'
import AdvisorService from '@/services/AdvisorService'
import CommentService from '@/services/CommentService'
import type { AxiosResponse } from 'axios'
import { useAuthStore } from '@/stores/auth'
import { notify } from '@kyvg/vue3-notification'

const authStore = useAuthStore()
const updating = ref(false)
const router = useRouter()
const store = useStudentStore()
const msgStore = useMessageStore()
const student = storeToRefs(store).student
const studentUpdated = ref<StudentDetail>({
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
  images: [],
  comment: [],
  id: 0,
  studentId: '',
  firstname: '',
  surname: '',
  department: '',
  roles: [],
  password: ''
})
const commentHistory = storeToRefs(store).commentHistory
const advisors = ref<AdvisorDetail[]>([])

AdvisorService.getAdvisorlist()
  .then((response) => {
    advisors.value = response.data
  })
  .catch(() => {
    router.push({ name: 'network-error' })
  })

function changeUpdating() {
  if (updating.value) {
    updating.value = false
  } else {
    updating.value = true
  }
  console.log(updating.value)
  console.log(studentUpdated.value)
}
const emit = defineEmits(['forceRerender'])
function updateInfo() {
  if (student.value !== null) {
    StudentService.getStudentsById(student.value.id)
      .then((response) => {
        console.log(response.data)
        studentUpdated.value.id = response.data.id
        if (studentUpdated.value.studentId === '') {
          studentUpdated.value.studentId = response.data.studentId
        }
        if (studentUpdated.value.firstname === '') {
          studentUpdated.value.firstname = response.data.firstname
        }
        if (studentUpdated.value.surname === '') {
          studentUpdated.value.surname = response.data.surname
        }
        if (studentUpdated.value.department === '') {
          studentUpdated.value.department = response.data.department
        }
        if (studentUpdated.value.images.length === 0) {
          studentUpdated.value.images = response.data.images
        }
        if (authStore.isStudent && response.data.advisor !== null) {
          // console.log('changed')
          studentUpdated.value.advisor = response.data.advisor
        }
        // console.log(studentUpdated.value)
        StudentService.saveStudent(studentUpdated.value)
          .then((response) => {
            if (response.data.advisor !== null && response.data.advisor.id !== 0) {
              CommentService.saveCommentHistory({
                id: 0,
                history: [],
                advisorId: response.data.advisor.id,
                adviseeId: response.data.id
              }).catch((e) => {
                console.log(e)
                router.push({ name: 'network-error' })
              })
            }
            emit('forceRerender')
            router.go(0)
            notify({
              title: 'Registration',
              text: 'Student has been updated!',
              type: 'success'
            })
            // console.log(response.data)
            msgStore.updateMessage('You have successfully update ' + response.data.firstname)
            setTimeout(() => {
              msgStore.restMessage()
            }, 3000)
          })
          .catch(() => {
            router.push({ name: 'network-error' })
          })
      })
      .catch(() => {
        router.push({ name: 'network-error' })
      })
  }
}
</script>

<template>
  <div class="student-box mt-[108px] flex justify-center lg:ml-[17%] lg:mt-[60px]">
    <div
      class="mx-auto mb-[20px] flex h-full w-full flex-col bg-se-dark p-[20px] lg:w-[80%] lg:flex-row"
    >
      <!-- Info -->
      <div class="mx-auto flex w-[90%] min-w-[216px] flex-col lg:w-[60%]">
        <p
          class="h-[60px] w-full self-center bg-[#312f2f3a] py-[15px] text-center font-medium text-se-gray-light shadow-[0_3px_12px_0_rgba(0,0,0,0.2)]"
        >
          STUDENT INFO
        </p>
        <div
          v-if="student"
          class="mb-[18px] mt-0 w-full bg-[#f2f2f208] p-[20px] text-center text-se-gray-light shadow-[0_3px_12px_0_rgba(0,0,0,0.2)]"
        >
          <span class="text-xl font-semibold">
            {{ student.firstname.toUpperCase() }} {{ student.surname.toUpperCase() }}
          </span>
          <div class="mx-auto mt-6 mb-8 overflow-hidden w-fit">
            <div class="flex flex-row flex-wrap justify-center">
              <div v-if="student.images.length !== 0">
                <img
                  v-for="image in student.images"
                  :key="image"
                  :src="image"
                  alt="advisors image"
                  class="border-gray-200 m-1 w-40 rounded-[50%] border-2 border-solid p-1 hover:shadow-lg"
                />
              </div>
              <div
                v-else
                class="relative inline-flex items-center justify-center w-32 h-32 overflow-hidden rounded-full bg-se-gray-light"
              >
                <span class="mx-auto text-5xl font-semibold text-se-dark">
                  {{ student.firstname.charAt(0).toUpperCase()
                  }}{{ student.surname.charAt(0).toUpperCase() }}
                </span>
              </div>
            </div>
          </div>
          <div class="mx-auto w-[80%] border-t-2 border-se-gray-light pt-4 text-left">
            <form @submit.prevent="updateInfo">
              <div class="flex flex-col w-full mb-1 justify-evenly sm:flex-row">
                <span class="font-semibold sm:w-1/2">Student ID:</span>
                <span class="sm:w-1/2">{{ student.studentId }}</span>
              </div>
              <div class="flex flex-col w-full mb-1 justify-evenly sm:flex-row">
                <span class="font-semibold sm:w-1/2">First Name:</span>
                <span v-if="authStore.isAdmin || updating === false" class="sm:w-1/2">{{
                  student.firstname
                }}</span>
                <BaseInput
                  v-else
                  type="text"
                  :placeholder="student.firstname"
                  v-model="studentUpdated.firstname"
                  class="h-auto rounded text-se-dark sm:w-1/2"
                />
              </div>
              <div class="flex flex-col w-full mb-1 justify-evenly sm:flex-row">
                <span class="font-semibold sm:w-1/2">Last Name:</span>
                <span v-if="authStore.isAdmin || updating === false" class="sm:w-1/2">{{
                  student.surname
                }}</span>
                <BaseInput
                  v-else
                  type="text"
                  :placeholder="student.surname"
                  v-model="studentUpdated.surname"
                  class="h-auto rounded text-se-dark sm:w-1/2"
                />
              </div>
              <div class="flex flex-col w-full mb-1 justify-evenly sm:flex-row">
                <span class="font-semibold sm:w-1/2">Department:</span>
                <span v-if="authStore.isAdmin || updating === false" class="sm:w-1/2">{{
                  student.department
                }}</span>
                <BaseInput
                  v-else
                  type="text"
                  :placeholder="student.department"
                  v-model="studentUpdated.department"
                  class="h-auto rounded text-se-dark sm:w-1/2"
                />
              </div>
              <div class="flex flex-col w-full mb-3 justify-evenly sm:flex-row">
                <span class="font-semibold sm:w-1/2">Advisor:</span>
                <span
                  v-if="(authStore.isStudent || updating === false) && student.advisor !== null"
                  class="sm:w-1/2"
                >
                  <RouterLink
                    v-if="(authStore.isStudent || updating === false) && student.advisor !== null"
                    :to="{ name: 'advisorDetail', params: { id: student?.advisor.id } }"
                    class="transition hover:scale-[1.02] hover:text-se-color-light"
                  >
                    <span class="underline underline-offset-4"
                      >{{ student?.advisor.firstname }} {{ student?.advisor.surname }}</span
                    >
                  </RouterLink>
                </span>
                <span
                  v-else-if="
                    (authStore.isStudent || updating === false) && student.advisor === null
                  "
                  class="sm:w-1/2"
                >
                  -
                </span>
                <BaseSelect
                  v-else-if="updating === true && authStore.isAdmin"
                  v-model="studentUpdated.advisor!.id"
                  :options="advisors"
                  :key-extractor="(x) => x.id"
                  :value-extractor="(x) => x.id"
                  :text-extractor="(x) => x.firstname + ' ' + x.surname"
                  label=""
                  class="py-2 rounded text-se-dark sm:w-1/2"
                />
              </div>
              <span class="font-semibold" v-if="updating && authStore.isStudent">Image:</span>
              <ImageUpload
                v-if="updating && authStore.isStudent"
                v-model="studentUpdated.images"
                class="mb-4"
              />

              <button
                v-if="updating"
                class="group ml-auto mt-2 flex items-center justify-between gap-4 rounded-lg border border-current bg-se-black1800 px-5 py-3 transition hover:scale-[1.05] hover:bg-se-color focus:outline-none focus:ring active:bg-se-color-light"
                type="submit"
              >
                <span class="font-medium transition-colors text-se-white"> Update </span>

                <span
                  class="p-2 border border-indigo-600 rounded-full group-active:border-indigo-500 shrink-0 bg-se-black1800"
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
            </form>
          </div>
          <br />
          <button
            v-if="!authStore.isTeacher"
            :onClick="changeUpdating"
            class="ml-auto flex flex-row p-2 font-semibold text-se-gray-light transition hover:scale-[1.05] hover:text-se-color-light"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
              class="h-4 my-auto mr-2 fill-current"
            >
              <path
                d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
              />
            </svg>
            <span v-if="updating"> Stop Editing </span>
            <span v-else> Edit </span>
          </button>
        </div>
      </div>

      <!-- Comment -->
      <div
        class="mx-auto w-[90%] lg:ml-4 lg:mt-[60px] lg:w-[60%]"
        v-if="student.advisor !== null && student.advisor.id !== 0"
      >
        <RouterLink :to="{ name: 'comment', params: { id: commentHistory?.id } }">
          <div
            class="h-[60px] w-full bg-[#312f2f3a] px-[20px] py-[10px] text-center font-medium text-se-gray-light shadow-[0_3px_12px_0_rgba(0,0,0,0.2)] transition hover:scale-[1.01] hover:text-se-color-light"
          >
            ADVISOR'S COMMENTS
            <p class="text-xs font-normal text-se-gray-light">click here for full view</p>
          </div>
        </RouterLink>

        <div class="h-[460px] w-full shadow-[0_3px_12px_0_rgba(0,0,0,0.2)]">
          <!-- <RouterLink :to="{ name: 'comment', params: { id: commentHistory?.id } }"> -->
          <CommentBox
            :advisee-name="student.firstname + ' ' + student.surname"
            :advisor-name="student.advisor.firstname + ' ' + student.advisor.surname"
            :commentHistory="commentHistory"
            :inputBox="!authStore.isAdmin"
            :advisorView="!authStore.isStudent"
          />
          <!-- </RouterLink> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
