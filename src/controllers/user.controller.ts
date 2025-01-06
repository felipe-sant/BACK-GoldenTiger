import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import UserType from "../types/database/User";

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    // GET /api/user/
    async getUsers(_: Request, res: Response) {
        try {
            const users: UserType[] = await this.userService.getUsers();
            res.status(200).json(users);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // POST /api/user/register
    async registerUser(req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ message: "Username and password are required" });
            }

            const result = await this.userService.registerUser({ username, password });
            res.status(201).json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default UserController