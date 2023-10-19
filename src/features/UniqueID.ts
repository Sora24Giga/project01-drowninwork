let UUID = 0
export default function Unique() {
    const getID = (): string => {
        UUID++
        return String(UUID)
    }
    return {
        getID
    }
}
