import axios from 'axios'
import type { AxiosInstance, AxiosResponse} from 'axios'
import type { StudentDetail } from '@/type'

const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3004',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'ContentType': 'application/json'
    }
})

export default {
    getPassengers(): Promise<AxiosResponse<StudentDetail[]>> {
        return apiClient.get<StudentDetail[]>('/students')
    },
    getPassengersById(id: number): Promise<AxiosResponse<StudentDetail>>{
        return apiClient.get<StudentDetail>('students/'+id.toString)
    },
}