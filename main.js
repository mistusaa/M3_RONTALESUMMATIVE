import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Scene, Camera, Renderer Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);


// OrbitControls for easy navigation
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Enable shadow casting for the directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 5, 5); 
directionalLight.castShadow = true; // Enable shadows for the directional light
scene.add(directionalLight); 

// Configure shadow map size for the directional light
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 100;

// Load Textures
const textureLoader = new THREE.TextureLoader();
const floorTexture = textureLoader.load('floor.jpg'); 
const wallTexture = textureLoader.load('wall.jpg'); 
const ceilingTexture = textureLoader.load('ceiling.jpg'); 

// Create Ceiling
const ceilingMaterial = new THREE.MeshStandardMaterial({
    map: ceilingTexture,
    roughness: 0.2, 
    metalness: 0.1, 
    anisotropy: 16 
  });
  const ceilingGeometry = new THREE.PlaneGeometry(20, 20); 
  const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
  ceiling.position.set(0, 10, 0); 
  ceiling.rotation.x = Math.PI / 2; 
  scene.add(ceiling); 

// Create Floor
const floorMaterial = new THREE.MeshStandardMaterial({
  map: floorTexture,
  roughness: 0.5,
  metalness: 0.1,
  anisotropy: 16
});
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; 
scene.add(floor);

// Create Walls
const wallMaterial = new THREE.MeshStandardMaterial({
  map: wallTexture,
  roughness: 0.8, 
  metalness: 0.1, 
  anisotropy: 16 
});

// Back Wall
const backWallGeometry = new THREE.PlaneGeometry(20, 10);
const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
backWall.position.set(0, 5, -10);
scene.add(backWall);

// Front Wall
const frontWallGeometry = new THREE.PlaneGeometry(20, 10); 
const frontWall = new THREE.Mesh(frontWallGeometry, wallMaterial);
frontWall.position.set(0, 5, 10); 
scene.add(frontWall);
frontWall.rotation.y = Math.PI / 1;

// Right Wall 
const rightWallGeometry = new THREE.PlaneGeometry(20, 10);
const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
rightWall.position.set(10, 5, 0); 
rightWall.rotation.y = -Math.PI / 2; 
scene.add(rightWall);

// Left Wall 
const leftWallGeometry = new THREE.PlaneGeometry(20, 10);
const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
leftWall.position.set(-10, 5, 0); 
leftWall.rotation.y = Math.PI / 2; 
scene.add(leftWall);

// Set initial camera position
camera.position.set(0, 10, 15);
camera.lookAt(0, 0, 0);

// Load GLB Model table
const loader = new GLTFLoader();
loader.load(
  'table.glb', 
  (gltf) => {
    const model = gltf.scene; 

    // Get the bounding box of the model
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3()); 

    // Calculate scaling factors (adjust as needed)
    const scaleFactor = 0.03; 
    const scaleX = scaleFactor;
    const scaleZ = scaleFactor; 

    // Scale the model
    model.scale.set(scaleX, scaleX, scaleZ);

    // Position the model in the center of the room
    model.position.set(-7, 0, 1); 

    model.name = 'table'; // Assign a name to the model for easy retrieval

    scene.add(model); 
  },
  (progress) => {
    console.log('Loading progress:', progress.loaded / progress.total); 
  },
  (error) => {
    console.error('An error occurred while loading the model:', error);
  }
);

