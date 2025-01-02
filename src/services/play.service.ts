import globalGameRule from "../constants/gameRules";
import playRound from "../functions/playRound";
import Round from "../types/Round";

export class PlayService {
    playRound(query: any): Round {
        return playRound(parseFloat(query.money), globalGameRule)
    }
}