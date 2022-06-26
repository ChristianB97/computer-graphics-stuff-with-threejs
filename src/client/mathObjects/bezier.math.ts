import {calcBernsteinPoint} from "../math/bezier/calcBernsteinPoint";
import {calcCasteljauPoint} from "../math/bezier/calcCasteljauPoint";
import {calcCasteljauPointsAsSegment} from "../math/bezier/calcCasteljauPointsAsSegment";
import {Vec2} from "../types/vector.types";

export class BezierMath {
    public static calcBernsteinPoint = calcBernsteinPoint;
    public static calcCasteljauPoint = calcCasteljauPoint;
    public static calcCasteljauPointsAsSegment = calcCasteljauPointsAsSegment;

    public static calcAllCasteljauPoints = (edgyPoints: Vec2[], steps: number, isBernstein?: boolean): Vec2[] => {
        const curvyPoints: Vec2[] = [];
        const calcPoint = isBernstein ? calcBernsteinPoint : calcCasteljauPoint;
        for (let time = 0; time <= 1.0; time += steps) {
            const point: Vec2 = calcPoint(edgyPoints, edgyPoints.length, time);
            curvyPoints.push(point)
        }
        return curvyPoints;
    }
}