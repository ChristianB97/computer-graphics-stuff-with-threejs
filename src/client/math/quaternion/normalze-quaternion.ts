import {calculateMagnitude} from "../calculate-magnitude";
import {Vec4} from "../../types/vector.types";

export function normalizeQuaternion(quaternion: Vec4): Vec4 {
    const magnitude = calculateMagnitude(quaternion);
    return quaternion.map(axis => axis / magnitude) as Vec4;
}