import {PerspectiveCamera, Scene, WebGLRenderer} from "three";
import {RenderObjectsInterface} from "./render-objects.interface";

export abstract class ComponentAbstract {
    public readonly abstract NAME: string;
    protected readonly abstract render: RenderObjectsInterface;
    protected abstract register(configDiv: HTMLElement): void;
    protected abstract handleUiUpdate(params: number[]): void;
    public registerToScene(scene: Scene, configDiv: HTMLElement, camera: PerspectiveCamera, renderer: WebGLRenderer): void {
        this.register(configDiv);
        this.render.registerToScene(scene, configDiv, camera, renderer, this.handleUiUpdate);
    }
    protected abstract unregister(): void;
    public unregisterFromScene(scene: Scene, configDiv: HTMLElement): void {
        this.register(configDiv);
        configDiv.innerHTML = "";
        this.render.unregisterFromScene(scene, configDiv);
    }

    public renderTask(): void {
        this.render.renderTask();
    }
}