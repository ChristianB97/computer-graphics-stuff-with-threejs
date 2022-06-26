import {Vec2} from "../../types/vector.types";

export const calcPointBetweenVectors = ([ax, ay]: Vec2, [bx, by]: Vec2, divisionFactor: number): Vec2 => {
    const directionalVector = [ax - bx, ay - by];
    const shortenedDirectionalVector = [directionalVector[0] * divisionFactor, directionalVector[1] * divisionFactor];
    return [ax - shortenedDirectionalVector[0], ay - shortenedDirectionalVector[1]];
}