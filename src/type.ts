export interface PersonDetail {
    id: number
    studentId: string
    firstname: string
    surname: string
    department: string
    roles: string[]
}

export interface StudentDetail extends PersonDetail{
    advisor: AdvisorDetail
    images: string[]
    comment: string[]
}

export interface AdvisorDetail extends PersonDetail {
    academicPosition: string
    advisee: StudentDetail[]
    images: string[]
}

export interface CommentHistory{
    id: number
    history: Comment[]
    advisorId: number
    adviseeId: number
}

export interface Comment{
    id: number
    from: CommentHistory
    message: string
    timeSent: string
    sentFromAdvisor: boolean
}

export interface UserDetail {
    id: number
    firstname: string
    surname: string
    roles: string[]
}

export interface Announcement{
    id: number
    title: string
    message: string
    timeSent: string
    advisor: AdvisorDetail
    files: string[]
}