// Load GLB Model - Chair
const chairLoader = new GLTFLoader(); 
chairLoader.load(
  'chair.glb', 
  (gltf) => {
    const chairModel = gltf.scene; 

    // Get the bounding box of the chair model
    const chairBox = new THREE.Box3().setFromObject(chairModel);
    const chairSize = chairBox.getSize(new THREE.Vector3()); 

    // Calculate scaling factors (adjust as needed)
    const chairScaleFactor = 1.3; 
    const chairScaleX = chairScaleFactor;
    const chairScaleZ = chairScaleFactor; 

    // Scale the chair model
    chairModel.scale.set(chairScaleX, chairScaleX, chairScaleZ); 

    // Position the chair (adjust as needed)
    chairModel.position.set(-22, 0, 6); 

    chairModel.name = 'chair'; // Assign a name to the model

    scene.add(chairModel); 
  },
  (progress) => {
    console.log('Loading progress:', progress.loaded / progress.total); 
  },
  (error) => {
    console.error('An error occurred while loading the model:', error);
  }
);

// Load GLB Model - Vending Machine
const vendingMachineLoader = new GLTFLoader(); 
vendingMachineLoader.load(
  'vendingmachine1.glb', 
  (gltf) => {
    const vendingMachineModel = gltf.scene; 

    // Get the bounding box of the vending machine model
    const vendingMachineBox = new THREE.Box3().setFromObject(vendingMachineModel);
    const vendingMachineSize = vendingMachineBox.getSize(new THREE.Vector3()); 

    // Calculate scaling factors (adjust as needed)
    const vendingMachineScaleFactor = 0.07; 
    const vendingMachineScaleX = vendingMachineScaleFactor;
    const vendingMachineScaleZ = vendingMachineScaleFactor; 

    // Scale the vending machine model
    vendingMachineModel.scale.set(vendingMachineScaleX, vendingMachineScaleX, vendingMachineScaleZ); 

    // Position the vending machine (adjust as needed)
    vendingMachineModel.position.set(10, 0, -9); 

    vendingMachineModel.rotation.y = Math.PI / -2;

    scene.add(vendingMachineModel); 
  },
  (progress) => {
    console.log('Loading progress:', progress.loaded / progress.total); 
  },
  (error) => {
    console.error('An error occurred while loading the model:', error);
  }
);

// Load GLB Model - Vending Machine 2
const vendingMachineLoader2 = new GLTFLoader(); 
vendingMachineLoader2.load(
  'vendingmachine2.glb', 
  (gltf) => {
    const vendingMachineModel2 = gltf.scene; 

    // Get the bounding box of the vending machine model
    const vendingMachineBox = new THREE.Box3().setFromObject(vendingMachineModel2);
    const vendingMachineSize = vendingMachineBox.getSize(new THREE.Vector3()); 

    // Calculate scaling factors (adjust as needed)
    const vendingMachineScaleFactor = 0.04;
    const vendingMachineScaleX = vendingMachineScaleFactor;
    const vendingMachineScaleZ = vendingMachineScaleFactor; 

    // Scale the vending machine model
    vendingMachineModel2.scale.set(vendingMachineScaleX, vendingMachineScaleX, vendingMachineScaleZ); 

    // Position the vending machine (adjust as needed)
    vendingMachineModel2.position.set(8.5, 0, -3); 

    // Rotate vending machine 2 to face right (optional)
    vendingMachineModel2.rotation.y = -Math.PI / 2;

    scene.add(vendingMachineModel2); 
  },
  (progress) => {
    console.log('Loading progress:', progress.loaded / progress.total); 
  },
  (error) => {
    console.error('An error occurred while loading the model:', error);
  }
);

// Load GLB Model - Counter Table
const counterTableLoader = new GLTFLoader();
counterTableLoader.load(
  'counter.glb', 
  (gltf) => {
    const counterTableModel = gltf.scene; 

    // Get the bounding box of the counter table model
    const counterTableBox = new THREE.Box3().setFromObject(counterTableModel);
    const counterTableSize = counterTableBox.getSize(new THREE.Vector3()); 

    // Calculate scaling factors (adjust as needed)
    const counterTableScaleFactor = 15; 
    const counterTableScaleX = counterTableScaleFactor;
    const counterTableScaleZ = counterTableScaleFactor; 

    // Scale the counter table model
    counterTableModel.scale.set(counterTableScaleX, counterTableScaleX, counterTableScaleZ); 

    // Position the counter table (adjust as needed)
    counterTableModel.position.set(-3.3, 1, 2); 

    counterTableModel.rotation.y = -Math.PI / 1;

    scene.add(counterTableModel); 
  },
  (progress) => {
    console.log('Loading progress:', progress.loaded / progress.total); 
  },
  (error) => {
    console.error('An error occurred while loading the model:', error);
  }
);

