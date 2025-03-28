import * as THREE from 'three';
import fragment from '../shaders/fragment.glsl';
import fragmentLine from '../shaders/fragmentLine.glsl';
import vertex from '../shaders/vertex.glsl';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 
    75,
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000 
);
camera.position.z = window.innerWidth > 600 ? 5 : 7; // Larger distance for smaller screens


const canvas = document.querySelector(".canvas")
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias : true,
    alpha : true
});
renderer.setSize( window.innerWidth, window.innerHeight );

  // Setup a geometry
const geometry = new THREE.IcosahedronGeometry(2, 7);
const edgeGeo = new THREE.EdgesGeometry(geometry);

// Setup a material
const material = new THREE.ShaderMaterial({
    extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable"
    },
    side: THREE.DoubleSide,
    uniforms: {
        time: { type: "f", value: 0 },
        playhead: { type: "f", value: 0 },
        resolution: { type: "v4", value: new THREE.Vector4() },
        uvRate1: { value: new THREE.Vector2(1, 1) }
    },
    vertexShader: vertex, // Correct position
    fragmentShader: fragment, // Correct position
    // wireframe: true,
    // transparent: true
});
  const material1 = new THREE.ShaderMaterial({
    extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable"
    },
    side: THREE.DoubleSide,
    uniforms: {
        time: { type: "f", value: 0 },
        playhead: { type: "f", value: 0 },
        resolution: { type: "v4", value: new THREE.Vector4() },
        uvRate1: { value: new THREE.Vector2(1, 1) }
    },
    vertexShader: vertex, // Correct position
    fragmentShader: fragmentLine, // Correct position
    // wireframe: true,
    // transparent: true
});
  
  const material2 = new THREE.ShaderMaterial({
    extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable"
    },
    side: THREE.DoubleSide,
    uniforms: {
        time: { type: "f", value: 0 },
        playhead: { type: "f", value: 0 },
        resolution: { type: "v4", value: new THREE.Vector4() },
        uvRate1: { value: new THREE.Vector2(1, 1) }
    },
    vertexShader: vertex, // Correct position
    fragmentShader: fragmentLine, // Correct position
    // wireframe: true,
    // transparent: true
});

// Setup a mesh with geometry + material
const mesh = new THREE.Mesh(geometry, material);
const meshLines = new THREE.LineSegments(edgeGeo, material1);
const meshPoints = new THREE.Points(geometry, material2);
const meshSphere = new THREE.Mesh(
    geometry,
    new THREE.MeshMatcapMaterial({
        matcap: new THREE.TextureLoader().load("/texture/15.jpg"),
        // matcap: new THREE.TextureLoader().load("/texture/11.png"),
        transparent: true,
        opacity:1
    })
);
  
scene.add(mesh);
scene.add(meshLines);
scene.add(meshPoints);
scene.add(meshSphere);
  
meshLines.scale.set(1.001,1.001,1.001)
// meshLines.scale.set(1.5,1.5,1.5)
meshPoints.scale.set(1.15,1.15,1.15)


function resize() {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}
resize();
window.addEventListener("resize" , resize)

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableZoom = false;

const clock = new THREE.Clock();

function animate() {
    const playhead =  clock.getElapsedTime() / Math.PI ;

    material.uniforms.playhead.value = playhead ;
    material1.uniforms.playhead.value = playhead ;
    material2.uniforms.playhead.value = playhead ;
    scene.rotation.x = 0.1 * Math.sin(playhead * 4 * Math.PI)
    scene.rotation.y = 0.2 * Math.sin(playhead * 2 * Math.PI)
    scene.rotation.z = 0.3 * Math.sin(playhead * 2 * Math.PI)



    controls.update();
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
}
animate()