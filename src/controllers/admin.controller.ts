import { NextFunction, Request, Response } from "express";
import AuthType from "../types/database/Auth.type";
import UserType from "../types/database/User.type";
import AdminService from "../services/admin.service";

class AdminController {
    private adminService: AdminService;

    constructor () {
        this.adminService = new AdminService();
    }

    // GET /admin/auth/:username
    async getAuths(_: Request, res: Response) {
        try {
            const users: AuthType[] = await this.adminService.getAuth();
            res.status(200).json(users);
        } catch (error: any) {
            res.status(500).json({ message: "Failed to retrieve auth", error: error.message });
        }
    }

    // GET /admin/user/
    async getUsers(_: Request, res: Response) {
        try {
            const users: UserType[] = await this.adminService.getUsers();
            res.status(200).json(users);
        } catch (error: any) {
            res.status(500).json({ message: "Failed to retrieve users", error: error.message });
        }
    }

    // DELETE /admin/user/
    async deleteUsers(_: Request, res: Response) {
        try {
            const result = await this.adminService.deleteUsers();
            res.status(200).json(result)
        } catch (error: any) {
            res.status(500).json({ message: "Failed to delete users", error: error.message });
        }
    }

    // GET /admin/user/:username
    async getUser(req: Request, res: Response) {
        try {
            const username: string = req.params.username;
            const user: UserType = await this.adminService.getUser(username);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({ message: "Failed to retrieve user", error: error.message });
        }
    }

    // DELETE /admin/user/:username
    async deleteUser(req: Request, res: Response) {
        try {
            const username: string = req.params.username;
            const result = await this.adminService.deleteUser(username);
            if (!result) {
                return res.status(404).json({ message: "User not found" });
            }
            const loggedUser = (req as any).user as UserType;
            if (loggedUser.username === username) {
                return res.status(400).json({ message: "You can't delete yourself" });
            }
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ message: "Failed to delete user", error: error.message });
        }
    }

    // POST /admin/user/:username/setMoney
    async setMoney(req: Request, res: Response) {
        try {
            const username = req.params.username;
            const { money } = req.query
            if (!money) return res.status(400).json({ message: "Money is required" });
            const balanceCash = parseInt(money as string);
            if (isNaN(balanceCash)) return res.status(400).json({ message: "Money must be a number" });
            const response = await this.adminService.setMoney(res, username, balanceCash);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(500).json({ message: "Failed to set money", error: error.message });
        }
    }
}

export default AdminController;