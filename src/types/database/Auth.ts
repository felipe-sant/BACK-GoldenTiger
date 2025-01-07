type AuthType = {
    _id?: string
    user_id: string
    passwordHash: string
    lastLogin?: Date | null
    createAt: Date
    updateAt?: Date | null
}

export default AuthType