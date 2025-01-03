import GameRule from "./gameRules";
import Round from "./Round";

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