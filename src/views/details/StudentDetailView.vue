<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useStudentStore } from '@/stores/student'
import { useMessageStore } from '@/stores/message'
import { type StudentDetail } from '@/type'
import BaseInput from '@/components/BaseInput.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import StudentService from '@/services/StudentService'

const updating = ref(false)
const router = useRouter()
const store = useStudentStore()
const msgStore = useMessageStore()
const student = storeToRefs(store).student
const studentUpdated = ref<StudentDetail>({
  id: 0,
  studentId: '',
  studentPw: '',
  firstname: '',
  surname: '',
  department: '',
  advisor: {
    id: 0,
    academicPosition: '',
    firstname: '',
    surname: '',
    department: '',
    advisee: [],
    images: []
  },
  images: [],
  comment: []
})
let comments = ref(store.getComment(student.value.id))
const inputComment = ref('')
function changeUpdating() {
  if (updating.value) {
    updating.value = false
  } else {
    updating.value = true
  }
  console.log(updating.value)
}
function updateInfo() {
  if (student.value !== null) {
    const newVal = studentUpdated.value
    const oldVal = student.value
    newVal.id = oldVal.id
    newVal.advisor = oldVal.advisor
    newVal.studentPw = oldVal.studentPw
    if (newVal.studentId === '') {
      newVal.studentId = oldVal.studentId
    }
    if (newVal.firstname === '') {
      newVal.firstname = oldVal.firstname
    }
    if (newVal.surname === '') {
      newVal.surname = oldVal.surname
    }
    if (newVal.department === '') {
      newVal.department = oldVal.department
    }
    if (newVal.images.length === 0) {
      newVal.images = oldVal.images
    }
    StudentService.saveStudent(studentUpdated.value)
      .then((response) => {
        console.log(response.data)
        router.go(0)
        msgStore.updateMessage('You have successfully update ' + response.data.firstname)
        setTimeout(() => {
          msgStore.restMessage()
        }, 3000)
      })
      .catch(() => {
        router.push({ name: 'network-error' })
      })
  }
}

function testReview() {
  if (inputComment.value !== '') {
    store.addComment(student.value?.id, inputComment.value)
    comments.value = store.getComment(student.value.id)
    console.log(store.studentList)
  }
}
</script>

