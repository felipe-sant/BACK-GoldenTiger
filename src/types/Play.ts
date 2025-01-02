import Round from "./Round";

type Play = {
    id: string,
    initialMoney: number,
    percentageWin: number,
    percentageBet: number,
    numberOfRounds: number,
    rounds: Round[]
    finalMoney?: number
}

export default Play;