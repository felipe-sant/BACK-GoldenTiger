import mongoose from 'mongoose'

const AuthSchema = new mongoose.Schema({
    user_id: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    lastLogin: { type: Date, required: true },
    createAt: { type: Date, required: true },
    updateAt: { type: Date, required: true }
})

const Auth = mongoose.model('auth', AuthSchema)

export default Auth