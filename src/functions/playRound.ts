import calcPorcentage from "../calcs/calcPorcentage";
import Play from "../types/Play";
import Round from "../types/Round";

function playRound(money: number, gameRules: Play, roundCount: number = 1): Round {
    const { percentageBet, percentageWin } = gameRules;

    const betAmount: number = money * percentageBet;
    const won: boolean = calcPorcentage(percentageWin);
    const newMoney: number = won ? (money + betAmount) : (money - betAmount);

    const round: Round = {
        round: roundCount,
        currentMoney: newMoney
    };

    return round;
}

export default playRound;