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

export interface AdvisorDetail {
    id: number
    first_name: string
    last_name: string
    img: string
}