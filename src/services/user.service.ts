import UserType from "../types/database/User"
import User from "../models/user.model"
import Message from "../types/MessageType"
import AuthType from "../types/database/Auth"
import Auth from "../models/auth.model"
import hashPassword from "../functions/auth/hashPassword"
import comparePassword from "../functions/auth/comparePassword"
import generateAccessToken from "../functions/auth/generateAccessToken"
import revokedTokens from "../constants/revokedTokens"

export class UserService {
    async getUsers(): Promise<UserType[]> {
        const users = await User.find() as UserType[];
        return users;
    }

    async loginUser(body: { username: string, password: string }): Promise<string> {
        const { username, password } = body;

        const user = await User.findOne({ username }) as UserType;
        if (!user) throw new Error("User not found");

        const auth = await Auth.findOne({ user_id: user._id }) as AuthType;
        if (!auth) throw new Error("User not found");

        const isPasswordMatch = await comparePassword(password, auth.passwordHash);
        if (!isPasswordMatch) throw new Error("Password is incorrect");

        const token = generateAccessToken(user);

        return token;
    }

    async logoutUser(token: string): Promise<Message> {
        if (token) {
            revokedTokens.add(token);
        }
        return { message: "User logged out successfully" }
    }

    async registerUser(body: { username: string, password: string }): Promise<Message> {
        const { username, password } = body;

        const newUser: UserType = {
            username,
            balanceCash: 1000,
            createAt: new Date(),
            updateAt: new Date(),
        };

        const user = new User(newUser);
        await user.save();

        const passwordHash = await hashPassword(password);

        const userRecord = await User.findOne({ username }) as UserType;

        const newAuth: AuthType = {
            user_id: userRecord?._id || "",
            passwordHash,
            createAt: new Date(),
            updateAt: new Date(),
        };

        const auth = new Auth(newAuth);
        await auth.save();

        return { message: "User registered successfully" }
    }
}

export default UserService