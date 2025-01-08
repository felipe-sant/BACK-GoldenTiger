import GameRule from "./gameRules.type";
import Round from "./Round.type";

type Play = {
    id?: string,
    initialMoney: number,
    numberOfRounds: number,
    gameRule: GameRule,
    rounds: Round[],
    gain?: number
    finalMoney?: number
}

export default Play;