import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type {StudentDetail, StudentReg} from '@/type'

const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3003',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'ContentType': 'application/json'
    }
})

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
    saveEvent(student: StudentReg): Promise<AxiosResponse<StudentDetail>> {
        return apiClient.post<StudentDetail>('/students_reg', student)
    }
}