import { showMenu, hideMenu } from "./menu.js";

export function setupCamera(scene, canvas) {

    var camera = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI / 4, 20, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    
    camera.lowerRadiusLimit = 6;
    camera.upperRadiusLimit = 60;

    camera.lowerBetaLimit = 0.3;              // Almost top-down, but not quite
    camera.upperBetaLimit = 1.2;              // Almost horizontal, but not quite

    // Edge scroll settings
    var edgeScrollSpeed = 3;
    var edgeThreshold = 0.05;
    var lastMouseX = 0;
    var lastMouseY = 0;

    // Pause camera
    var pause = false;

    canvas.addEventListener("mousemove", function(evt) {
        lastMouseX = evt.clientX;
        lastMouseY = evt.clientY;
    });

    canvas.addEventListener("contextmenu", function(evt) {
        pause === false ? pause = true : pause = false;
        pause === false ? console.log("UNPAUSED") : console.log("PAUSED");
        pause === false ? hideMenu() : showMenu()
    })

    scene.onBeforeRenderObservable.add(function() {
        pause === true ? edgeScrollSpeed = 0 : edgeScrollSpeed = 3;

        var width = canvas.clientWidth;
        var height = canvas.clientHeight;
        
        var normalizedX = lastMouseX / width;
        var normalizedY = lastMouseY / height;
        
        // Calculate movement in camera's local space
        var forward = camera.target.subtract(camera.position).normalize();
        forward.y = 0;
        forward.normalize();
        
        var right = BABYLON.Vector3.Cross(BABYLON.Vector3.Up(), forward).normalize();
        
        // Move camera target based on edge position
        if (normalizedY < edgeThreshold) {
            camera.target.addInPlace(forward.scale(edgeScrollSpeed));
        }
        if (normalizedY > 1 - edgeThreshold) {
            camera.target.addInPlace(forward.scale(-edgeScrollSpeed));
        }
        if (normalizedX < edgeThreshold) {
            camera.target.addInPlace(right.scale(-edgeScrollSpeed));
        }
        if (normalizedX > 1 - edgeThreshold) {
            camera.target.addInPlace(right.scale(edgeScrollSpeed));
        }
    });

    return camera;
}