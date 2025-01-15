import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import UserType from "../types/database/User.type";
import AuthType from "../types/database/Auth.type";

class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    // POST /api/user/login
    async loginUser(req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ message: "Username and password are required" });
            }

            const token = await this.userService.loginUser(res, { username, password });
            res.status(200).json({ message: "User logged in successfully", token });
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

            const response = await this.userService.logoutUser(token);
            res.sendStatus(200).json(response);
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