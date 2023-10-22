import type { Comment, CommentHistory } from '@/type'
import { defineStore } from 'pinia'
export const useCommentHistoryStore = defineStore('event', {
    state: () => ({
        commentHistory: {} as CommentHistory
    }),
    actions: {
        setCommentHistory(commentHistory: CommentHistory) {
            this.commentHistory = commentHistory
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