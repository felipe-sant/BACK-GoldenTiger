import { Request, Response } from "express";
import { PlayService } from "../services/play.service";
import Round from "../types/play/Round";
import Play from "../types/play/Play";

class PlayController {
    private playService: PlayService

    constructor() {
        this.playService = new PlayService()
    }

    // GET /api/play/
    async playRound(req: Request, res: Response) {
        try {
            const query = req.query
            if (!query.money) throw new Error("Money is required")
            const result: Round = this.playService.playRound(query)
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