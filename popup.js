document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    const scene = document.querySelector("a-scene");
    const camera = document.querySelector("[camera]");

    if (!scene || !camera) {
      console.error("❌ Cena A-Frame ou câmera não encontrada.");
      return;
    }

    console.log("🎅 Iniciando popup do Pai Natal...");

    // Ensure world matrices are updated
    camera.object3D.updateMatrixWorld(true);

    // Get camera world position
    const cameraWorldPosition = new THREE.Vector3();
    camera.object3D.getWorldPosition(cameraWorldPosition);

    // Get TRUE world direction
    const forward = new THREE.Vector3();
    camera.object3D.getWorldDirection(forward);

    // IMPORTANT: Remove vertical tilt influence
    forward.y = 0;
    forward.normalize();

    const distanceInFront = 3;
    const santaHeight = 1.5;

    const santaX = cameraWorldPosition.x + forward.x * distanceInFront;
    const santaZ = cameraWorldPosition.z + forward.z * distanceInFront;

    // Create Santa
    const santaEntity = document.createElement("a-entity");
    santaEntity.setAttribute("gltf-model", "#santa");
    santaEntity.setAttribute("position", `${santaX} ${santaHeight} ${santaZ}`);
    santaEntity.setAttribute("scale", "0.01 0.01 0.01");
    santaEntity.setAttribute("id", "santa-popup");

    scene.appendChild(santaEntity);

    // Wait until model is loaded before rotating
    santaEntity.addEventListener("model-loaded", () => {

      // Make Santa face camera horizontally only
      const angle = Math.atan2(
        cameraWorldPosition.x - santaX,
        cameraWorldPosition.z - santaZ
      );

      santaEntity.object3D.rotation.set(0, angle, 0);

      // If model is sideways, fix orientation here:
      santaEntity.object3D.rotateX(-Math.PI / 2);

      console.log("🎅 Pai Natal aparece corretamente!");
    });

    console.log("✅ Pai Natal adicionado!");

  }, 5000);
});
