import globalGameRule from "../constants/gameRules";
import playGame from "../functions/play/playGame";
import playRound from "../functions/play/playRound";
import Play from "../types/play/Play";
import Round from "../types/play/Round";

export class PlayService {
    playRound(money: number, percentageBet: number): Round {
        this.validateMoney(money);
        this.validatePercentageBet(percentageBet);
        return playRound(money, percentageBet);
    }

    playGame(query: { money: string; numberOfRounds: string }): Play {
        const money = parseFloat(query.money);
        const numberOfRounds = parseInt(query.numberOfRounds, 10);

        this.validateMoney(money);
        this.validateNumberOfRounds(numberOfRounds);

        const game: Play = {
            initialMoney: money,
            numberOfRounds: numberOfRounds,
            gameRule: globalGameRule,
            rounds: []
        };

        return playGame(game);
    }

    private validateMoney(money: number): void {
        if (isNaN(money)) throw new Error("Money is not a number");
        if (money <= 0) throw new Error("Money must be greater than 0");
    }

    private validatePercentageBet(percentageBet: number): void {
        if (isNaN(percentageBet)) throw new Error("Percentage Bet is not a number");
        if (percentageBet <= 0 || percentageBet > 1) throw new Error("Percentage Bet must be between 0 and 1");
    }

    private validateNumberOfRounds(numberOfRounds: number): void {
        if (isNaN(numberOfRounds)) throw new Error("Number of Rounds is not a number");
        if (numberOfRounds <= 0) throw new Error("Number of Rounds must be greater than 0");
    }
}