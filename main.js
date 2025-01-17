import "./style.css";
import * as THREE from "three";
import { PointerLockControls } from "three-stdlib";
// Scene
const scene = new THREE.Scene(); // create the scene
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};
// Camera
const camera = new THREE.PerspectiveCamera(
    // field of view
    75,
    sizes.width / sizes.height,
    0.1,
    100,
);
// Move the camera 5 unit
camera.position.z = 5;
scene.add(camera);
// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor(0xffffff, 1);
// Add the renderer to our html
document.body.appendChild(renderer.domElement);
// Lights
let ambientLight = new THREE.AmbientLight(0x101010, 1.0); // color, intensity, distance, decay
// ambientLight.position = camera.position; // Light follow camera
ambientLight.position.copy(camera.position); // Light follow camera
scene.add(ambientLight);
// Directional Light
let sunLight = new THREE.DirectionalLight(0xdddddd, 1.0); // color intensity
sunLight.position.y = 15;
scene.add(sunLight);
//Object
const geometry = new THREE.BoxGeometry(1, 1, 1, 20, 20, 20);
const material = new THREE.MeshBasicMaterial({
    color: 0x111111,
    wireframe: true,
});
const cube = new THREE.Mesh(geometry, material); // create cute with geometry andd material
scene.add(cube); // add cube to scene

// Controls
// EventListener for, when we press the keys
window.addEventListener("keydown", onKeyDown, false);

// Texture
// Create a texture loader
const textureLoader = new THREE.TextureLoader();

// Load the texture
const floorTexture = textureLoader.load("textures/floor.jpg");

// You can use the texture as needed, for example, in a material
// create the floor plane.
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture });
const plane = new THREE.Mesh(floorGeometry, floorMaterial);
plane.rotation.x = -Math.PI * 0.5; // this is 90 degree rotation
plane.position.y = -Math.PI; // this is -180 degrees
// Add the floor mesh to the scene
scene.add(plane);

const ceilingGeometry = new THREE.PlaneGeometry(20, 20);
const ceilingMaterial = new THREE.MeshBasicMaterial({ map: floorTexture });
const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceiling.rotation.x = Math.PI / 2;
ceiling.position.y = 10;
scene.add(ceiling)

// Create the walls
const wallGroup = new THREE.Group(); // create a group to hold the walls
scene.add(wallGroup); // add the group to the scene
const wallTexture = textureLoader.load("textures/wall.jpg");

// front wall
const frontWall = new THREE.Mesh(
    new THREE.BoxGeometry(20, 20, 0.001),
    new THREE.MeshBasicMaterial({ map: wallTexture}),
);
frontWall.position.z = -10;
// Left wall
const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.001),
    new THREE.MeshBasicMaterial({ map: wallTexture }),
);
leftWall.rotation.y = Math.PI / 2;
leftWall.position.x = -10;
// Right wall
const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.001),
    new THREE.MeshBasicMaterial({ map: wallTexture }),
);
rightWall.rotation.y = -Math.PI / 2;
rightWall.position.x = 10;

wallGroup.add(frontWall, leftWall, rightWall);

// Loop through each wall and create a bounding box for it
for(let i = 0; i < wallGroup.children.length; i++) {
    const wall = wallGroup.children[i]
    const box = new THREE.Box3().setFromObject(wall);
    console.log(box);
}

// Create the door )

// function when key is pressed, execute the function
function onKeyDown(event) {
    switch (event.keyCode) {
        case 37: // left
            cube.translateX(0.05);
            // plane.translateX(0.05);
            break;
        case 38: // top
            cube.translateZ(-0.05);
            // plane.translateY(-0.05);
            break;
        case 39: // right
            cube.translateX(-0.05);
            // plane.translateX(-0.05);
            break;
        case 40: // bottom
            cube.translateZ(0.05);
            // plane.translateY(0.05);
            break;
        /*
            
             case 37: // left
            cube.translateX(-0.05);
            plane.translateX(-0.05);
            break;
        case 38: // up
            cube.translateY(0.05);
            plane.translateY(0.05);
            break;
        case 39: // right
            cube.translateX(0.05);
            plane.translateX(0.05);
            break;
        case 40: // down
            cube.translateY(-0.05);
            plane.translateY(-0.05);
            break;
            */
    }
}
// Animate renderer loop
const Animate = () => {
    requestAnimationFrame(Animate);
    // Update
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // Render
    renderer.render(scene, camera);
};
Animate();
