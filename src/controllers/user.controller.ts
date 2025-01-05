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
            const result: UserType[] = await this.userService.getUsers()
            res.status(200).json(result)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }

    // POST /api/user/register
    async registerUser(req: Request, res: Response) {
        try {
            const body = req.body
            if (!body.username) throw new Error("Username is required")
            if (!body.password) throw new Error("Password is required")
            const result: any = await this.userService.registerUser(body)
            res.status(200).json(result)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default UserController