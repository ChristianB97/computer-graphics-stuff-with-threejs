import {rotateQuaternion} from "./rotate-quaternion";
import {invertQuaternion} from "./invert-quaternion";
import {Vec3} from "../../types/vector.types";
import {multiplyQuaternions} from "./multiply-quaternions";

export const rotatePointWithQuaternion = (point: Vec3, axis: Vec3, angle: number): Vec3 => {
    const rotation = rotateQuaternion([1, ...axis], angle);
    const invert  = invertQuaternion(rotation);
    const multPointRotation = multiplyQuaternions([0, ...point], rotation);
    const [w, ...rotatedPoint] = multiplyQuaternions(invert, multPointRotation);
    return rotatedPoint;
}