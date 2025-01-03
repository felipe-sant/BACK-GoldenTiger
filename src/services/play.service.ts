import globalGameRule from "../constants/gameRules";
import playGame from "../functions/playGame";
import playRound from "../functions/playRound";
import Play from "../types/Play";
import Round from "../types/Round";

export class PlayService {
    playRound(query: any): Round {
        const money = parseFloat(query.money)
        if (isNaN(money)) throw new Error("Money is not a number")
        return playRound(money, globalGameRule)
    }

    playGame(query: any): Play {
        const money = parseFloat(query.money)
        const numberOfRounds = parseFloat(query.numberOfRounds)
        if (isNaN(money)) throw new Error("Money is not a number")
        if (isNaN(numberOfRounds)) throw new Error("Number of Rounds is not a number")
        const game: Play = {
            initialMoney: money,
            numberOfRounds: numberOfRounds,
            gameRule: globalGameRule,
            rounds: []
        }
        return playGame(game)
    }
}