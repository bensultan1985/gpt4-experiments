import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Floor
const floorGeometry = new THREE.CylinderGeometry(8, 8, 0.5, 32);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
scene.add(floor);

// Walls
const wallsGeometry = new THREE.CylinderGeometry(8, 8, 4, 32, 1, true);
const wallsMaterial = new THREE.MeshBasicMaterial({
  color: 0x565656,
  side: THREE.DoubleSide,
});
const walls = new THREE.Mesh(wallsGeometry, wallsMaterial);
walls.position.y = 2;
scene.add(walls);

// Ceiling
const ceilingGeometry = new THREE.CylinderGeometry(8, 8, 0.5, 32);
const ceilingMaterial = new THREE.MeshBasicMaterial({ color: 0x444444 });
const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceiling.position.y = 4;
scene.add(ceiling);

// Main console
const consoleGeometry = new THREE.CylinderGeometry(2.5, 2.5, 1, 16);
const consoleMaterial = new THREE.MeshBasicMaterial({ color: 0x666666 });
const mainConsole = new THREE.Mesh(consoleGeometry, consoleMaterial);
mainConsole.position.y = 0.5;
scene.add(mainConsole);

// Captain's chair
const chairGeometry = new THREE.BoxGeometry(1, 2, 1);
const chairMaterial = new THREE.MeshBasicMaterial({ color: 0x111111 });
const chair = new THREE.Mesh(chairGeometry, chairMaterial);
chair.position.set(0, 1, 3);
scene.add(chair);

// Screen
const screenGeometry = new THREE.PlaneGeometry(6, 3);
const screenTexture = new THREE.TextureLoader().load(
  "https://media.istockphoto.com/id/1283307885/vector/stippled-vector-texture-background-white-dots-on-black.jpg?s=612x612&w=0&k=20&c=-jnnVhrgH4vr9OC464ARX671AFmsrRK9sMJZ7baTJT0="
);
const screenMaterial = new THREE.MeshBasicMaterial({
  map: screenTexture,
  side: THREE.DoubleSide,
});
const screen = new THREE.Mesh(screenGeometry, screenMaterial);
screen.position.set(0, 1.5, -4);
scene.add(screen);

// Digital panels
function createPanel(rotation, width, height) {
  const colors = [
    0x8b4513, // brown
    0xd2b48c, // tan
    0xf5f5dc, // beige
    0xffa500, // orange
    0x000000, // black
  ];

  const panelRadius = 8.1; // Increase the radius to make panels protrude slightly
  const panelSegments = 32;
  const panelGeometry = new THREE.CylinderGeometry(
    panelRadius,
    panelRadius,
    height,
    panelSegments,
    1,
    true
  );
  const panel = new THREE.Object3D();

  const squareSize = 0.15;
  const gap = 0.05;
  const squaresPerRow = Math.floor(width / (squareSize + gap));
  const squaresPerColumn = Math.floor(height / (squareSize + gap));

  for (let i = 0; i < squaresPerRow; i++) {
    for (let j = 0; j < squaresPerColumn; j++) {
      const squareGeometry = new THREE.PlaneGeometry(squareSize, squareSize);
      const squareMaterial = new THREE.MeshBasicMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
      });
      const square = new THREE.Mesh(squareGeometry, squareMaterial);

      const squareAngle =
        (i * (squareSize + gap) - width / 2 + squareSize / 2) / panelRadius;
      square.position.set(
        (panelRadius - 0.2) * Math.sin(squareAngle + rotation),
        1.5 + j * (squareSize + gap) - height / 2 + squareSize / 2,
        -(panelRadius - 0.2) * Math.cos(squareAngle + rotation)
      );

      square.rotation.y = squareAngle + rotation + Math.PI / 2;
      panel.add(square);
    }
  }

  scene.add(panel);
}

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

createPanel(Math.PI, 6, 2); // Back wall - opposite side of the circle
createPanel((Math.PI * 3) / 2, 4, 2); // Left wall - a quarter way around the circle
createPanel(Math.PI / 2, 4, 2); // Right wall - a quarter way around the circle

camera.position.set(0, 2, 8);

function createElevatorDoors() {
  const doorWidth = 2;
  const doorHeight = 2.5;
  const doorDepth = 0.1;

  const doorGeometry = new THREE.BoxGeometry(doorWidth, doorHeight, doorDepth);
  const doorMaterial = new THREE.MeshStandardMaterial({ color: "red" });

  const leftDoor = new THREE.Mesh(doorGeometry, doorMaterial);
  const rightDoor = new THREE.Mesh(doorGeometry, doorMaterial);

  const doorsAngle = Math.PI * 1.15;
  const doorsRadius = 7.9; // Reduce the radius to fit the curvature of the room

  leftDoor.position.set(
    doorsRadius * Math.sin(doorsAngle),
    doorHeight / 2,
    -doorsRadius * Math.cos(doorsAngle)
  );
  rightDoor.position.set(
    doorsRadius * Math.sin(doorsAngle - doorWidth / (2 * doorsRadius)),
    doorHeight / 2,
    -doorsRadius * Math.cos(doorsAngle - doorWidth / (2 * doorsRadius))
  );

  scene.add(leftDoor, rightDoor);
}

function changeSquareColors() {
  const colors = [
    0x8b4513, // brown
    0xd2b48c, // tan
    0xf5f5dc, // beige
    0xffa500, // orange
    0x000000, // black
  ];

  scene.traverse((object) => {
    if (
      object.type === "Mesh" &&
      object.geometry.type === "PlaneGeometry" &&
      object.geometry.parameters.width === 0.15
    ) {
      if (Math.random() < 0.01) {
        object.material.color.setHex(
          colors[Math.floor(Math.random() * colors.length)]
        );
      }
    }
  });
}

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableKeys = false;

document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowUp") {
    camera.position.z -= 0.5;
  } else if (event.code === "ArrowDown") {
    camera.position.z += 0.5;
  } else if (event.code === "ArrowLeft") {
    camera.position.x -= 0.5;
  } else if (event.code === "ArrowRight") {
    camera.position.x += 0.5;
  } else if (event.code === "KeyA") {
    camera.rotation.y += 0.1;
  } else if (event.code === "KeyD") {
    camera.rotation.y -= 0.1;
  }
});

function animate() {
  requestAnimationFrame(animate);
  changeSquareColors();
  createElevatorDoors();
  renderer.render(scene, camera);
}

animate();
