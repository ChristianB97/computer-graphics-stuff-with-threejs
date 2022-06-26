import {Vec3, Vec4} from "../types/vector.types";
import {multiplyQuaternions} from "../math/quaternion/multiply-quaternions";
import {invertQuaternion} from "../math/quaternion/invert-quaternion";
import {rotateQuaternion} from "../math/quaternion/rotate-quaternion";
import {multiplicateMatrix3x3WithVec3} from "../math/multiplicate-matrix3x3-with-vec3";
import {calculateMatrixFromQuaternion} from "../math/quaternion/calculate-matrix-from-quaternion";
import {normalizeQuaternion} from "../math/quaternion/normalze-quaternion";
import {calculateDotProduct} from "../math/calculate-dot-product";

export class QuaternionMath {
    private _quaternion: Vec4 = [1, 0, 0, 0];
    private invertedQuaternion: Vec4 = [1, 0, 0, 0];

    public constructor(quaternion?: Vec4) {
        this.quaternion = quaternion ? quaternion : this._quaternion;
    }

    public get quaternion(): Vec4 {
        return [...this._quaternion];
    }

    private set quaternion(quaternion: Vec4) {
        this._quaternion = quaternion;
        this.invert();
    }

    public multiplyByQuaternionObject(other: QuaternionMath) {
        this._quaternion = multiplyQuaternions(this.quaternion, other.quaternion);
    }

    public multiplyByQuaternionArray(other: Vec4) {
        this._quaternion = multiplyQuaternions(this.quaternion, other);
    }

    private invert() {
        this.invertedQuaternion = invertQuaternion(this.quaternion);
    }

    public rotateQuaternion(axis: Vec3, angle: number) {
        const other = rotateQuaternion([1, ...axis], angle);
        this.multiplyByQuaternionArray(other);
    }

    public normalize() {
        this._quaternion = normalizeQuaternion(this._quaternion);
    }

    public rotatePoints(points: number[]): number[] {
        const matrix = calculateMatrixFromQuaternion(this.quaternion);
        const newPoints: number[] = [];
        for (let i = 0; i<points.length; i+=3) {
            const [rotatedX, rotatedY, rotatedZ] = multiplicateMatrix3x3WithVec3(matrix, [points[i], points[i+1], points[i+2]]);
            newPoints.push(rotatedX, rotatedY, rotatedZ);
        }
        return newPoints;
    }

    public get copy() {
        return new QuaternionMath([...this._quaternion]);
    }

    public addQuaternion(other: QuaternionMath) {
        this._quaternion = this._quaternion.map((value, i) =>
            value + other.quaternion[i]) as Vec4
    }

    public subtractQuaternion(other: QuaternionMath) {
        this._quaternion = this._quaternion.map((value, i) =>
            value - other.quaternion[i]) as Vec4
    }

    public multiplyByFactor(factor: number) {
        this._quaternion = this._quaternion.map(value => value * factor) as Vec4;
    }

    public slerp(other: QuaternionMath, t: number) {
        this.normalize();
        other = other.copy;
        other.normalize();

        let dot = calculateDotProduct(this.quaternion, other.quaternion);
        if (dot < 0.0){
            this.invert();
            dot = -dot;
        }
        if (dot > 0.9995) {
            other.subtractQuaternion(this);
            other.multiplyByFactor(t);
            other.addQuaternion(this);
            return other;
        }
        const theta0 = Math.acos(dot);
        const theta = theta0 * t;
        const sinTheta = Math.sin(theta);
        const sinTheta0 = Math.sin(theta0);

        const s0 = Math.cos(theta) - dot * sinTheta / sinTheta0;
        const s1 = sinTheta / sinTheta0;

        this.multiplyByFactor(s0);
        other.multiplyByFactor(s1);
        this.addQuaternion(other);
        console.log(this.quaternion)
        return this;
    }
}