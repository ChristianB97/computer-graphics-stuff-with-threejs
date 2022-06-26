import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {BezierCurveComponent} from "./render-objects/bezier-curve/bezier-curve.component";
import {PolynomialSpringCurveComponent} from "./render-objects/polynomial-spring-curve/polynomial-spring-curve.component";
import {ComponentAbstract} from "./interfaces/component.abstract";
import {QuaternionsComponent} from "./render-objects/quaternions/quaternions.component";
import {FabricComponent} from "./render-objects/fabric/fabric.component";

const scene = new THREE.Scene();
scene.background = new THREE.Color("#07060e");

const renderOptions = [
    new PolynomialSpringCurveComponent(),
    new BezierCurveComponent(),
    new QuaternionsComponent(),
    new FabricComponent()
] as ComponentAbstract[];

let currentRenderOption = renderOptions[0];

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

camera.position.z = 2


const renderer = new THREE.WebGLRenderer()
renderer.setClearColor( new THREE.Color(1,0,1), .5 );
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.domElement.id = "renderer"
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = false;

const parameters = document.getElementById("parameters");

const navigation = document.getElementById("nav");
if (navigation && parameters) {
    currentRenderOption.registerToScene(scene, parameters, camera, renderer);
    const list = document.createElement("ul");
    renderOptions.forEach((option) => {
        const element = document.createElement("li");
        element.innerHTML = option.NAME;
        element.onclick = () => {
            currentRenderOption.unregisterFromScene(scene, parameters);
            currentRenderOption = option;
            currentRenderOption.registerToScene(scene, parameters, camera, renderer);
        }
        list.appendChild(element);
    })
    navigation.appendChild(list);
}



window.addEventListener('resize', onWindowResize, false)


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)
    currentRenderOption.renderTask();
    render()
}

function render() {

    renderer.render(scene, camera);
}

animate()