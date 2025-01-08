type UserType = {
    _id?: string
    username: string
    name: string
    balanceCash: number
    type?: string
    createAt: Date
    updateAt?: Date | null
}

export default UserType