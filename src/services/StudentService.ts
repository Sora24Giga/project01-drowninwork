import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type {StudentDetail, StudentReg} from '@/type'

const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
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
    saveStudent(student: StudentReg): Promise<AxiosResponse<StudentDetail>> {
        return apiClient.post<StudentDetail>('/students_reg', student)
    }
}