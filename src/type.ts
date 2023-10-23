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
    UserId: string
    UserPw: string
    UserName: string
    UserImage: string[]
}

export interface Announcement{
    id: number
    title: string
    message: string
    timeSent: string
    advisor: AdvisorDetail
    files: string[]
}