import {defineStore} from 'pinia'
import axios from 'axios'
import type {AxiosInstance} from "axios";
import type {AdvisorDetail, StudentDetail} from "@/type";

const apiClient: AxiosInstance = axios.create ({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null as string | null,
        userStudent: null as StudentDetail | null,
        userTeacher: null as AdvisorDetail | null
    }),
    getters: {
        currentUserName () : string {
            return this.userStudent?.firstname || this.userTeacher?.firstname || ''
        },
        isAdmin () : boolean {
            return this.userStudent?.roles.includes('ROLE_ADMIN') || this.userTeacher?.roles.includes('ROLE_ADMIN') || false
        }
    },
    actions: {
        login(username: string, password: string) {
            return apiClient
                .post('/api/v1/auth/authenticate', {
                    username: username,
                    password: password
                })
                .then((response)=> {
                    this.token = response.data.access_token
                    this.userStudent = response.data.userStudent
                    this.userTeacher = response.data.userTeacher
                    localStorage.setItem('access_token', this.token as string)
                    localStorage.setItem('userStudent', JSON.stringify(this.userStudent))
                    localStorage.setItem('userTeacher', JSON.stringify(this.userTeacher))
                    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
                    console.log(response)
                    return response
                })
        },
        logout() {
            console.log('logout')
            this.token = null
            this.userStudent = null
            this.userTeacher = null
            localStorage.removeItem('access_token')
            localStorage.removeItem('userStudent')
            localStorage.removeItem('userTeacher')
        },
        reload(token: string, userStudent: StudentDetail, userTeacher: AdvisorDetail) {
            this.token = token
            this.userStudent = userStudent
            this.userTeacher = userTeacher
        }
    }
})