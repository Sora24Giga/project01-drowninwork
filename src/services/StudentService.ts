import type {StudentDetail, StudentReg} from '@/type'
import apiClient from "@/services/AxiosClient";
import type {AxiosResponse} from "axios";

export default {
    getStudents(perPage: number, page: number): Promise<AxiosResponse<StudentDetail[]>> {
        return apiClient.get<StudentDetail[]>('/students?_limit=' + perPage + '&_page=' + page)
    },
    getStudentList(): Promise<AxiosResponse<StudentDetail[]>> {
        return apiClient.get<StudentDetail[]>('/students')
    },
    getStudentsById(id: number): Promise<AxiosResponse<StudentDetail>> {
        return apiClient.get<StudentDetail>('/students/' + id.toString())
    },
    saveStudent(student: StudentReg): Promise<AxiosResponse<StudentDetail>> {
        return apiClient.post<StudentDetail>('/students', student)
    },
    getStudentsByKeyword(keyword: string, perPage: number, page: number): Promise<AxiosResponse<StudentDetail[]>> {
        return apiClient.get<StudentDetail[]>('/students?title=' + keyword + '&_limit=' + perPage + '&_page=' + page)
    }
}