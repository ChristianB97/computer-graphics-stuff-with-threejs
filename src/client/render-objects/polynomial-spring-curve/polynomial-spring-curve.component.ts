import {ComponentAbstract} from "../../interfaces/component.abstract";
import {PolynomialSpringCurveRender} from "./polynomial-spring-curve.render";
import { RenderObjectsInterface } from "../../interfaces/render-objects.interface";
import {PolynomialSpringCurvePresentation} from "./polynomial-spring-curve.presentation";

export class PolynomialSpringCurveComponent extends ComponentAbstract {
    protected handleUiUpdate(params: number[]): void {
        throw new Error("Method not implemented.");
    }
    protected render: RenderObjectsInterface = new PolynomialSpringCurveRender();

    public readonly NAME = "Polynomiale Feder"

    protected register(configDiv: HTMLElement): void {
        const {radius, steps, stretch} = this.render as PolynomialSpringCurveRender;
        configDiv.innerHTML = PolynomialSpringCurvePresentation({radius, steps, stretch});
        this.activateConfigListener();
    }

    protected unregister(): void {
        this.deactivateConfigListener();
    }

    private onRadiusInputChange = (event: Event) => {
        const render = this.render as PolynomialSpringCurveRender;
        console.log(render)
        // @ts-ignore
        render.radius = event.currentTarget?.value;
    }

    private onStepsInputChange = (event: Event) => {
        const render = this.render as PolynomialSpringCurveRender;
        // @ts-ignore
        render.steps = event.currentTarget?.value;
    }

    private onStretchInputChange = (event: Event) => {
        const render = this.render as PolynomialSpringCurveRender;
        // @ts-ignore
        render.stretch = event.currentTarget?.value;
    }

    public activateConfigListener(): void {
        const radiusInput = document.getElementById("radius");
        const stepsInput = document.getElementById("steps");
        const stretch = document.getElementById("stretch")
        radiusInput?.addEventListener("input", this.onRadiusInputChange)
        stepsInput?.addEventListener("input", this.onStepsInputChange);
        stretch?.addEventListener("input", this.onStretchInputChange);
    }

    public deactivateConfigListener(): void {
        const radiusInput = document.getElementById("radius");
        const stepsInput = document.getElementById("steps");
        const stretch = document.getElementById("stretch")
        radiusInput?.removeEventListener("input", this.onRadiusInputChange)
        stepsInput?.removeEventListener("input", this.onStepsInputChange);
        stretch?.removeEventListener("input", this.onStretchInputChange);
    }
}