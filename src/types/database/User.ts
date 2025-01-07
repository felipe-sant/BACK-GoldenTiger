type UserType = {
    _id?: string
    username: string
    name: string
    balanceCash: number
    createAt: Date
    updateAt?: Date | null
}

export default UserType