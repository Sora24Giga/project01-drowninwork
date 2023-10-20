export interface StudentDetail {
    id: number
    studentId: string
    firstname: string
    surname: string
    department: string
    advisor: AdvisorDetail
    images: string[]
    comment: string[]
}

export interface AdvisorDetail {
    id: number
    academicPosition: string
    firstname: string
    surname: string
    department: string
    advisee: StudentDetail[] | string
    images: string[]
}