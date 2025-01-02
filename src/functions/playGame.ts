import Play from "../types/Play";
import playRound from "./playRound";

function playGame(game: Play): Play {
    const { numberOfRounds, initialMoney, rounds } = game;
    let remainingRounds = numberOfRounds;
    let currentMoney = initialMoney;

    const updatedGame: Play = { ...game, rounds: [...rounds], finalMoney: 0 };

    while (remainingRounds > 0) {
        const roundNumber = numberOfRounds - remainingRounds + 1;
        const round = playRound(currentMoney, game.gameRule, roundNumber);
        currentMoney = round.currentMoney;
        updatedGame.rounds.push(round);
        remainingRounds--;
    }

    updatedGame.finalMoney = currentMoney;

    return updatedGame;
}

export default playGame;