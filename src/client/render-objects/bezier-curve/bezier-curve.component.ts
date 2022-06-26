import {BezierCurvePresentation} from "./bezier-curve.presentation";
import {BezierCurveRender} from "./bezier-curve.render";
import {ComponentAbstract} from "../../interfaces/component.abstract";
import { RenderObjectsInterface } from "../../interfaces/render-objects.interface";

export class BezierCurveComponent extends ComponentAbstract {
    protected handleUiUpdate(params: number[]): void {
        throw new Error("Method not implemented.");
    }
    public render: RenderObjectsInterface = new BezierCurveRender();
    public NAME: string;

    public constructor() {
        super();
        this.NAME = "Bezier-Kurve";
    }

    public register(configDiv: HTMLElement): void {
        const render = this.render as BezierCurveRender;
        configDiv.innerHTML = BezierCurvePresentation({divisionFactor: render.divisionFactor});
        this.activateListeners();
    }

    public unregister(): void {
        this.deactivateListeners();
    }

    private onClickAdd = () => {
        const render = this.render as BezierCurveRender;
        render.addPoint();
    }

    private onClickRemove = () => {
        const render = this.render as BezierCurveRender;
        render.removePoint();
    }

    private onInputDivision = (e: Event) => {
        const render = this.render as BezierCurveRender;
        // @ts-ignore
        render.divisionFactor = e.currentTarget.value;
        render.calculateAll();
    }

    private activateListeners(): void {
        document.getElementById("add")?.addEventListener("click", this.onClickAdd)
        document.getElementById("remove")?.addEventListener("click", this.onClickRemove)
        document.getElementById("division")?.addEventListener("input", this.onInputDivision)
    }

    private deactivateListeners(): void {
        document.getElementById("add")?.removeEventListener("click", this.onClickAdd)
        document.getElementById("remove")?.removeEventListener("click", this.onClickRemove)
        document.getElementById("division")?.removeEventListener("input", this.onInputDivision)
    }
}