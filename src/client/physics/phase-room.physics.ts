import {Vec3} from "../types/vector.types";
import {GRAVITY_ACCELERATION} from "../math/constants";

export class PhaseRoomPhysics {
    public speed: Vec3 = [0,0,0];
    private _acceleration: Vec3 = [0, GRAVITY_ACCELERATION, 0];

    public set acceleration(newAcceleration: Vec3) {
        this._acceleration = newAcceleration;
        const [, yAcceleration] = this._acceleration;
        this._acceleration[1] = yAcceleration < GRAVITY_ACCELERATION ? GRAVITY_ACCELERATION : yAcceleration;
    }

    public get acceleration() {
        return this._acceleration;
    }
}