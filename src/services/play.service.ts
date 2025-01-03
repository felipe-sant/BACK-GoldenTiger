import globalGameRule from "../constants/gameRules";
import playGame from "../functions/playGame";
import playRound from "../functions/playRound";
import Play from "../types/Play";
import Round from "../types/Round";

export class PlayService {
    playRound(query: any): Round {
        return playRound(parseFloat(query.money), globalGameRule)
    }

    playGame(query: any): Play {
        const game: Play = {
            initialMoney: parseFloat(query.money),
            numberOfRounds: parseFloat(query.numberOfRounds),
            gameRule: globalGameRule,
            rounds: []
        }
        return playGame(game)
    }
}