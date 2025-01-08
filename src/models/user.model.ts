import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    balanceCash: { type: Number, required: false, default: 0 },
    type: { type: String, required: false, default: 'default'},
    createAt: { type: Date, required: true },
    updateAt: { type: Date, required: false }
})

const User = mongoose.model('user', UserSchema)

export default User