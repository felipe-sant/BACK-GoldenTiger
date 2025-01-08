import AuthType from "../types/database/Auth.type";
import UserType from "../types/database/User.type";
import Auth from "../models/auth.model";
import User from "../models/user.model";
import Message from "../types/Message";

export class AdminService {
    async getAuth(): Promise<AuthType[]> {
        return await Auth.find() as AuthType[];
    }

    async getUsers(): Promise<UserType[]> {
        return await User.find() as UserType[];
    }

    async deleteUsers(): Promise<Message> {
        await User.deleteMany();
        await Auth.deleteMany();
        return { message: "Users deleted" };
    }

    async getUser(username: string): Promise<UserType> {
        return await User.findOne({ username: { $eq: username } }) as UserType;
    }

    async deleteUser(username: string): Promise<Message | undefined> {
        const user = await User.findOne({ username: { $eq: username } });
        if (!user) return undefined
        await User.deleteOne({ username: { $eq: username } });
        await Auth.deleteOne({ user_id: { $eq: user._id } });
        return { message: "User deleted" };
    }
}

export default AdminService;