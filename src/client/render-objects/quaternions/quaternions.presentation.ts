import {Vec4} from "../../types/vector.types";

export const QuaternionsPresentation = (quaternion: Vec4 = [1, 0, 0, 0]) => `
    <div>
        w: ${quaternion[0]}
    </div>
    <div>
        x: ${quaternion[1]}
    </div>
    <div>
         y: ${quaternion[2]}
    </div>
    <div>
        z: ${quaternion[3]}
    </div>
`;