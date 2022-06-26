import * as THREE from "three";
import {RenderObjectsInterface} from "../../interfaces/render-objects.interface";
import {LinesMesh} from "../../mesh-primitives/lines.mesh";
import {PerspectiveCamera, Points, Scene, Vector2, WebGLRenderer} from "three";
import {PointsMesh} from "../../mesh-primitives/points.mesh";
import {Vec2} from "../../types/vector.types";
import {BezierMath} from "../../mathObjects/bezier.math";

const MAX_LINES = 3000;

export class BezierCurveRender implements RenderObjectsInterface {
    private steps = 0.03;
    private edgyLines = new LinesMesh(MAX_LINES, 2, {color: "#ac58af"})
    private curvyLines = new LinesMesh(MAX_LINES, 2, {color: "#f96cf8"})
    private points: PointsMesh = new PointsMesh(100, 2, {color: "#E59866", isDraggable: true});
    private DEFAULT_POINTS: [number,number][] = [[2, 2], [2, -2], [-2, -2], [-2, 2]];
    private casteljauLines = new LinesMesh(MAX_LINES, 2, {isSegment: true, color: "#ac58af"});
    private casteljauPoint: PointsMesh = new PointsMesh(1, 2, {color: "#8510d8"});
    public divisionFactor = 0.5;

    public constructor() {
        this.points.setPoints2D(this.DEFAULT_POINTS);
    }

    public registerToScene(scene: Scene, configDiv: HTMLElement, camera: PerspectiveCamera, renderer: WebGLRenderer): void {
        this.edgyLines.registerToScene(scene, camera, renderer);
        this.curvyLines.registerToScene(scene, camera, renderer);
        this.points.registerToScene(scene, camera, renderer);
        this.casteljauLines.registerToScene(scene, camera, renderer);
        this.casteljauPoint.registerToScene(scene, camera, renderer);
        this.points.registerOnDragging(this.calculateAll);
        this.calculateAll();
    }

    public unregisterFromScene(scene: THREE.Scene, configDiv: HTMLElement): void {
        this.edgyLines.unregisterFromScene(scene)
        this.curvyLines.unregisterFromScene(scene)
        this.points.unregisterFromScene(scene);
        this.casteljauLines.unregisterFromScene(scene);
        this.casteljauPoint.unregisterFromScene(scene);
        this.points.unregisterOnDragging(this.calculateAll);
    }

    public calculateAll = () => {
        const edgyPoints = this.points.getPoints2D();
        this.edgyLines.setVertices2D(edgyPoints)

        const curvyPoints: Vec2[] = BezierMath.calcAllCasteljauPoints(edgyPoints, this.steps);
        this.curvyLines.setVertices2D(curvyPoints)

        const edgySegmentPoints = this.convertPointsToSegmentLinePoints(edgyPoints);
        const casteljauSegmentPoints = BezierMath.calcCasteljauPointsAsSegment(edgySegmentPoints, edgySegmentPoints.length, this.divisionFactor);
        this.casteljauLines.setVertices2D(casteljauSegmentPoints);

        const finalCasteljau = BezierMath.calcCasteljauPoint(edgyPoints, edgyPoints.length, this.divisionFactor);
        this.casteljauPoint.setPoints2D([finalCasteljau]);
    }

    private convertPointsToSegmentLinePoints(points: Vec2[]) {
        let previous = points[0];
        const segmentLinesPoints = [];
        for (let i = 1; i < points.length; i++) {
            segmentLinesPoints.push(previous, points[i]);
            previous = points[i];
        }
        return segmentLinesPoints;
    }

    public addPoint() {
        const pointsPos = this.points.getPoints2D();
        const lastPoint = pointsPos[pointsPos.length-1];
        const newPoint = [lastPoint[0]+1, lastPoint[1]] as Vec2;
        const newPointsPos = [...pointsPos, newPoint];
        this.points.setPoints2D(newPointsPos);
        this.calculateAll();
    }

    public removePoint() {
        const pointsPos = this.points.getPoints2D();
        if (pointsPos.length > 1) {
            pointsPos.pop();
            this.points.setPoints2D(pointsPos);
            this.calculateAll();
        }
    }

    public renderTask() {

    }
}