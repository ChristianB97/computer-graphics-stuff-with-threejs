import * as THREE from "three";
import {Points, Scene, PerspectiveCamera, WebGLRenderer} from "three";
import {Vec2} from "../types/vector.types";

export class PointsMesh {
    private points: Points;
    private max = 0;

    private raycaster: THREE.Raycaster = new THREE.Raycaster();
    private currentDraggedIndex = -1;
    private currentHoverIndex = -1;
    private dragCallbacks: (()=>void)[] = [];
    private hoverColor: [number, number, number] = [0.79, 0.09, 0.45];
    private dragColor: [number, number, number] = [0.62, 0.12, 0.25];
    private color: [number, number ,number] = [0.9, 0.17, 0.31];
    private isDraggable = false;

    public constructor(maxPoints: number, dimension: number, {size=15, color="0x0000ff", isDraggable}: {size?: number, color?: string, isDraggable?: boolean}) {
        const dotMaterial = new THREE.PointsMaterial( { size, sizeAttenuation: false, color } );
        dotMaterial.vertexColors = true;
        this.isDraggable = !!isDraggable;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(maxPoints*2);
        const colors = new Float32Array(maxPoints*3);
        geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, dimension ) );
        geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

        this.points = new Points( geometry, dotMaterial )
        this.points.geometry.attributes.position.needsUpdate = true;
        this.points.geometry.setDrawRange( 0, maxPoints );
        this.setMaxPoints(maxPoints);
        this.points.userData.draggable = true;
    }

    public setMaxPoints(maxPoints: number) {
        this.points.geometry.setDrawRange( 0, maxPoints );
        this.max = maxPoints;
        if (this.raycaster?.params?.Points) {
            this.raycaster.params.Points.threshold = maxPoints;
        }
    }

    public getPoints2D(): [number, number][] {
        const points: [number, number][] = [];
        const pos = this.points.geometry.getAttribute("position");
        for ( let i = 0; i < this.max*2; i+=2) {
            points.push([pos.array[i], pos.array[i+1]]);
        }
        return points;
    }

    public setPoints2D(vertices: Vec2[]) {
        this.setMaxPoints(vertices.length);
        const pos = this.points.geometry.getAttribute("position");
        const color = this.points.geometry.getAttribute("color");
        for ( let i = 0; i < vertices.length; i ++) {
            const [x, y] = vertices[i];
            pos.setXY(i, x, y)
            color.setXYZ(i, ...this.color)
        }
        this.points.geometry.attributes.position.needsUpdate = true;
        this.points.geometry.attributes.color.needsUpdate = true;
    }

    private calculate2dPosAndZDistance(camera: PerspectiveCamera, clientX: number, clientY:number) {
        const vec = new THREE.Vector3();
        const pos = new THREE.Vector3();
        vec.set(
            ( clientX / window.innerWidth ) * 2 - 1,
            - ( clientY / window.innerHeight ) * 2 + 1,
            0 );

        vec.unproject( camera );
        vec.sub( camera.position ).normalize();
        const distance = - camera.position.z / vec.z;
        pos.copy( camera.position ).add( vec.multiplyScalar( distance ) );
        return {pos: [pos.x, pos.y] as [number ,number], distance};
    }

    public registerOnDragging(callback: ()=>void) {
        this.dragCallbacks.push(callback);
    }

    public unregisterOnDragging(callback: ()=>void) {
        const index = this.dragCallbacks.findIndex((activeCallback)=>activeCallback===callback);
        this.dragCallbacks.slice(index, 1);
    }

    private findPoint2d(point: [number, number], offset: number): number {
        const attribPos = this.points.geometry.getAttribute("position");
        const pointsPositions = attribPos.array;
        for (let i = 0; i<pointsPositions.length; i+=2) {
            const posXOffset = attribPos.array[i] + offset;
            const negXOffset = attribPos.array[i] - offset;
            const posYOffset = attribPos.array[i+1] + offset;
            const negYOffset = attribPos.array[i+1] - offset;
            if (posXOffset > point[0] && negXOffset < point[0] && posYOffset > point[1] && negYOffset < point[1])
                return i / 2;
        }
        return -1;
    }

    public registerToScene(scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer) {
        scene.add(this.points);
        if (this.isDraggable) {
            window.addEventListener("mousedown", event => {
                const {pos, distance} = this.calculate2dPosAndZDistance(camera, event.clientX, event.clientY);
                const offset = 0.02 * distance;
                this.currentDraggedIndex = this.findPoint2d(pos, offset);
                if (this.currentDraggedIndex>=0) {
                    const colors = this.points.geometry.getAttribute("color");
                    colors.setXYZ(this.currentDraggedIndex, ...this.dragColor);
                    this.points.geometry.attributes.color.needsUpdate = true;
                }
            })

            window.addEventListener("mouseup", event => {
                if (this.currentDraggedIndex>=0) {
                    const colors = this.points.geometry.getAttribute("color");
                    colors.setXYZ(this.currentDraggedIndex, ...this.color);
                    this.points.geometry.attributes.color.needsUpdate = true;
                }
                this.currentDraggedIndex = -1;
            })
            window.addEventListener("mousemove", event => {
                const {pos, distance} = this.calculate2dPosAndZDistance(camera, event.clientX, event.clientY);
                if (this.currentDraggedIndex >= 0) {
                    const posAttrib = this.points.geometry.getAttribute("position");
                    posAttrib.setXY(this.currentDraggedIndex, pos[0], pos[1]);
                    this.points.geometry.attributes.position.needsUpdate = true;
                    this.dragCallbacks.forEach((callback)=>{
                        callback();
                    })
                }
                else {
                    const offset = 0.02 * distance;
                    const hoverIndex = this.findPoint2d(pos, offset);
                    const colors = this.points.geometry.getAttribute("color");
                    if (hoverIndex >= 0) {
                        this.currentHoverIndex = hoverIndex;
                        colors.setXYZ(hoverIndex, ...this.hoverColor);
                        this.points.geometry.attributes.color.needsUpdate = true;
                    }
                    else if (this.currentHoverIndex >= 0) {
                        colors.setXYZ(this.currentHoverIndex, ...this.color);
                        this.points.geometry.attributes.color.needsUpdate = true;
                        this.currentHoverIndex = -1;
                    }

                }
            })
        }
    }

    public unregisterFromScene(scene: THREE.Scene) {
        scene.remove(this.points);
    }
}