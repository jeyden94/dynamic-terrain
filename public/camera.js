export function setupCamera(scene, canvas) {

	var camera = new BABYLON.ArcRotateCamera("Camera", 0, 10, 10, new BABYLON.Vector3(0, 0, 0), scene);

    // This positions the camera
    camera.setPosition(new BABYLON.Vector3(0, 0, -10));

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    
    camera.lowerRadiusLimit = 6;
    camera.upperRadiusLimit = 60;

  return camera;
}