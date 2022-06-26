import {Vec4} from "../../types/vector.types";

export const invertQuaternion = ([w, x, y, z]: Vec4): Vec4 => {
    return [w, -x, -y, -z]
}