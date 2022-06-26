import {ParticlePhysics} from "./particle.physics";

export class FabricParticleSystemPhysics {
    private readonly particles: ParticlePhysics[];
    private width: number;
    private height: number;
    private spacing: number;

    public constructor(width: number, height: number, spacing: number) {
        this.width = width;
        this.height = height;
        this.spacing = spacing;
        this.particles = new Array<ParticlePhysics>(width*height);
        for (let i=0; i < this.particles.length; i++) {
            this.particles[i] = new ParticlePhysics();

            const {position} = this.particles[i];
            let particleWidth = i % width;
            let particleHeight = Math.floor(i/width);
            position[0] = particleWidth * spacing;
            position[1] = particleHeight * spacing;
        }
        console.log(this.particles)
    }
}