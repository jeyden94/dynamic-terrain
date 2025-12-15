export function setupCamera(scene, canvas) {

    var camera = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI / 4, 20, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    
    camera.lowerRadiusLimit = 6;
    camera.upperRadiusLimit = 60;

    // Edge scroll settings
    var edgeScrollSpeed = 0.3;
    var edgeThreshold = 0.05;
    var lastMouseX = 0;
    var lastMouseY = 0;

    canvas.addEventListener("mousemove", function(evt) {
        lastMouseX = evt.clientX;
        lastMouseY = evt.clientY;
    });

    scene.onBeforeRenderObservable.add(function() {
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