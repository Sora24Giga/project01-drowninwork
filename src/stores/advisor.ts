import type { AdvisorDetail } from '@/type'
import { defineStore } from 'pinia'
export const useAdvisorStore = defineStore('event', {
    state: () => ({
        advisor: null as AdvisorDetail | null
    }),
    actions: {
        setAdvisor(advisor: AdvisorDetail) {
            this.advisor = advisor
        }
    }
})