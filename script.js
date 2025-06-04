import * as THREE from 'three';
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ------- scene + camera -------
const scene = new THREE.Scene();
let width = window.innerWidth;
let height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

// ------- renderer -------
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild( renderer.domElement );
camera.position.set(0, 0, 80);
const controls = new OrbitControls( camera, renderer.domElement );


// ------ texture cube ------
new EXRLoader()
  .load('textures/background.exr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
  });

// ------- Light -------
// const light = new THREE.AmbientLight( 0xffffff, 10 ); 
// scene.add( light );

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(50, 50, 100);
scene.add(directionalLight);


// ------- Objects -------
const geo = new THREE.SphereGeometry( 15, 32, 16 );
const mat = new THREE.MeshPhysicalMaterial();
mat.color = new THREE.Color( 0x00ffff );
mat.transparent = true;
mat.transmission = 1;
mat.ior = 1.5;
mat.metalness = 0;
mat.roughness = .1;
mat.castShadow = true;
mat.opacity = 0.4;
mat.depthWrite = false;

const mainSphere = new THREE.Mesh( geo, mat );
scene.add( mainSphere );
mainSphere.renderOrder = 1;


const newGeo = new THREE.SphereGeometry( 10, 32, 16 );
const newMat = new THREE.MeshPhysicalMaterial();
newMat.color = new THREE.Color( 0xff00ff );
newMat.transparent = true;
newMat.transmission = 1;
newMat.ior = 1.5;
newMat.metalness = 0;
newMat.roughness = .1;
newMat.castShadow = true;
newMat.opacity = 0.4;
newMat.depthWrite = false;

const secondarySphere = new THREE.Mesh(newGeo, newMat);
scene.add( secondarySphere );
secondarySphere.renderOrder = 2;

secondarySphere.position.z = -50


// ------- Responsive design -------
window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
});


// ------- animate -------
function animate() {


  controls.update();
  renderer.render( scene, camera );
  renderer.setAnimationLoop( animate );
}

animate();