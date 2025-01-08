import calcPorcentage from "../../calcs/calcPorcentage";
import globalGameRule from "../../constants/gameRules";
import GameRule from "../../types/play/gameRules.type";
import Round from "../../types/play/Round.type";

function playRound(money: number, percentageBet: number, roundCount: number = 1): Round {
    const { percentageWin } = globalGameRule as GameRule;

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