document.addEventListener("DOMContentLoaded", () => {

  // Wait until Santa exists
  const waitForSanta = setInterval(() => {

    const santa = document.querySelector("#santa-popup");

    if (!santa) return;

    clearInterval(waitForSanta);

    console.log("🎅 Santa movement started!");

    startSantaMovement(santa);

  }, 500);

});


function startSantaMovement(santaContainer) {

  const speed = 1.2;          // meters per second
  const moveRadius = 6;       // how far Santa can roam
  const moveInterval = 4000;  // time before choosing new destination

  let targetPosition = null;

  // Get current position
  function getCurrentPosition() {
    const pos = santaContainer.getAttribute("position");
    return new THREE.Vector3(pos.x, pos.y, pos.z);
  }

  // Pick a random nearby target
  function chooseNewTarget() {

    const current = getCurrentPosition();

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * moveRadius;

    targetPosition = new THREE.Vector3(
      current.x + Math.cos(angle) * distance,
      0,
      current.z + Math.sin(angle) * distance
    );

    rotateTowardTarget(current, targetPosition);
  }

  // Rotate Santa to face direction of movement
  function rotateTowardTarget(from, to) {

    const dx = to.x - from.x;
    const dz = to.z - from.z;

    const angleY = Math.atan2(dx, dz) * (180 / Math.PI);

    santaContainer.setAttribute("rotation", `0 ${angleY} 0`);
  }

  // Movement loop
  let lastTime = performance.now();

  function moveSanta(time) {

    requestAnimationFrame(moveSanta);

    if (!targetPosition) return;

    const delta = (time - lastTime) / 1000;
    lastTime = time;

    const current = getCurrentPosition();

    const direction = targetPosition.clone().sub(current);
    const distanceToTarget = direction.length();

    if (distanceToTarget < 0.1) {
      chooseNewTarget();
      return;
    }

    direction.normalize();

    const moveStep = direction.multiplyScalar(speed * delta);

    const newPosition = current.add(moveStep);

    santaContainer.setAttribute("position",
      `${newPosition.x} ${newPosition.y} ${newPosition.z}`);
  }

  // Start movement
  chooseNewTarget();
  requestAnimationFrame(moveSanta);

  // Choose new random direction every few seconds
  setInterval(() => {
    chooseNewTarget();
  }, moveInterval);

}
