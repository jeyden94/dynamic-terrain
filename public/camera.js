export function setupCamera(scene, canvas) {

	var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);

    // This positions the camera
    camera.setPosition(new BABYLON.Vector3(0, 0, -10));

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

  // let cameraDirection = BABYLON.Vector3.Zero();  // declare here

  // Handle zoom

  // window.addEventListener('wheel', (e) => {

  //   const zoomSpeed = Math.abs(e.deltaY) * 0.01;

  //   if (e.deltaY < 0) {
  //       camera.position.addInPlace(cameraDirection.scale(zoomSpeed));
  //   } else if (e.deltaY > 0) {
  //       camera.position.addInPlace(cameraDirection.scale(-zoomSpeed));
  //   }
  // });

  // let wheelPressed = false;

  // window.addEventListener('mousedown', (e) => {
  //   if (e.button === 1) wheelPressed = true;
  // });

  // window.addEventListener('mouseup', (e) => {
  //   if (e.button === 1) wheelPressed = false;
  // });

  // scene.registerBeforeRender(() => {
  //   cameraDirection = BABYLON.Vector3.Normalize(camera.getDirection(BABYLON.Axis.Z));
  // });


//   const keys = {};
//   window.addEventListener('keydown', (e) => {
//     keys[e.key] = true;
//     console.log(e);
//     console.log(`${keys[e.key]}`);
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