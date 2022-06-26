import {ComponentAbstract} from "../../interfaces/component.abstract";
import { RenderObjectsInterface } from "../../interfaces/render-objects.interface";
import {QuaternionsRender} from "./quaternions.render";
import {QuaternionsPresentation} from "./quaternions.presentation";
import {Vec4} from "../../types/vector.types";

export class QuaternionsComponent extends ComponentAbstract {
    protected render: RenderObjectsInterface = new QuaternionsRender();

    public readonly NAME = "Quaternionen"
    private configDiv: HTMLElement | undefined;

    protected register(configDiv: HTMLElement): void {
        this.activateConfigListener();
        this.configDiv = configDiv;
        configDiv.innerHTML = QuaternionsPresentation([ 1, 0, 0, 0]);
    }

    protected handleUiUpdate = (params: number[]) => {
        params = params.map(param => Math.round(param * 10000) / 10000);
        if (this.configDiv && params.length === 4)
            this.configDiv.innerHTML = QuaternionsPresentation(params as Vec4);
    }

    protected unregister(): void {
        this.deactivateConfigListener();
        this.configDiv = undefined;
    }

    public activateConfigListener(): void {

    }

    public deactivateConfigListener(): void {

    }
}