<template>
  <div class="student-box mt-[108px] flex justify-center lg:mt-[60px]">
    <div class="mb-[20px] flex h-full w-[80%] justify-center bg-se-dark p-[20px] lg:ml-[20%]">
      <div class="flex w-[60%] min-w-[216px] max-w-[500px] flex-col justify-center">
        <p
          class="h-[60px] w-full self-center bg-[#312f2f3a] py-[15px] text-center font-medium text-se-light-gray shadow-[0_3px_12px_0_rgba(0,0,0,0.2)]"
        >
          STUDENT INFO
        </p>
        <div
          v-if="student"
          class="mb-[18px] mt-0 w-full bg-[#f2f2f208] p-[20px] text-center text-se-light-gray shadow-[0_3px_12px_0_rgba(0,0,0,0.2)]"
        >
          <span class="text-xl font-semibold"
            >{{ student.firstname.toLocaleUpperCase() }}
            {{ student.surname.toLocaleUpperCase() }}</span
          >
          <div class="mx-auto mt-6 mb-8 overflow-hidden rounded-full w-fit">
            <div class="flex flex-row flex-wrap justify-center">
              <div v-if="student.images.length !== 0">
                <img
                  v-for="image in student.images"
                  :key="image"
                  :src="image"
                  alt="advisors image"
                  class="w-40 p-1 m-1 border-2 border-gray-200 border-solid hover:shadow-lg"
                />
              </div>
              <div
                v-else
                class="relative inline-flex items-center justify-center w-32 h-32 overflow-hidden bg-se-light-gray"
              >
                <span class="text-5xl font-semibold text-se-dark">
                  {{ student.firstname.charAt(0).toLocaleUpperCase()
                  }}{{ student.surname.charAt(0).toLocaleUpperCase() }}
                </span>
              </div>
            </div>
          </div>
          <div class="mx-auto w-[80%] border-t-2 border-se-light-gray pt-4 text-left">
            <form @submit.prevent="updateInfo">
              <div class="flex w-full justify-evenly">
                <span class="w-1/2 font-semibold">Student ID:</span>
                <span v-if="updating === false" class="w-1/2">{{ student.studentId }}</span>
                <BaseInput
                  v-else
                  type="text"
                  :placeholder="student.studentId"
                  v-model="studentUpdated.studentId"
                  class="w-1/2 h-auto mb-1 rounded text-se-dark"
                />
              </div>
              <div class="flex w-full justify-evenly">
                <span class="w-1/2 font-semibold">First Name:</span>
                <span v-if="updating === false" class="w-1/2">{{ student.firstname }}</span>
                <BaseInput
                  v-else
                  type="text"
                  :placeholder="student.firstname"
                  v-model="studentUpdated.firstname"
                  class="w-1/2 h-auto mb-1 rounded text-se-dark"
                />
              </div>
              <div class="flex w-full justify-evenly">
                <span class="w-1/2 font-semibold">Last Name:</span>
                <span v-if="updating === false" class="w-1/2">{{ student.surname }}</span>
                <BaseInput
                  v-else
                  type="text"
                  :placeholder="student.surname"
                  v-model="studentUpdated.surname"
                  class="w-1/2 h-auto mb-1 rounded text-se-dark"
                />
              </div>
              <div class="flex w-full justify-evenly">
                <span class="w-1/2 font-semibold">Department:</span>
                <span v-if="updating === false" class="w-1/2">{{ student.department }}</span>
                <BaseInput
                  v-else
                  type="text"
                  :placeholder="student.department"
                  v-model="studentUpdated.department"
                  class="w-1/2 h-auto mb-1 rounded text-se-dark"
                />
              </div>
              <ImageUpload v-if="updating" v-model="studentUpdated.images" class="mb-4" />
              <button
                v-if="updating"
                class="group ml-auto flex items-center justify-between gap-4 rounded-lg border border-current bg-se-black1800 px-5 py-3 transition hover:scale-[1.05] hover:bg-se-color focus:outline-none focus:ring active:bg-se-color-light"
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
          <button :onClick="changeUpdating"
            class="ml-auto flex flex-row p-2 font-semibold text-se-light-gray transition hover:scale-[1.05] hover:text-se-color-light">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"
              class="h-4 my-auto mr-2 fill-current">
              <path
                d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
            </svg>
            <span v-if="updating"> Stop Editing </span>
            <span v-else> Edit </span>
          </button>
        </div>
        <RouterLink v-if="student.advisor !== null"
          :to="{ name: 'advisorDetail', params: { id: student?.advisor.id } }"
          class="h-[50px] w-full bg-[#f2f2f208] px-[20px] py-[10px] text-center font-medium text-se-light-gray shadow-[0_3px_12px_0_rgba(0,0,0,0.2)] transition hover:scale-[1.01] hover:text-se-color-light"
        >
          <span class="w-1/2"
            >Advisor: {{ student?.advisor.firstname }} {{ student?.advisor.surname }}</span
          >
        </RouterLink>
        <p
          class="h-[50px] w-full bg-[#312f2f3a] px-[20px] py-[10px] text-center text-se-light-gray shadow-[0_3px_12px_0_rgba(0,0,0,0.2)]"
        >
          Advisor's Comment
        </p>
        <textarea
          id="commentTextArea"
          v-model="inputComment"
          placeholder="Add a comment here."
          class="mt-0 h-[200px] w-full border-2 border-solid border-se-light-gray bg-[#f2f2f208] p-[20px] text-se-light-gray shadow-[0_3px_12px_0_rgba(0,0,0,0.2)] focus:animate-pulse focus:text-se-white"
        ></textarea>
        <button
          @click="testReview"
          class="mt-1 w-[70%] self-center bg-se-color text-se-light-gray transition hover:scale-[1.01] hover:bg-se-color-light hover:text-se-white"
        >
          Add
        </button>
        <div class="mt-1 w-full text-se-light-gray shadow-[0_3px_12px_0_rgba(0,0,0,0.2)]">
          <div
            :key="comment"
            v-for="comment in comments"
            :comment="comment"
            class="mb-2 bg-[#f2f2f208] p-[20px]"
          >
            <p>{{ comment }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
