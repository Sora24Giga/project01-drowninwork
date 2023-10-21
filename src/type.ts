export interface StudentDetail {
    id: number
    studentId: string
    studentPw: string
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
    advisee: StudentDetail[]
    images: string[]
}

export interface UserDetail {
    id: number
    UserId: string
    UserPw: string
    UserName: string
    UserImage: string[]
}