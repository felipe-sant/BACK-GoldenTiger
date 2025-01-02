function calcPorcentage(porcentage: number): boolean {
    const win: boolean = Math.random() < porcentage;
    return win
}

export default calcPorcentage;