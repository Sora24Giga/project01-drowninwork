import type { CommentHistory, StudentDetail } from '@/type'
import { defineStore } from 'pinia'
export const useStudentStore = defineStore('student', {
    state: () => ({
        student: {} as StudentDetail,
        studentList: [] as StudentDetail[],
        commentHistory: {} as CommentHistory
    }),
    getters: {
        getComment: (state) => {
            return (id: number) => state.studentList.find((o) => o.id === id)?.comment
        }
    },
    actions: {
        setStudent(student: StudentDetail) {
            this.student = student
        },
        setStudentList(studentList: StudentDetail[]) {
            this.studentList = studentList
        },
        setCommentHistory(commentHistory: CommentHistory){
            this.commentHistory = commentHistory
        },
        addComment(id: number, newComment: string) {
            const finding = this.studentList.findIndex(o => {
                return o.id === id
            })
            if (!(finding === -1)) {
                this.studentList[finding].comment.push(newComment)
            }

        }
    }
})