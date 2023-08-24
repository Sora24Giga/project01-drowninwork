import type { StudentDetail } from '@/type'
import { defineStore } from 'pinia'
export const useStudentStore = defineStore('student', {
    state: () => ({
        student: null as StudentDetail | null
    }),
    actions: {
        setStudent(student: StudentDetail) {
            this.student = student
        }
    }
})