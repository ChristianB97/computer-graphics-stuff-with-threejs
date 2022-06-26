export const PolynomialSpringCurvePresentation = ({radius, steps, stretch}: {[value: string]: number}) => `
            <form>
                <label for="radius">Radius</label>
                <input type="number" id="radius" min="0.1" name="radius" value="${radius}">
                <label for="steps">Schritte</label>
                <input type="number" id="steps" min="0.1" name="steps" step="0.01" value="${steps}">
                <label for="stretch">Stretch</label>
                <input type="number" id="stretch" min="0.1" name="stretch" step="0.05" value="${stretch}">
            </form>
        `