// Load GLB Model - Scientist
const scientistLoader = new GLTFLoader();
scientistLoader.load(
  'scientist.glb',
  (gltf) => {
    const scientistModel = gltf.scene; 

    // Get the bounding box of the scientist model
    const scientistBox = new THREE.Box3().setFromObject(scientistModel);
    const scientistSize = scientistBox.getSize(new THREE.Vector3()); 

    // Calculate scaling factors (adjust as needed)
    const scientistScaleFactor = 0.09; 
    const scientistScaleX = scientistScaleFactor;
    const scientistScaleZ = scientistScaleFactor; 

    // Scale the scientist model
    scientistModel.scale.set(scientistScaleX, scientistScaleX, scientistScaleZ); 

    // Position the scientist (adjust as needed)
    scientistModel.position.set(5, 0, -8); 

    scientistModel.rotation.y = -Math.PI /-2;

    scene.add(scientistModel); 
  },
  (progress) => {
    console.log('Loading progress:', progress.loaded / progress.total); 
  },
  (error) => {
    console.error('An error occurred while loading the model:', error);
  }
);

// Load GLB Model - Ceiling Light
const ceilingLightLoader = new GLTFLoader();
ceilingLightLoader.load(
  'ceilinglight.glb', 
  (gltf) => {
    const ceilingLightModel = gltf.scene; 

    // Get the bounding box of the ceiling light model
    const ceilingLightBox = new THREE.Box3().setFromObject(ceilingLightModel);
    const ceilingLightSize = ceilingLightBox.getSize(new THREE.Vector3()); 

    // Calculate scaling factors (adjust as needed)
    const ceilingLightScaleFactor = 1.5; 
    const ceilingLightScaleX = ceilingLightScaleFactor;
    const ceilingLightScaleZ = ceilingLightScaleFactor; 

    // Scale the ceiling light model
    ceilingLightModel.scale.set(ceilingLightScaleX, ceilingLightScaleX, ceilingLightScaleZ); 

    // Position the ceiling light (adjust as needed)
    ceilingLightModel.position.set(-3, 9.5, 0); 

    ceilingLightModel.rotation.x = Math.PI; 

    ceilingLightModel.rotation.y = -Math.PI /-2; 

    // Add a light source to the ceiling light model
    const spotlight = new THREE.SpotLight(0xffffff, 3.0); 
    spotlight.position.set(0, -2.5, 6); 
    spotlight.target = new THREE.Object3D(); 
    spotlight.target.position.set(-3, 0, 0); 
    spotlight.angle = Math.PI / 4;  
    spotlight.penumbra = 1;  
    spotlight.decay = 0; 

    // Enable shadows for the spotlight
    spotlight.castShadow = true; 
    
    // Configure shadow map size for the spotlight
    spotlight.shadow.mapSize.width = 4096; 
    spotlight.shadow.mapSize.height = 4096;
    spotlight.shadow.camera.near = 0.1;
    spotlight.shadow.camera.far = 100; 
    
    ceilingLightModel.add(spotlight);

    scene.add(ceilingLightModel); 
  },
  (progress) => {
    console.log('Loading progress:', progress.loaded / progress.total); 
  },
  (error) => {
    console.error('An error occurred while loading the model:', error);
  }
);

// Enable Shadows for All Objects in the Scene
scene.traverse(function (child) {
  if (child instanceof THREE.Mesh) {
    child.castShadow = true;
    child.receiveShadow = true;
  }
});

// Render Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();