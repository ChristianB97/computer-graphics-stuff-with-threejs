import {Vec2} from "../../types/vector.types";
import {calcPointBetweenVectors} from "./calcPointBetweenVectors";

export const calcCasteljauPointsAsSegment = (points: Vec2[], length: number, divisionFactor: number): Vec2[] => {
    if (length<=2) return [];
    const newPoints = [] as Vec2[];
    let previousCasteljauPoint =  calcPointBetweenVectors(points[0], points[1], divisionFactor);
    for (let i = 2; i < length-1; i+=2) {
        const casteljauPoint = calcPointBetweenVectors(points[i], points[i+1], divisionFactor);
        newPoints.push(previousCasteljauPoint, casteljauPoint);
        previousCasteljauPoint = casteljauPoint;
    }
    return [...newPoints, ...calcCasteljauPointsAsSegment(newPoints, length-2, divisionFactor)]
}