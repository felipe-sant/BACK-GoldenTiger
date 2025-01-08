import AuthType from "../types/database/Auth.type";
import UserType from "../types/database/User.type";
import Auth from "../models/auth.model";
import User from "../models/user.model";

export class AdminService {
    async getAuth(): Promise<AuthType[]> {
        return await Auth.find() as AuthType[];
    }

    async getUsers(): Promise<UserType[]> {
        return await User.find() as UserType[];
    }
}

export default AdminService;