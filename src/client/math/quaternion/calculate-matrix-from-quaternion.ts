import {Matrix3x3, Vec4} from "../../types/vector.types";

export const calculateMatrixFromQuaternion = ([w, x, y, z]: Vec4): Matrix3x3 => {
    return [
        1 - 2*y*y - 2*z*z,
        2*x*y + 2*w*z,
        2*x*z - 2*w*y,
        2*x*y - 2*w*z,
        1 - 2*x*x - 2*z*z,
        2*y*z + 2*w*x,
        2*x*z + 2*w*y,
        2*y*z - 2*w*x,
        1 - 2*x*x - 2*y*y
    ]
}