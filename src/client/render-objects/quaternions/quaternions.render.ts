import {PerspectiveCamera, WebGLRenderer} from "three";
import * as THREE from "three";
import {RenderObjectsInterface} from "../../interfaces/render-objects.interface";
import {QuaternionMesh} from "../../mesh-primitives/quaternion.mesh";
import {Clamp} from "../../helper/clamp";
import {QuaternionMath} from "../../mathObjects/quaternion.math";


export class QuaternionsRender implements RenderObjectsInterface{
    private geometry = new THREE.BoxGeometry( 1, 1, 1 );
    private material = new THREE.MeshLambertMaterial();
    private cube = new THREE.Mesh( this.geometry, this.material );
    private onParametersUpdated: undefined | ((params: number[])=>void);
    private quaternionMesh: QuaternionMesh = new QuaternionMesh(this.cube);
    private clamp: Clamp = new Clamp();
    private otherQuaternion: QuaternionMath = new QuaternionMath([0, 1, 0, 0]);

    private light = new THREE.HemisphereLight(0xf96cf8, 0x4a204a, 1);

    public registerToScene(scene: THREE.Scene, configDiv: HTMLElement, camera: PerspectiveCamera, renderer: WebGLRenderer, onParametersUpdated?: (params: number[])=>void): void {
        scene.add(this.light);
        scene.add(this.cube);
        this.onParametersUpdated = onParametersUpdated;
        this.cube.material.color.setHex( 0xf96cf8 );
        this.cube.material.side = THREE.DoubleSide;
    }

    public unregisterFromScene(scene: THREE.Scene, configDiv: HTMLElement): void {
        this.onParametersUpdated = undefined;
        scene.remove(this.cube);
        scene.remove(this.light);
    }

    public renderTask() {
        const angle = 1 * Math.PI / 1000;
        this.clamp.add(angle);
        //this.quaternionMesh.rotateBy([0.4,0.6,0.5234523], angle)
        this.quaternionMesh.slerp(this.otherQuaternion, this.clamp.clamp);
        this.onParametersUpdated && this.onParametersUpdated(this.quaternionMesh.quaternion);
    }
}