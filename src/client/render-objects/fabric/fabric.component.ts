import {ComponentAbstract} from "../../interfaces/component.abstract";
import { RenderObjectsInterface } from "../../interfaces/render-objects.interface";
import {FabricRender} from "./fabric.render";
import {FabricPresentation} from "./fabric.presentation";
import {Vec4} from "../../types/vector.types";

export class FabricComponent extends ComponentAbstract {
    protected render: RenderObjectsInterface = new FabricRender();

    public readonly NAME = "Tuch"
    private configDiv: HTMLElement | undefined;

    protected register(configDiv: HTMLElement): void {
        this.activateConfigListener();
        this.configDiv = configDiv;
        configDiv.innerHTML = FabricPresentation();
    }

    protected handleUiUpdate = (params: number[]) => {

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