import type { Comment, CommentHistory, StudentDetail } from '@/type'
import { defineStore } from 'pinia'

export const useCommentHistoryStore = defineStore('event', {
    state: () => ({
        commentHistory: {} as CommentHistory,
        student: {} as StudentDetail
    }),
    actions: {
        setCommentHistory(commentHistory: CommentHistory) {
            this.commentHistory = commentHistory
        },
        setStudent(student: StudentDetail) {
            this.student = student
        }
    }
})

export const useCommentStore = defineStore('event', {
    state: () => ({
        comment: null as Comment | null
    }),
    actions: {
        setCommentHistory(comment: Comment) {
            this.comment = comment
        }
    }
})