export const calculateDotProduct = (vectorA: number[], vectorB: number[]) => {
    return vectorA.reduce((result, value, i) =>
            result += (value * vectorB[i]), 0
    )
}