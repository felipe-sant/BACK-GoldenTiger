import UserType from "../types/database/User"
import User from "../models/user.model"
import Message from "../types/MessageType"
import AuthType from "../types/database/Auth"
import Auth from "../models/auth.model"
import hashPassword from "../functions/hashPassword"

export class UserService {
    async getUsers(): Promise<UserType[]> {
        const users = await User.find() as UserType[];
        return users;
    }

    async registerUser(body: { username: string, password: string}): Promise<Message> {
        const { username, password } = body;

        const newUser: UserType = {
            username,
            balanceCash: 1000,
            createAt: new Date(),
            updateAt: new Date(),
        };
        
        const user = new User(newUser);
        await user.save();

        const passwordHash = hashPassword(password, 10);

        const userRecord = await User.findOne({ username }) as UserType;

        const newAuth: AuthType = {
            user_id: userRecord?._id || "",
            passwordHash,
            lastLogin: new Date(),
            createAt: new Date(),
            updateAt: new Date(),
        };

        const auth = new Auth(newAuth);
        await auth.save();

        return { message: "User registered successfully" }
    }
}

export default UserService