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
      meta:{
        requiresAuth: true
      },
      beforeEnter: async (to) => {
        const id: number = parseInt(to.params.id as string)
        const studentStore = useStudentStore()
        await CommentService.getCommentHistoryById(id)
        .then((commentResponse) => {
          // console.log(commentResponse.data[0])
          studentStore.setCommentHistory(commentResponse.data)
          // console.log(studentStore.commentHistory)
          
        })
        .catch(error => {
          console.log(error)
          if (error.response && error.response.status === 404) {
            router.push({ name: '404-resource', params: { resource: 'student' } })
          } else {
            router.push({ name: 'network-error' })
          }
        })
        await StudentService.getStudentsById(studentStore.commentHistory.adviseeId)
          .then((rep) => {
            studentStore.setStudent(rep.data)
            console.log(rep.data)
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
      path: '/announcement',
      name: 'announcement',
      component: AnnouncementListView,
      meta:{
        requiresAuth: true
      },
      props: (route) => ({ limit: parseInt(route.query?.limit as string || '5'), page: parseInt(route.query?.page as string || '1') })
    },
    {
      path: '/',
      name: 'studentList',
      component: StudentListView,
      meta:{
        requiresAuth: true
      },
      props: (route) => ({ limit: parseInt(route.query?.limit as string || '5'), page: parseInt(route.query?.page as string || '1') })
    },
    {
      path: '/advisors',
      name: 'advisors',
      component: AdvisorsListView,
      meta:{
        requiresAuth: true
      },
      props: (route) => ({ limit: parseInt(route.query?.limit as string || '5'), page: parseInt(route.query?.page as string || '1') })
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta:{
        requiresAuth: false
      },
    },
    {
      path: '/students/:id',
      name: 'studentDetail',
      component: StudentDetailView,
      props: true,
      meta:{
        requiresAuth: true
      },
      beforeEnter: (to) => {
        const id: number = parseInt(to.params.id as string)
        const studentStore = useStudentStore()
        StudentService.getStudentsById(id)
          .then((response) => {
            // console.log(response.data)
            studentStore.setStudent(response.data)
            if (response.data.advisor !== null && response.data.advisor.id !== 0) {
              CommentService.getCommentHistoryByKeyword(response.data.advisor.id, response.data.id, 1, 1)
                .then((commentResponse) => {
                  // console.log(commentResponse.data[0])
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
      meta:{
        requiresAuth: true
      },
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
      meta:{
        requiresAuth: true
      },
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
      component: UserRegister,
      meta:{
        requiresAuth: false
      },
    },
    {
      path: '/add-announcement',
      name: 'add-announcement',
      component: AnnouncementFormView,
      meta:{
        requiresAuth: true
      },
    },
    {
      path: '/add-student',
      name: 'add-student',
      meta:{
        requiresAuth: true
      },
      component: StudentFormView
    },
    {
      path: '/add-advisor',
      name: 'add-advisor',
      component: AdvisorFormView,
      meta:{
        requiresAuth: true
      },
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true,
      meta:{
        requiresAuth: false
      },
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
      meta:{
        requiresAuth: false
      },
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkErrorView,
      meta:{
        requiresAuth: false
      },
    }
  ]
})

const isLoggedIn = () => {
  return localStorage.getItem('access_token') && localStorage.getItem('user')
}

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  console.log(isLoggedIn())
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!isLoggedIn()){
      next({name: 'login'})
    } else {
      next()
    }
  } else {
    next()
  }

})
router.afterEach(() => {
  NProgress.done()
})

export default router
