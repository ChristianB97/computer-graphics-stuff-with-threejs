import {Vec4} from "../../types/vector.types";
import {calculateMagnitude} from "../calculate-magnitude";
import {normalizeQuaternion} from "./normalze-quaternion";

export const rotateQuaternion = ([w, x, y, z]: Vec4, angle: number): Vec4 => {
    const magnitude = calculateMagnitude([w, x, y, z]);
    const sinOfAngle = Math.sin(angle/2) / magnitude;
    return normalizeQuaternion([
        Math.cos(angle/2),
        x * sinOfAngle,
        y * sinOfAngle,
        z * sinOfAngle
    ]);
}