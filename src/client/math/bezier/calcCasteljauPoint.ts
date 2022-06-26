import {Vec2} from "../../types/vector.types";
import {calcPointBetweenVectors} from "./calcPointBetweenVectors";

export const calcCasteljauPoint = (points: Vec2[], length: number, divisionFactor: number): Vec2 => {
    if (length===1) return points[0];
    const newPoints: Vec2[] = [];
    for (let i = 1; i < length; i++) {
        const casteljauPoint = calcPointBetweenVectors(points[i-1], points[i], divisionFactor);
        newPoints.push(casteljauPoint);
    }
    return calcCasteljauPoint(newPoints, length-1, divisionFactor);
}