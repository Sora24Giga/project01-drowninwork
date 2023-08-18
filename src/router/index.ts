import { createRouter, createWebHistory } from 'vue-router'
import StudentListView from '../views/StudentListView.vue'
import StudentDetailView from '../views/details/StudentDetailView.vue'
import AdvisorsListView from '../views/AdvisorListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'studentlist',
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
    }
  ]
})

export default router
