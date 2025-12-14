export function setupCamera(scene, canvas) {
  const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 20, -10));
  camera.attachControl(canvas, true);
  camera.inertia = 0.7;
  camera.angularSensibility = 1000;
  camera.speed = 0;

  const keys = {};
  window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
  });
  window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
  });

  scene.registerBeforeRender(() => {
    const moveSpeed = 0.5;
    
    if (keys['ArrowRight']) {
      camera.position.x += moveSpeed;
    }
    if (keys['ArrowLeft']) {
      camera.position.x -= moveSpeed;
    }
    if (keys['ArrowUp'] && !keys['Shift']) {
      camera.position.z -= moveSpeed;
    }
    if (keys['ArrowDown'] && !keys['Shift']) {
      camera.position.z += moveSpeed;
    }
    if (keys['Shift'] && keys['ArrowUp']) {
      camera.position.y += moveSpeed;
    }
    if (keys['Shift'] && keys['ArrowDown']) {
      camera.position.y -= moveSpeed;
    }
  });

  return camera;
}