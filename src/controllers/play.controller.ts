import { Request, Response } from "express";
import { PlayService } from "../services/play.service";
import Round from "../types/Round";

class PlayController {
    private playService: PlayService

    constructor() {
        this.playService = new PlayService()
    }

    // GET /api/play/round
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
}

export default PlayController