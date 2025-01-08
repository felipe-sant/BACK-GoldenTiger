import { query, Request, Response } from "express";
import { PlayService } from "../services/play.service";
import Round from "../types/play/Round.type";
import Play from "../types/play/Play.type";
import JwtPayload from "../types/database/JwtPayload.type";
import User from "../models/user.model";
import UserType from "../types/database/User.type";
import newDate from "../functions/utils/newDate";

class PlayController {
    private playService: PlayService;

    constructor() {
        this.playService = new PlayService();
    }

    // GET /api/play (with authentication)
    async playRound(req: Request, res: Response) {
        try {
            const percentageBet = req.query.percentageBet;
            if (!percentageBet) throw new Error("Percentage Bet is required");

            const userJwt: JwtPayload = (req as any).user as JwtPayload;
            const user = await User.findById(userJwt.id) as UserType;

            const result: Round = this.playService.playRound(user.balanceCash, parseFloat(percentageBet as string));
            await User.updateOne({ _id: user._id }, { balanceCash: result.currentMoney, updateAt: newDate() });

            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // GET /api/play/muchRounds
    async playGame(req: Request, res: Response) {
        try {
            const { money, numberOfRounds } = req.query;
            
            if (!money) throw new Error("Money is required");
            if (!numberOfRounds) throw new Error("Number of Rounds is required");

            if (typeof(money) !== "string") throw new Error("Money must be a number");
            if (typeof(numberOfRounds) !== "string") throw new Error("Number of Rounds must be a number")

            const result: Play = this.playService.playGame({ money, numberOfRounds });
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default PlayController;