import calcPorcentage from "../../calcs/calcPorcentage";
import GameRule from "../../types/play/gameRules";
import Round from "../../types/play/Round";

function playRound(money: number, gameRules: GameRule, roundCount: number = 1): Round {
    const { percentageBet, percentageWin } = gameRules;

    const betAmount: number = money * percentageBet;
    const won: boolean = calcPorcentage(percentageWin);
    const newMoney: number = won ? (money + betAmount) : (money - betAmount);

    const round: Round = {
        round: roundCount,
        currentMoney: newMoney,
        won: won
    };

    return round;
}

export default playRound;