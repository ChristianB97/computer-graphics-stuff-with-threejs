import * as THREE from "three";
import {LineBasicMaterial, Line, LineSegments} from "three";

export class LinesMesh {
    private readonly material: LineBasicMaterial;
    private readonly line: Line | LineSegments;

    public constructor(maxLines: number, dimension: number, options?: {color?: string, isSegment?: boolean}) {
        this.material = new THREE.LineBasicMaterial( { color: options?.color ? options.color : 0x0000ff } );

        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(maxLines*3);
        geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, dimension ) );

        this.line = options?.isSegment ? new THREE.LineSegments(geometry, this.material) : new THREE.Line( geometry, this.material );
        this.line.geometry.attributes.position.needsUpdate = true;
        this.line.geometry.setDrawRange( 0, maxLines );

    }

    setMaxLines(maxLines: number) {
        this.line.geometry.setDrawRange( 0, maxLines );
    }

    public setVertices3D(vertices: [number, number, number][]) {
        const pos = this.line.geometry.getAttribute("position");
        for ( let i = 0; i < vertices.length; i ++) {
            const [x, y, z] = vertices[i];
            pos.setXYZ(i, x, y,z)
        }
        this.line.geometry.attributes.position.needsUpdate = true;
    }

    public setVertices2D(vertices: [number, number][]) {
        const pos = this.line.geometry.getAttribute("position");
        for ( let i = 0; i < vertices.length; i ++) {
            const [x, y] = vertices[i];
            pos.setXY(i, x, y)
        }
        this.setMaxLines(vertices.length);
        this.line.geometry.attributes.position.needsUpdate = true;
    }

    public registerToScene(scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
        scene.add(this.line);
    }

    public unregisterFromScene(scene: THREE.Scene) {
        scene.remove(this.line);
    }
}