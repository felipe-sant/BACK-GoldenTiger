import { query, Request, Response } from "express";
import { PlayService } from "../services/play.service";
import Round from "../types/play/Round";
import Play from "../types/play/Play";
import JwtPayload from "../types/database/JwtPayload";
import User from "../models/user.model";
import UserType from "../types/database/User";
import { parse } from "path";
import newDate from "../functions/utils/newDate";

class PlayController {
    private playService: PlayService

    constructor() {
        this.playService = new PlayService()
    }

    // GET /api/play/
    async playRound(req: Request, res: Response) {
        try {
            const percentageBet = req.query.percentageBet
            if (!percentageBet) throw new Error("Percentage Bet is required")

            const userJwt: JwtPayload = (req as any).user as JwtPayload
            const user = await User.findById(userJwt.id) as UserType

            const result: Round = this.playService.playRound(user.balanceCash, parseFloat(percentageBet as string))
            await User.updateOne({ _id: user._id }, { balanceCash: result.currentMoney, updateAt: newDate() })

            res.status(200).json(result)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }

    // GET /api/play/muchRounds
    async playGame(req: Request, res: Response) {
        try {
            const query = req.query
            if (!query.money) throw new Error("Money is required")
            if (!query.numberOfRounds) throw new Error("Number of Rounds is required")
            const result: Play = this.playService.playGame(query)
            res.status(200).json(result)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default PlayController