import {Matrix3x3, Vec3} from "../types/vector.types";

export const multiplicateMatrix3x3WithVec3 = (matrix: Matrix3x3, [x, y, z]: Vec3): Vec3 => {
    return [
        matrix[0]*x + matrix[3]*y + matrix[6]*z,
        matrix[1]*x + matrix[4]*y + matrix[7]*z,
        matrix[2]*x + matrix[5]*y + matrix[8]*z
    ]
}