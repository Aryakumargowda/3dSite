import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

const size = { width: window.innerWidth, height: window.innerHeight };

const scene = new THREE.Scene();

//mesh
// const geometry = new THREE.SphereGeometry(3, size.width, size.height);
// const material = new THREE.MeshStandardMaterial({ color: 0x00ff83 });
// const sphere = new THREE.Mesh(geometry, material);
// scene.add(sphere);

const loaders = new GLTFLoader();
loaders.load("marble.glb", function (gltf) {

  scene.add(gltf.scene);
});

//light
const pointLight = new THREE.PointLight(0x6d69db, 1000, 20);
pointLight.position.set(10, 5, 10);
scene.add(pointLight);
const anotherLight = new THREE.PointLight(0xee4747, 300, 30);
anotherLight.position.set(-10, -5, -10);
scene.add(anotherLight);
// const anotherLight = new THREE.PointLight(0x3c36ef, 300, 30);
// anotherLight.position.set(-10, -5, -10);
// scene.add(anotherLight);
// const light = new THREE.SpotLight(0x9c9c9c, 1000, 20);
// scene.add(light);
// Camera

const camera = new THREE.PerspectiveCamera(10, size.width / size.height);
// camera.rotation.y=45/180*Math.PI;
// camera.position.x = 10;
// camera.position.y = 10;
camera.position.z = 5;
scene.add(camera);

//render

const canvas = document.querySelector(".webgl");

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(2);
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.render(scene, camera);

//controller
const controls = new OrbitControls(camera, canvas);

controls.enableDamping = true;
controls.enablePan = false;
controls.autoRotate = true;
controls.enableZoom = false;
//loop
window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  //camera update
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
});

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();
