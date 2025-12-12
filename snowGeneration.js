// This script will create 30 snow entities with random positions around the camera location
document.addEventListener("DOMContentLoaded", function() {
  const scene = document.querySelector("a-scene");

  // Define the camera's initial position as the center
  const cameraPosition = { x: 0, y: 0, z: 0 };
  const radius = 50; // Radius around the camera to spread the entities

  for (let i = 0; i < 30; i++) {
    const snow = document.createElement("a-entity");

    // Randomize positions within the defined radius around the camera's X and Z coordinates
    const angle = Math.random() * Math.PI * 2; // Random angle in radians
    const distance = Math.random() * radius;
    const x = cameraPosition.x + distance * Math.cos(angle);
    const z = cameraPosition.z + distance * Math.sin(angle);

    // Set snow model attributes
    snow.setAttribute("gltf-model", "#snowmodel");
    snow.setAttribute("position", `${x} 0 ${z}`);
    snow.setAttribute("scale", "3 3 3");

    scene.appendChild(snow);
  }
});
