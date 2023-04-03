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

// Create the room
const roomGeometry = new THREE.BoxGeometry(10, 10, 10);
const roomMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  side: THREE.BackSide,
});
const room = new THREE.Mesh(roomGeometry, roomMaterial);
scene.add(room);

// Create the door
const doorGeometry = new THREE.BoxGeometry(2, 4, 0.1);
const doorMaterial = new THREE.MeshBasicMaterial({ color: 0x8b4513 });
const door = new THREE.Mesh(doorGeometry, doorMaterial);
door.position.set(0, 0, -5);
scene.add(door);

// Create the window
const windowGeometry = new THREE.BoxGeometry(2, 2, 0.1);
const windowMaterial = new THREE.MeshBasicMaterial({ color: 0x87ceeb });
const windowObj = new THREE.Mesh(windowGeometry, windowMaterial);
windowObj.position.set(3, 3, -5);
scene.add(windowObj);

camera.position.z = 5;

// Arrow key controls
document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowUp") {
    camera.position.z -= 0.5;
  } else if (event.code === "ArrowDown") {
    camera.position.z += 0.5;
  } else if (event.code === "ArrowLeft") {
    camera.rotation.y += 0.1;
  } else if (event.code === "ArrowRight") {
    camera.rotation.y -= 0.1;
  }
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
