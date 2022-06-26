import {PerspectiveCamera, WebGLRenderer} from "three";
import * as THREE from "three";
import {RenderObjectsInterface} from "../../interfaces/render-objects.interface";
import {LinesMesh} from "../../mesh-primitives/lines.mesh";

const MAX_POINTS = 1000;

export class PolynomialSpringCurveRender implements RenderObjectsInterface{
    private _radius = 1;
    private _stretch = 0.1;
    private _steps = 0.1;
    private end = 200;
    private line: LinesMesh = new LinesMesh(MAX_POINTS, 3, {color: "#f96cf8"});

    public get radius(): number {
        return this._radius;
    }

    public set radius(value: number) {
        this._radius = value;
        this.calculateSpring();
    }

    public get stretch(): number {
        return this._stretch;
    }

    public set stretch(value: number) {
        this._stretch = value;
        this.calculateSpring();
    }

    public get steps(): number {
        return this._steps;
    }

    public set steps(value: number) {
        this._steps = value;
        this.calculateSpring();
    }

    private calculateSpring(): void {
        const calculatedSize = this.end / this._steps;
        const usedSize = calculatedSize > MAX_POINTS ? MAX_POINTS : calculatedSize;
        let vertices: [number, number, number][] = [];
        for ( let i = 0; i < calculatedSize; i++) {
            vertices.push(this.calculatePoint(i*this._steps));
        }
        this.line.setVertices3D(vertices);
        this.line.setMaxLines(usedSize);
    }

    private calculatePoint(x: number): [number, number, number] {
        return [
            this._radius * Math.cos(x),
            this._stretch * x,
            this._radius * Math.sin(x),
        ];
    }

    public registerToScene(scene: THREE.Scene, configDiv: HTMLElement, camera: PerspectiveCamera, renderer: WebGLRenderer): void {
        this.line.registerToScene(scene, camera, renderer);
        this.calculateSpring();
    }

    public unregisterFromScene(scene: THREE.Scene, configDiv: HTMLElement): void {
        this.line.unregisterFromScene(scene);
        configDiv.innerHTML = "";
    }

    public renderTask() {

    }
}