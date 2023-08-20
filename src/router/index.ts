import { createRouter, createWebHistory } from 'vue-router'
import StudentListView from '../views/StudentListView.vue'
import StudentDetailView from '../views/details/StudentDetailView.vue'
import AdvisorsListView from '../views/AdvisorListView.vue'
import AdvisorDetailView from '@/views/details/AdvisorDetailView.vue'
import NProgress from 'nprogress'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/students',
      name: 'studentList',
      component: StudentListView
    },
    {
      path: '/adviors',
      name: 'advisors',
      component: AdvisorsListView
    },
    {
      path: '/studentDetail',
      name: 'studentDetail',
      component: StudentDetailView
    },
    {
      path: '/advisors/adviorDetail',
      name: 'advisorDetail',
      component: AdvisorDetailView
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
