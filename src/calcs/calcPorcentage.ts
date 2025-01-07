function calculateProbability(percentage: number): boolean {
    if (percentage < 0 || percentage > 1) {
        throw new Error('Percentage must be between 0 and 1');
    }

    const isEventOccurred: boolean = Math.random() < percentage;
    return isEventOccurred;
}

export default calculateProbability;