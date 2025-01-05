import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    balanceCash: { type: Number, required: true },
    createAt: { type: Date, required: true },
    updateAt: { type: Date, required: true }
})

const User = mongoose.model('user', UserSchema)

export default User