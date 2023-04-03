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

const corridorLength = 100;
const corridorWidth = 10;

function createWall(zPosition, color) {
  const wallGeometry = new THREE.BoxGeometry(corridorWidth, corridorWidth, 1);
  const wallMaterial = new THREE.MeshBasicMaterial({ color: color });
  const wall = new THREE.Mesh(wallGeometry, wallMaterial);
  wall.position.z = zPosition;
  return wall;
}

for (let i = 0; i < corridorLength; i++) {
  const leftWallColor = Math.random() * 0xffffff;
  const rightWallColor = Math.random() * 0xffffff;

  const leftWall = createWall(-i * 2, leftWallColor);
  leftWall.position.x = -corridorWidth / 2;
  scene.add(leftWall);

  const rightWall = createWall(-i * 2, rightWallColor);
  rightWall.position.x = corridorWidth / 2;
  scene.add(rightWall);
}

camera.position.set(0, 2, 5);

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
