import * as THREE from "three";
import {PlaneGeometry, MeshBasicMaterial} from "three";

export class PlaneMesh {
    private readonly material: MeshBasicMaterial = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
    private readonly geometry: PlaneGeometry = new THREE.PlaneGeometry();
    private readonly plane = new THREE.Mesh(this.geometry, this.material);

    public constructor() {

    }

    public registerToScene(scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
        scene.add(this.plane);
    }

    public unregisterFromScene(scene: THREE.Scene) {
        scene.remove(this.plane);
    }
}