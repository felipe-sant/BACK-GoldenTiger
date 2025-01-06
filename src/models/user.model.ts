import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    balanceCash: { type: Number, required: false, default: 0 },
    createAt: { type: Date, required: true },
    updateAt: { type: Date, required: false }
})

const User = mongoose.model('user', UserSchema)

export default User