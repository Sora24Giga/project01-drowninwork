import type {Comment, CommentHistory} from '@/type'
import apiClient from "@/services/AxiosClient";
import type {AxiosResponse} from "axios";

export default {
    //Comment
    getAllComment(): Promise<AxiosResponse<Comment[]>> {
        return apiClient.get<Comment[]>('/comments')
    },
    getCommentsById(id: number): Promise<AxiosResponse<Comment>> {
        return apiClient.get<Comment>('/comments/' + id.toString())
    },
    saveComment(comment: Comment): Promise<AxiosResponse<Comment>> {
        return apiClient.post<Comment>('comments', comment)
    },
    //History
    getAllCommentHistory(): Promise<AxiosResponse<CommentHistory[]>> {
        return apiClient.get<CommentHistory[]>('/history')
    },
    getCommentHistoryById(id: number): Promise<AxiosResponse<CommentHistory>> {
        return apiClient.get<CommentHistory>('/history/' + id.toString())
    },
    saveCommentHistory(commentHistory: CommentHistory): Promise<AxiosResponse<CommentHistory>> {
        return apiClient.post<CommentHistory>('history', commentHistory)
    },
    getCommentHistoryByKeyword(advisorId: number, adviseeId: number, perPage: number, page: number): Promise<AxiosResponse<CommentHistory[]>> {
        return apiClient.get<CommentHistory[]>('/history?advisorId=' + advisorId + '&adviseeId=' + adviseeId + '&_limit=' + perPage + '&_page=' + page)
    }
}