import UserType from "../types/database/User"
import User from "../models/user.model"
import Message from "../types/MessageType"
import AuthType from "../types/database/Auth"
import Auth from "../models/auth.model"
import hashPassword from "../functions/hashPassword"

export class UserService {
    async getUsers(): Promise<UserType[]> {
        const users = await User.find() as UserType[]
        return users
    }

    async registerUser(body: any): Promise<Message> {
        const newUserJson: UserType = {
            username: body.username,
            balanceCash: 1000,
            createAt: new Date(),
            updateAt: new Date()
        }
        const user = new User(newUserJson)
        await user.save()

        const password = hashPassword(body.password, 10)
        const userJson = await User.findOne({ username: body.username }) as UserType
        const authJson: AuthType = {
            user_id: userJson._id ? userJson._id : "",
            passwordHash: password,
            lastLogin: new Date(),
            createAt: new Date(),
            updateAt: new Date()
        }
        const auth = new Auth(authJson)
        await auth.save()

        return { message: "User registered successfully" }
    }
}

export default UserService