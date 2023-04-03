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

// Add ground
const groundGeometry = new THREE.PlaneGeometry(50, 100);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x228b22 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Add a simple building
function addBuilding(x, y, z, width, height, depth, color) {
  const buildingGeometry = new THREE.BoxGeometry(width, height, depth);
  const buildingMaterial = new THREE.MeshBasicMaterial({ color: color });
  const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
  building.position.set(x, y, z);
  scene.add(building);
}

addBuilding(-5, 2.5, -10, 4, 5, 8, 0x7c4dff);
addBuilding(5, 2.5, -10, 4, 5, 8, 0xe040fb);

camera.position.set(0, 3, 10);
camera.lookAt(new THREE.Vector3(0, 0, -10));

// Arrow key controls
document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowUp") {
    camera.position.z -= 0.5;
  } else if (event.code === "ArrowDown") {
    camera.position.z += 0.5;
  } else if (event.code === "ArrowLeft") {
    camera.position.x -= 0.5;
  } else if (event.code === "ArrowRight") {
    camera.position.x += 0.5;
  }
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
