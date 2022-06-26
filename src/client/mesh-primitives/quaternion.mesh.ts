import {QuaternionMath} from "../mathObjects/quaternion.math";
import {Mesh} from "three";
import {Vec3} from "../types/vector.types";
import {normalizeQuaternion} from "../math/quaternion/normalze-quaternion";

export class QuaternionMesh {
    private mesh: Mesh;
    private readonly initialPos: number[];
    private readonly initialNormal: number[];
    private _quaternion: QuaternionMath = new QuaternionMath();

    public get quaternion() {
        return this._quaternion.quaternion;
    }

    public constructor(mesh: Mesh) {
        const points = mesh.geometry.getAttribute("position").array as number[];
        const normals = mesh.geometry.getAttribute("normal").array as number[];
        this.initialPos = points.map(point=>point);
        this.initialNormal = normals.map(normal=>normal);
        this.mesh = mesh;
    }

    private get meshCoordinates() {
        const {geometry} = this.mesh;
        const {array} = geometry.getAttribute("position");
        return array as number[];
    }

    private updatePoints() {
        const rotatedPos = this._quaternion.rotatePoints(this.initialPos);
        const rotatedNormals = this._quaternion.rotatePoints(this.initialNormal);
        for (let i = 0; i<rotatedPos.length; i+=3) {
            this.mesh.geometry.getAttribute("position").setXYZ(i/3, rotatedPos[i], rotatedPos[i+1], rotatedPos[i+2]);
            this.mesh.geometry.getAttribute("normal").setXYZ(i/3, rotatedNormals[i], rotatedNormals[i+1], rotatedNormals[i+2]);
        }
        this.mesh.geometry.attributes.position.needsUpdate = true;
        this.mesh.geometry.attributes.normal.needsUpdate = true;
    }

    public rotateBy(axis: Vec3, angle: number) {
        this._quaternion.normalize();
        this._quaternion.rotateQuaternion(axis, angle);
        this.updatePoints();
    }

    public slerp(other: QuaternionMath, t:number) {
        this._quaternion.slerp(other, t);
        this.updatePoints();
    }
}