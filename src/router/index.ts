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
import { useAdvisorStore } from '@/stores/advisor'
import AdvisorService from '@/services/AdvisorService'
import StudentFormView from "@/views/details/StudentFormView.vue";
import AdvisorFormView from "@/views/details/AdvisorFormView.vue";
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'studentList',
      component: StudentListView,
      props: (route) => ({ limit: parseInt(route.query?.limit as string || '7'), page: parseInt(route.query?.page as string || '1') })
    },
    {
      path: '/advisors',
      name: 'advisors',
      component: AdvisorsListView,
      props: (route) => ({ limit: parseInt(route.query?.limit as string || '7'), page: parseInt(route.query?.page as string || '1') })
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
      path: '/add-student',
      name: 'add-student',
      component : StudentFormView
    },
    {
      path: '/add-advisor',
      name: 'add-advisor',
      component : AdvisorFormView
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
