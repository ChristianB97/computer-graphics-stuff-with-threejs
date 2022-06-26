import {Vec4} from "../types/vector.types";

export const calculateMagnitude = ([w, x, y, z]: Vec4) => {
    return Math.sqrt(w**2 + x**2 + y**2 + z**2);
}