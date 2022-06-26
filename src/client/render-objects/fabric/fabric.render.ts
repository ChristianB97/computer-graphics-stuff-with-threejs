import {PerspectiveCamera, WebGLRenderer} from "three";
import * as THREE from "three";
import {RenderObjectsInterface} from "../../interfaces/render-objects.interface";
import {QuaternionMesh} from "../../mesh-primitives/quaternion.mesh";
import {Clamp} from "../../helper/clamp";
import {QuaternionMath} from "../../mathObjects/quaternion.math";
import {FabricParticleSystemPhysics} from "../../physics/fabric-particle-system.physics";
import {PlaneMesh} from "../../mesh-primitives/plane.mesh";


export class FabricRender implements RenderObjectsInterface{
    private fabric: FabricParticleSystemPhysics = new FabricParticleSystemPhysics(10, 10, 10);
    private planes: PlaneMesh = new PlaneMesh();

    public registerToScene(scene: THREE.Scene, configDiv: HTMLElement, camera: PerspectiveCamera, renderer: WebGLRenderer, onParametersUpdated?: (params: number[])=>void): void {
        this.planes.registerToScene(scene, camera, renderer);
    }

    public unregisterFromScene(scene: THREE.Scene, configDiv: HTMLElement): void {
        this.planes.unregisterFromScene(scene);
    }

    public renderTask() {

    }
}