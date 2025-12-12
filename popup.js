document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    const scene = document.querySelector("a-scene");
    const camera = document.querySelector("[camera]");

    if (scene && camera) {
      // Ensure we are working with up-to-date camera position and rotation
      camera.object3D.updateMatrixWorld(true); // Force updates to the camera's world matrix

      // Get the current world position of the camera
      const cameraWorldPosition = new THREE.Vector3();
      camera.object3D.getWorldPosition(cameraWorldPosition);

      // Get the current world rotation of the camera
      const cameraWorldRotation = new THREE.Euler();
      cameraWorldRotation.copy(camera.object3D.rotation);

      console.log("Camera World Position:", cameraWorldPosition);
      console.log("Camera World Rotation:", cameraWorldRotation);

      // Calculate the position in front of the camera
      const offsetDistance = 2; // Distance in front of the camera
      const zombieHeight = -0.1; // Adjust this value to set the zombie's height

      const popupPosition = {
        x: cameraWorldPosition.x - offsetDistance * Math.sin(cameraWorldRotation.y),
        y: zombieHeight, // Set the height specifically here
        z: cameraWorldPosition.z - offsetDistance * Math.cos(cameraWorldRotation.y),
      };

      console.log("Zombie Spawn Position:", popupPosition);

      // Create the zombie entity
      const zombieEntity = document.createElement("a-entity");
      zombieEntity.setAttribute("gltf-model", "#santa"); // Link to the zombie model
      zombieEntity.setAttribute("position", `${popupPosition.x} ${popupPosition.y} ${popupPosition.z}`);
      zombieEntity.setAttribute("scale", "7 7 7"); // Adjust scale as needed

      // Ensure the zombie always faces the camera
      zombieEntity.setAttribute(
        "rotation",
        `0 ${THREE.MathUtils.radToDeg(cameraWorldRotation.y)} 0`
      );

      // Append the zombie to the scene
      scene.appendChild(zombieEntity);
    } else {
      console.error("A-Frame scene or camera not found.");
    }
  }, 20000); // 20,000 milliseconds = 20 seconds
});
