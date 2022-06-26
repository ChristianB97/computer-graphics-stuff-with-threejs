import {Vec4} from "../../types/vector.types";
import {calculateMagnitude} from "../calculate-magnitude";

export const multiplyQuaternions = (a: Vec4, b: Vec4): Vec4 => {
    return [
        a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
        a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
        a[0] * b[2] + a[2] * b[0] + a[3] * b[1] - a[1] * b[3],
        a[0] * b[3] + a[3] * b[0] + a[1] * b[2] - a[2] * b[1]
    ] as Vec4;
}