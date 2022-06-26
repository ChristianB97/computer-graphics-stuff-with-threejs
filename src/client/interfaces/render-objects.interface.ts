import {PerspectiveCamera, Scene, WebGLRenderer} from "three";

export interface RenderObjectsInterface {
    registerToScene: (scene: Scene, configDiv: HTMLElement, camera: PerspectiveCamera, renderer: WebGLRenderer, onParametersUpdated?: (params: number[])=>void)=>void,
    unregisterFromScene: (scene: Scene, configDiv: HTMLElement)=>void,
    renderTask: ()=>void

}