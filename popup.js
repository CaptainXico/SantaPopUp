document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    const scene = document.querySelector("a-scene");
    const camera = document.querySelector("[camera]");

    if (scene && camera) {
      console.log("🎅 Iniciando popup do Pai Natal...");

      // Ensure camera world matrix is updated
      camera.object3D.updateMatrixWorld(true);

      // Get camera world position
      const cameraWorldPosition = new THREE.Vector3();
      camera.object3D.getWorldPosition(cameraWorldPosition);

      console.log("📷 Posição da Câmera:", cameraWorldPosition);

      // Get camera forward direction (THIS IS THE CORRECT METHOD)
      const forwardVector = new THREE.Vector3();
      camera.object3D.getWorldDirection(forwardVector);

      // Distance and height
      const distanceInFront = 3;
      const santaHeight = 1.5;

      // Calculate Santa position
      const santaPosition = {
        x: cameraWorldPosition.x + forwardVector.x * distanceInFront,
        y: santaHeight,
        z: cameraWorldPosition.z + forwardVector.z * distanceInFront
      };

      console.log("📍 Posição do Pai Natal:", santaPosition);

      // Create Santa
      const santaEntity = document.createElement("a-entity");

      santaEntity.setAttribute("gltf-model", "#santa");
      santaEntity.setAttribute("position", `${santaPosition.x} ${santaPosition.y} ${santaPosition.z}`);
      santaEntity.setAttribute("scale", "0.01 0.01 0.01");
      santaEntity.setAttribute("id", "santa-popup");

      // Add to scene FIRST
      scene.appendChild(santaEntity);

      // Wait one frame so transforms are correct
      requestAnimationFrame(() => {

        // Make Santa face camera (upright)
        const lookAtPosition = new THREE.Vector3(
          cameraWorldPosition.x,
          santaHeight,
          cameraWorldPosition.z
        );

        santaEntity.object3D.lookAt(lookAtPosition);

        // Fix model orientation (ONLY if model is sideways)
        santaEntity.object3D.rotateX(-Math.PI / 2);

        // Force upright (prevents tilt)
        santaEntity.object3D.rotation.z = 0;

        console.log("🎅 Pai Natal orientado corretamente!");
      });

      console.log("✅ Pai Natal adicionado ao cenário!");

    } else {
      console.error("❌ Cena A-Frame ou câmera não encontrada.");
    }

  }, 5000);
});
