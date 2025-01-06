import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import UserType from "../types/database/User";

class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    // GET /api/user/
    async getUsers(_: Request, res: Response) {
        try {
            const users: UserType[] = await this.userService.getUsers();
            res.status(200).json(users);
        } catch (error: any) {
            res.status(500).json({ message: "Failed to retrieve users", error: error.message });
        }
    }

    // POST /api/user/login
    async loginUser(req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ message: "Username and password are required" });
            }

            const token = await this.userService.loginUser({ username, password });
            res.status(200).json({ token });
        } catch (error: any) {
            res.status(500).json({ message: "Login failed", error: error.message });
        }
    }

    // POST /api/user/logout
    async logoutUser(req: Request, res: Response) {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                return res.status(401).json({ message: "Token is required" });
            }

            await this.userService.logoutUser(token);
            res.sendStatus(204);
        } catch (error: any) {
            res.status(500).json({ message: "Logout failed", error: error.message });
        }
    }

    // POST /api/user/register
    async registerUser(req: Request, res: Response) {
        try {
            const { username, name, password } = req.body;

            if (!username || !name || !password) {
                return res.status(400).json({ message: "Username, name and password are required" });
            }

            const user = await this.userService.registerUser({ username, name, password });
            res.status(201).json(user);
        } catch (error: any) {
            res.status(500).json({ message: "Registration failed", error: error.message });
        }
    }
}

export default UserController;