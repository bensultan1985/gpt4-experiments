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
const screenMaterial = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  side: THREE.DoubleSide,
});
const screen = new THREE.Mesh(screenGeometry, screenMaterial);
screen.position.set(0, 1.5, -4);
scene.add(screen);

camera.position.set(0, 2, 8);

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
  renderer.render(scene, camera);
}

animate();
