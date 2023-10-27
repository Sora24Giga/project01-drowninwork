import {defineStore} from 'pinia'
import axios from 'axios'
import type {AxiosInstance} from "axios";
import type {PersonDetail} from "@/type";

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
        user: null as PersonDetail | null
    }),
    getters: {
        currentUserName () : string {
            return this.token !== null && this.user === null ? 'ADMIN' : this.user?.firstname || ''
        },
        isAdmin () : boolean {
            return this.user?.roles.includes('ROLE_ADMIN') || false
        }
    },
    actions: {
        login(username: string, password: string) {
            console.log("login")
            return apiClient
                .post('/api/v1/auth/authenticate', {
                    username: username,
                    password: password
                })
                .then((response)=> {
                    this.token = response.data.access_token
                    this.user = response.data.user
                    localStorage.setItem('access_token', this.token as string)
                    localStorage.setItem('user', JSON.stringify(this.user))
                    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
                    console.log(response)
                    return response
                })
        },
        logout() {
            console.log('logout')
            this.token = null
            this.user = null
            localStorage.removeItem('access_token')
            localStorage.removeItem('user')
        },
        reload(token: string, user: PersonDetail) {
            console.log("reload")
            this.token = token
            this.user = user
        }
    }
})