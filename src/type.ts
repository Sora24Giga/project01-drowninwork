export interface StudentDetail {
    id: number
    sid: number
    first_name: string
    last_name: string
    img: string
    course: string
    advisor: string
    advisorID: number
    comment: string[]
}

export interface StudentReg {
    id: number
    studentId: number
    firstname: string
    surname: string
    department: string
    profileImg: string
}

export interface AdvisorDetail {
    id: number
    first_name: string
    last_name: string
    img: string
}