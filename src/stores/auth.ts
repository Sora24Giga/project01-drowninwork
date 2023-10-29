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
        user: null as PersonDetail | null,
        loginState: null as boolean | null
    }),
    getters: {
        currentUserName () : string {
            return this.user?.roles.includes('ROLE_ADMIN') ? 'ADMIN' : this.user?.firstname || ''
        },
        isLoggedIn () : boolean {
            return this.token !== null && this.user !== null
        },
        isAdmin () : boolean {
            return this.user?.roles.includes('ROLE_ADMIN') || false
        },
        isTeacher () : boolean {
            return this.user?.roles.includes('ROLE_TEACHER') || false
        },
        isStudent () : boolean {
            return this.user?.roles.includes('ROLE_STUDENT') || false
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
                    this.loginState = true
                    localStorage.setItem('access_token', this.token as string)
                    localStorage.setItem('user', JSON.stringify(this.user))
                    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
                    console.log(response)
                    return response
                })
        },
        register(studentId: string, password: string, firstname: string, surname: string, department: string, images: string[]){
            return apiClient
              .post('/api/v1/auth/register', {
                studentId: studentId,
                password: password,
                firstname: firstname,
                surname: surname,
                department: department,
                images: images
              })
              .then((response) => {
                this.token = response.data.access_token
                this.user = response.data.user
                localStorage.setItem('access_token', this.token as string)
                localStorage.setItem('user', JSON.stringify(this.user))
                axios.defaults.headers.common['Authorization'] = 'Bearer '+this.token
                console.log(this.currentUserName)
                return response
      
              })
          },
        logout() {
            console.log('logout')
            this.token = null
            this.user = null
            this.loginState = false
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