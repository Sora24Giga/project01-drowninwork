import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'

import StudentListView from '../views/StudentListView.vue'
import AdvisorsListView from '../views/AdvisorListView.vue'

import StudentDetailView from '../views/details/StudentDetailView.vue'
import AdvisorDetailView from '@/views/details/AdvisorDetailView.vue'

import NotFoundView from '../views/NotFoundView.vue'
import NetworkErrorView from '../views/NetworkErrorView.vue'

import { useStudentStore } from '@/stores/student'
import StudentService from '@/services/StudentService'
import CommentService from '@/services/CommentService'
import { useAdvisorStore } from '@/stores/advisor'
import { useCommentHistoryStore } from '@/stores/commentHistory'
import AdvisorService from '@/services/AdvisorService'
import StudentFormView from "@/views/details/StudentFormView.vue";
import AdvisorFormView from "@/views/details/AdvisorFormView.vue";
import LoginView from "@/views/LoginView.vue";
import RegistrationView from "@/views/RegistrationView.vue";
import UserRegister from "@/views/UserRegister.vue";
import AdvisorDetailInvulnerableView from "@/views/details/AdvisorDetailInvulnerableView.vue";
import CommentViewVue from '@/views/CommentView.vue'
import AnnouncementListView from '@/views/AnnouncementListView.vue'
import AnnouncementFormView from '@/views/details/AnnouncementFormView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/comment/:id',
      name: 'comment',
      component: CommentViewVue,
      props: true,
      beforeEnter: (to) => {
        const id: number = parseInt(to.params.id as string)
        const commentHistoryStore = useCommentHistoryStore()
        CommentService.getCommentHistoryById(id)
          .then((response) => {
            console.log(response.data)
            commentHistoryStore.setCommentHistory(response.data)
            StudentService.getStudentsById(response.data.adviseeId)
              .then((resp) => {
                commentHistoryStore.setStudent(resp.data)
              })
              .catch((err) => {
                if (err.response && err.response.status === 404) {
                  router.push({ name: '404-resource', params: { resource: 'comment history' } })
                } else {
                  router.push({ name: 'network-error' })
                }
              })

          })
          .catch(error => {
            console.log(error)
            if (error.response && error.response.status === 404) {
              router.push({ name: '404-resource', params: { resource: 'comment history' } })
            } else {
              router.push({ name: 'network-error' })
            }
          })
      },
    },
    {
      path: '/annoucement',
      name: 'annoucement',
      component: AnnouncementListView,
      props: (route) => ({ limit: parseInt(route.query?.limit as string || '5'), page: parseInt(route.query?.page as string || '1') })
    },
    {
      path: '/',
      name: 'studentList',
      component: StudentListView,
      props: (route) => ({ limit: parseInt(route.query?.limit as string || '5'), page: parseInt(route.query?.page as string || '1') })
    },
    {
      path: '/advisors',
      name: 'advisors',
      component: AdvisorsListView,
      props: (route) => ({ limit: parseInt(route.query?.limit as string || '5'), page: parseInt(route.query?.page as string || '1') })
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/students/:id',
      name: 'studentDetail',
      component: StudentDetailView,
      props: true,
      beforeEnter: (to) => {
        const id: number = parseInt(to.params.id as string)
        const studentStore = useStudentStore()
        StudentService.getStudentsById(id)
          .then((response) => {
            studentStore.setStudent(response.data)
            if (response.data.advisor !== null && response.data.advisor.id !== 0) {
              CommentService.getCommentHistoryByKeyword(response.data.advisor.id, response.data.id, 1, 1)
                .then((commentResponse) => {
                  console.log(commentResponse.data[0])
                  studentStore.setCommentHistory(commentResponse.data[0])
                })
                .catch(error => {
                  console.log(error)
                  if (error.response && error.response.status === 404) {
                    router.push({ name: '404-resource', params: { resource: 'student' } })
                  } else {
                    router.push({ name: 'network-error' })
                  }
                })
            }
          })
          .catch(error => {
            console.log(error)
            if (error.response && error.response.status === 404) {
              router.push({ name: '404-resource', params: { resource: 'student' } })
            } else {
              router.push({ name: 'network-error' })
            }
          })
      },
    },
    {
      path: '/advisors/:id',
      name: 'advisorDetail',
      component: AdvisorDetailView,
      props: true,
      beforeEnter: (to) => {
        const id: number = parseInt(to.params.id as string)
        const advisorStore = useAdvisorStore()
        AdvisorService.getAdvisorsById(id)
          .then((response) => {
            advisorStore.setAdvisor(response.data)
          })
          .catch(error => {
            console.log(error)
            if (error.response && error.response.status === 404) {
              router.push({ name: '404-resource', params: { resource: 'advisor' } })
            } else {
              router.push({ name: 'network-error' })
            }
          })
      },
    },
    {
      path: '/advisors/:id',
      name: 'finalAdvisor',
      component: AdvisorDetailInvulnerableView,
      props: true,
      beforeEnter: (to) => {
        const id: number = parseInt(to.params.id as string)
        const advisorStore = useAdvisorStore()
        AdvisorService.getAdvisorsById(id)
          .then((response) => {
            advisorStore.setAdvisor(response.data)
          })
          .catch(error => {
            console.log(error)
            if (error.response && error.response.status === 404) {
              router.push({ name: '404-resource', params: { resource: 'advisor' } })
            } else {
              router.push({ name: 'network-error' })
            }
          })
      },
    },
    {
      path: '/register',
      name: 'register',
      component: UserRegister
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationView
    },
    {
      path: '/add-announcement',
      name: 'add-announcement',
      component: AnnouncementFormView
    },
    {
      path: '/add-student',
      name: 'add-student',
      component: StudentFormView
    },
    {
      path: '/add-advisor',
      name: 'add-advisor',
      component: AdvisorFormView
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkErrorView
    }
  ]
})

router.beforeEach(() => {
  NProgress.start()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
