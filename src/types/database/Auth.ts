type AuthType = {
    _id?: string
    user_id: string
    passwordHash: string
    lastLogin: Date
    createAt: Date
    updateAt: Date
}

export default AuthType