document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {

    const scene = document.querySelector("a-scene");
    const camera = document.querySelector("[camera]");

    if (!scene || !camera) {
      console.error("❌ Cena ou câmera não encontrada.");
      return;
    }

    console.log("🎅 Criando Pai Natal...");

    // Update camera world matrix
    camera.object3D.updateMatrixWorld(true);

    // Camera world position
    const cameraPos = new THREE.Vector3();
    camera.object3D.getWorldPosition(cameraPos);

    // Camera forward direction
    const forward = new THREE.Vector3();
    camera.object3D.getWorldDirection(forward);

    // FIX 1: invert direction so it's actually in FRONT
    forward.multiplyScalar(-1);

    // FIX 2: remove vertical tilt influence
    forward.y = 0;
    forward.normalize();

    const distance = 3;
    const santaHeight = 0; // ground level (adjust if needed)

    const santaPos = new THREE.Vector3(
      cameraPos.x + forward.x * distance,
      santaHeight,
      cameraPos.z + forward.z * distance
    );

    console.log("📍 Santa position:", santaPos);

    // Create Santa
    const santa = document.createElement("a-entity");

    santa.setAttribute("gltf-model", "#santa");
    santa.setAttribute("position", `${santaPos.x} ${santaPos.y} ${santaPos.z}`);
    santa.setAttribute("scale", "0.01 0.01 0.01");
    santa.setAttribute("id", "santa-popup");

    scene.appendChild(santa);

    // Wait for model load before rotating
    santa.addEventListener("model-loaded", () => {

      // Make Santa face camera (horizontal only)
      const dx = cameraPos.x - santaPos.x;
      const dz = cameraPos.z - santaPos.z;

      const angle = Math.atan2(dx, dz);

      santa.object3D.rotation.set(0, angle, 0);

      // FIX 3: Correct model orientation (standing upright)
      santa.object3D.rotateX(-Math.PI / 2);

      console.log("✅ Santa spawned correctly!");

    });

  }, 5000);

});
