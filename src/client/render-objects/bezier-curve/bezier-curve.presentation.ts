export const BezierCurvePresentation = ({divisionFactor}: {divisionFactor: number}): string => `
            <form>
                <button type="button" id="add" style="width: 25px">+</button>
                <button type="button" id="remove" style="width: 25px">-</button>
                <label for="division">Teilungsverhältnis</label>
                <input type="number" id="division" max="1" min="0" name="division" step="0.009" value="${divisionFactor}">
            </form>
        `;