export interface StudentDetail {
    id: number
    studentId: number
    firstname: string
    surname: string
    department: string
    advisor: AdvisorDetail
    images: string[]
    comment: string[]
}

export interface StudentReg {
    id: number
    studentId: string
    firstname: string
    surname: string
    department: string
    images: string[]
}

export interface AdvisorDetail {
    id: number
    academicPosition: string
    firstname: string
    surname: string
    department: string
    images: string[]
}