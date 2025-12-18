    import { setupCamera } from './camera.js';
    import { trackPointer } from './pointer.js';
    import { createMap } from './map.js';

    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);
    
    // Camera
    var camera = setupCamera(scene, canvas);

    // Tracker Mouse Actions
    // var pointer = trackPointer(scene);

    // Create Map 
    var map = createMap(scene);

    // Light
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 1), scene);
    light.intensity = 0.5;  // reduce intensity    
    
    // Render loop
    engine.runRenderLoop(() => {
      scene.render();
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      engine.resize();
    });