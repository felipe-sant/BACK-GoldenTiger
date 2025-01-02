import Play from "../types/Play";
import playRound from "./playRound";

function playGame(gameRules: Play): Play {
    const { numberOfRounds, initialMoney, rounds } = gameRules;
    let remainingRounds = numberOfRounds;
    let currentMoney = initialMoney;

    const updatedGameRules: Play = { ...gameRules, rounds: [...rounds], finalMoney: 0 };

    while (remainingRounds > 0) {
        const roundNumber = numberOfRounds - remainingRounds + 1;
        const round = playRound(currentMoney, gameRules, roundNumber);
        currentMoney = round.currentMoney;
        updatedGameRules.rounds.push(round);
        remainingRounds--;
    }

    updatedGameRules.finalMoney = currentMoney;

    return updatedGameRules;
}

export default playGame;