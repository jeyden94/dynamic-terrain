export function setupCamera(scene, canvas) {
  const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -5));
  camera.attachControl(canvas, false);
  camera.inertia = 0.7;
  camera.angularSensibility = 1000;
  camera.speed = 0;
  camera.rotation.x = -Math.PI / 2;

//   const keys = {};
//   window.addEventListener('keydown', (e) => {
//     keys[e.key] = true;
//   });
//   window.addEventListener('keyup', (e) => {
//     keys[e.key] = false;
//   });

//   scene.registerBeforeRender(() => {
//     const moveSpeed = 0.5;
    
//     const forward = BABYLON.Vector3.Normalize(camera.getDirection(BABYLON.Axis.Z));
//     const right = BABYLON.Vector3.Normalize(BABYLON.Vector3.Cross(forward, BABYLON.Axis.Y));
    
//     if (keys['ArrowRight']) {
//       camera.position.addInPlace(right.scale(moveSpeed));
//     }
//     if (keys['ArrowLeft']) {
//       camera.position.addInPlace(right.scale(-moveSpeed));
//     }
//     if (keys['ArrowUp'] && !keys['Shift']) {
//       camera.position.addInPlace(forward.scale(moveSpeed));
//     }
//     if (keys['ArrowDown'] && !keys['Shift']) {
//       camera.position.addInPlace(forward.scale(-moveSpeed));
//     }
//     if (keys['Shift'] && keys['ArrowUp']) {
//       camera.position.y += moveSpeed;
//     }
//     if (keys['Shift'] && keys['ArrowDown']) {
//       camera.position.y -= moveSpeed;
//     }
//   });

  return camera;
}