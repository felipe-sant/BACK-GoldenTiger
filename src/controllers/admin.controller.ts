import { Request, Response } from "express";
import AuthType from "../types/database/Auth.type";
import UserType from "../types/database/User.type";
import AdminService from "../services/admin.service";

class AdminController {
    private adminService: AdminService;

    constructor () {
        this.adminService = new AdminService();
    }

    // GET /admin/auth
    async getAuth(_: Request, res: Response) {
        try {
            const users: AuthType[] = await this.adminService.getAuth();
            res.status(200).json(users);
        } catch (error: any) {
            res.status(500).json({ message: "Failed to retrieve users", error: error.message });
        }
    }

    // GET /admin/user
    async getUsers(_: Request, res: Response) {
        try {
            const users: UserType[] = await this.adminService.getUsers();
            res.status(200).json(users);
        } catch (error: any) {
            res.status(500).json({ message: "Failed to retrieve users", error: error.message });
        }
    }
}

export default AdminController;