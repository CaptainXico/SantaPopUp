document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    const scene = document.querySelector("a-scene");
    const camera = document.querySelector("[camera]");

    if (scene && camera) {
      console.log("🎅 Iniciando popup do Pai Natal...");
      
      // Atualiza a posição da câmera
      camera.object3D.updateMatrixWorld(true);

      // Obtém a posição e rotação da câmera
      const cameraWorldPosition = new THREE.Vector3();
      camera.object3D.getWorldPosition(cameraWorldPosition);
      
      const cameraWorldRotation = new THREE.Euler();
      cameraWorldRotation.copy(camera.object3D.rotation);

      console.log("📷 Posição da Câmera:", cameraWorldPosition);

      // Calcula a posição NA FRENTE da câmera (corrigido)
      const distanceInFront = 3; // 3 metros à frente
      const santaHeight = 1.5; // Altura normal (ao nível dos olhos)

      // Cálculo CORRETO para posição à frente da câmera
      const forwardVector = new THREE.Vector3(0, 0, -1);
      forwardVector.applyEuler(cameraWorldRotation);
      
      const santaPosition = {
        x: cameraWorldPosition.x + forwardVector.x * distanceInFront,
        y: santaHeight, // ALTURA CORRETA (não -0.1!)
        z: cameraWorldPosition.z + forwardVector.z * distanceInFront
      };

      console.log("📍 Posição do Pai Natal:", santaPosition);

      // Cria a entidade do Pai Natal
        const santaEntity = document.createElement("a-entity");
          santaEntity.setAttribute("gltf-model", "#santa");
          santaEntity.setAttribute("position", 
          `${santaPosition.x} ${santaPosition.y} ${santaPosition.z}`);
          santaEntity.setAttribute("rotation", "-90 0 0");
          santaEntity.setAttribute("scale", "0.1 0.1 0.1");
          santaEntity.setAttribute("id", "santa-popup");

      // Roda o Pai Natal para ficar virado para a câmera (sem lookAt)
        const angleToCamera = Math.atan2(
          cameraWorldPosition.x - santaPosition.x,
          cameraWorldPosition.z - santaPosition.z
          ) * (180 / Math.PI);

      santaEntity.setAttribute("rotation", `-90 0 ${angleToCamera}`);
      console.log("🧭 Ângulo para câmera:", angleToCamera);

      // Adiciona ao cenário
      scene.appendChild(santaEntity);
      
      console.log("✅ Pai Natal adicionado ao cenário!");
      
      // Adiciona uma animação suave (opcional)
      setTimeout(() => {
        santaEntity.setAttribute("animation", {
          property: "position",
          to: `${santaPosition.x} ${santaPosition.y} ${santaPosition.z - 1}`,
          dur: 3000,
          easing: "easeOutQuad"
        });
      }, 1000);

    } else {
      console.error("❌ Cena A-Frame ou câmera não encontrada.");
    }
  }, 5000); // REDUZI para 5 segundos (testa primeiro)
});
