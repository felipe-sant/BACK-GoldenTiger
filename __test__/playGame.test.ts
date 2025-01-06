import Play from "../src/types/Play"
import globalGameRule from "../src/constants/gameRules"
import playGame from "../src/functions/playGame"

const game: Play = {
    initialMoney: 1000,
    numberOfRounds: 20,
    gameRule: globalGameRule,
    rounds: []
}

test('play a game', () => {
    const result = playGame(game)
    expect(result.rounds.length).toBe(game.numberOfRounds)
    expect(result.initialMoney).toBeLessThanOrEqual(game.initialMoney)
})