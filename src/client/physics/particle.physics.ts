import {ParticleNeighbors} from "../helper/particle-neighbors";
import {PhaseRoomPhysics} from "./phase-room.physics";
import {Vec3} from "../types/vector.types";

export class ParticlePhysics {
    public neighbors: ParticleNeighbors = new ParticleNeighbors();
    public phaseRoom: PhaseRoomPhysics = new PhaseRoomPhysics();
    public position: Vec3;

    public constructor(_position: Vec3 = [0, 0, 0]) {
        this.position = _position;
    }

    public addForce(force: Vec3) {
        const {phaseRoom} = this;
        let {speed} = phaseRoom;
        phaseRoom.speed = speed.map((axis, i) => axis + force[i]) as Vec3;
    }
}