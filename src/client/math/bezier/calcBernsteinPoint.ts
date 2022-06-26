import {Vec2} from "../../types/vector.types";

export const calcBernsteinPoint = (points: Vec2[], time: number): Vec2 => {
    let x = 0;
    let y = 0;
    const factorial = (i: number): number => {
        if (i<=1) return 1;
        return factorial(i-1) * i;
    }
    points.forEach((point: Vec2, i)=>{
        const firstPart = factorial(points.length-1)/(factorial(i)*factorial(points.length-1-i))
        const secondPart = Math.pow(1-time, points.length-i-1);
        const thirdPart = Math.pow(time, i);
        x += firstPart*secondPart*thirdPart*points[i][0];
        y += firstPart*secondPart*thirdPart*points[i][1];
    })
    return [x,y]
}