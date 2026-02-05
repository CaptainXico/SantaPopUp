// This script will create 50 tree entities with random positions around the camera location
document.addEventListener("DOMContentLoaded", function () {
  const scene = document.querySelector("a-scene");

  // Define the camera's initial position as the center
  const cameraPosition = { x: 0, y: 0, z: 0 };
  const minRadius = 5; // Minimum distance from the camera where trees cannot spawn
  const maxRadius = 25; // Maximum radius for tree generation

  for (let i = 0; i < 30; i++) {
    const tree = document.createElement("a-entity");

    // Generate random angle and distance within the allowed range
    const angle = Math.random() * Math.PI * 2; // Random angle in radians
    const distance = Math.random() * (maxRadius - minRadius) + minRadius; // Distance between minRadius and maxRadius
    const x = cameraPosition.x + distance * Math.cos(angle);
    const z = cameraPosition.z + distance * Math.sin(angle);

    // Set tree model attributes
    tree.setAttribute("gltf-model", "#treemodel");
    tree.setAttribute("position", `${x} 0 ${z}`);
    tree.setAttribute("scale", "1 1 1");

    scene.appendChild(tree);
  }
});
