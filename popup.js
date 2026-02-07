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
santaEntity.setAttribute("scale", "0.01 0.01 0.01");
santaEntity.setAttribute("id", "santa-popup");

// SOLUÇÃO 1: LookAt com ajuste para modelo "deitado"
// Primeiro faz lookAt, DEPOIS aplica a rotação para pôr de pé
const lookAtPosition = new THREE.Vector3(
  cameraWorldPosition.x,
  santaHeight,
  cameraWorldPosition.z
);

// Aplica lookAt primeiro
santaEntity.object3D.lookAt(lookAtPosition);

// AGORA aplica a rotação para corrigir orientação
// Como o lookAt já rodou o modelo, precisamos de um valor diferente
santaEntity.object3D.rotateX(-Math.PI / -2); // -90 graus em radianos

console.log("🎅 Pai Natal: LookAt aplicado + rotação corrigida");

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
