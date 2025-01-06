import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import UserType from "../types/database/User";
import express from 'express';
import jwt from 'jsonwebtoken';
import revokedTokens from "../constants/revokedTokens";

class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    // Middleware to authenticate token
    async authenticateToken(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                return res.status(401).json({ message: "Token is required" });
            }

            if (revokedTokens.has(token)) {
                return res.status(403).json({ message: "Token is revoked" });
            }

            const SECRET_KEY = process.env.JWT_KEY || "";
            jwt.verify(token, SECRET_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json({ message: "Unauthorized access" });
                }
                (req as any).user = user;
                next();
            });
        } catch (error: any) {
            res.status(500).json({ message: "Internal server error" });
        }
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
            res.status(200).send(token);
        } catch (error: any) {
            res.status(500).json({ message: "Login failed", error: error.message });
        }
    }

    // POST /api/user/logout
    async logoutUser(req: Request, res: Response) {
        try {
            const authHeader = req.headers['authorization'];
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
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ message: "Username and password are required" });
            }

            const result = await this.userService.registerUser({ username, password });
            res.status(201).json(result);
        } catch (error: any) {
            res.status(500).json({ message: "Registration failed", error: error.message });
        }
    }
}

export default UserController;