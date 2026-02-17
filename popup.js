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

    // Get camera world position
    const cameraPos = new THREE.Vector3();
    camera.object3D.getWorldPosition(cameraPos);

    // Get forward direction
    const forward = new THREE.Vector3();
    camera.object3D.getWorldDirection(forward);

    // Invert so it's in FRONT of camera (A-Frame fix)
    forward.multiplyScalar(-1);

    // Remove vertical tilt influence
    forward.y = 0;
    forward.normalize();

    // Distance in front of player
    const distance = 3;

    const santaPos = {

      x: cameraPos.x + forward.x * distance,
      y: 0,   // ground level (adjust if needed)
      z: cameraPos.z + forward.z * distance

    };

    console.log("📍 Santa position:", santaPos);

    // Create Santa entity
    const santa = document.createElement("a-entity");

    santa.setAttribute("gltf-model", "#santa");

    santa.setAttribute("position",
      `${santaPos.x} ${santaPos.y} ${santaPos.z}`);

    santa.setAttribute("scale", "0.01 0.01 0.01");

    santa.setAttribute("id", "santa-popup");

    // 🔥 PROFESSIONAL FIX:
    // Fix model orientation ONCE here
    santa.setAttribute("rotation", "0 0 0");

    scene.appendChild(santa);

    // After model loads, rotate only on Y axis to face camera
    santa.addEventListener("model-loaded", () => {

      const dx = cameraPos.x - santaPos.x;
      const dz = cameraPos.z - santaPos.z;

      const angleY = Math.atan2(dx, dz) * (180 / Math.PI);

      santa.setAttribute("rotation", `-90 ${angleY} 0`);

      console.log("✅ Pai Natal aparece corretamente!");

    });

  }, 5000);

});
