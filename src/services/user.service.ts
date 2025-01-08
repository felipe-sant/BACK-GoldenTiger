import UserType from "../types/database/User.type";
import User from "../models/user.model";
import AuthType from "../types/database/Auth.type";
import Auth from "../models/auth.model";
import hashPassword from "../functions/auth/hashPassword";
import comparePassword from "../functions/auth/comparePassword";
import generateAccessToken from "../functions/auth/generateAccessToken";
import revokedTokens from "../constants/revokedTokens";
import newDate from "../functions/utils/newDate";
import { Response } from "express";
import Message from "../types/Message";

export class UserService {
    async loginUser(res: Response, body: { username: string; password: string }): Promise<string> {
        const { username, password } = body;

        const user = await User.findOne({ username: { $eq: username } }) as UserType;
        if (!user) res.status(404).json({ message: "User not found" })

        const auth = await Auth.findOne({ user_id: user._id }) as AuthType;
        if (!auth) res.status(404).json({ message: "User not found" })

        const isPasswordMatch = await comparePassword(password, auth.passwordHash);
        if (!isPasswordMatch) res.status(401).json({ message: "Password is incorrect" })

        await Auth.updateOne({ user_id: user._id }, { lastLogin: newDate() });   

        return generateAccessToken(user);
    }

    async logoutUser(token: string): Promise<Message> {
        if (token) {
            revokedTokens.add(token);
        }
        return { message: "User logged out successfully" };
    }

    async registerUser(body: { username: string, name: string, password: string }): Promise<Message> {
        const { username, name, password } = body;

        const now = newDate();

        const newUser: UserType = {
            username,
            name,
            balanceCash: 1000,
            type: username === "root" ? "admin" : "root",
            createAt: now,
            updateAt: null
        };

        const user = new User(newUser);
        await user.save();

        const passwordHash = await hashPassword(password);

        const userRecord = await User.findOne({ username }) as UserType;

        const newAuth: AuthType = {
            user_id: userRecord?._id || "",
            passwordHash,
            lastLogin: null,
            createAt: now,
            updateAt: null
        };

        const auth = new Auth(newAuth);
        await auth.save();

        return { message: "User registered successfully" };
    }
}

export default UserService;