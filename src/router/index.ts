import { createRouter, createWebHistory } from 'vue-router'
import StudentListView from '../views/StudentListView.vue'
import StudentDetailView from '../views/details/StudentDetailView.vue'
import AdvisorsListView from '../views/AdvisorListView.vue'
import AdvisorDetailView from '@/views/details/AdvisorDetailView.vue'
import NProgress from 'nprogress'
import NotFoundView from '../views/NotFoundView.vue'
import NetworkErrorView from '../views/NetworkErrorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/students',
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
      path: '/students/:id',
      name: 'studentDetail',
      component: StudentDetailView
    },
    {
      path: '/advisors/advisorDetail',
      name: 'advisorDetail',
      component: AdvisorDetailView
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
