import {ParticlePhysics} from "../physics/particle.physics";

export class ParticleNeighbors {
    public upper: ParticlePhysics | undefined;
    public right: ParticlePhysics | undefined;
    public lower: ParticlePhysics | undefined;
    public left: ParticlePhysics | undefined;

    public get upperRight() {
        return this.upper?.neighbors.right;
    }

    public lowerRight() {
        return this.lower?.neighbors.right;
    }

    public lowerLeft() {
        return this.lower?.neighbors.left;
    }

    public upperLeft() {
        return this.upper?.neighbors.left;
    }
}