import * as THREE from 'three';

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

// ------- Light -------

// ------- Object -------
const geo = new THREE.SphereGeometry( 15, 32, 16 );
const mat = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
const mainSphere = new THREE.Mesh( geo, mat );
scene.add( mainSphere );

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

  renderer.render( scene, camera );
  renderer.setAnimationLoop( animate );
}

animate();