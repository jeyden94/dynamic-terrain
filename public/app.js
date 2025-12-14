    import { setupCamera } from './camera.js';
    import { trackPointer } from './pointer.js';
    import { createMap } from './map.js';

    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);
    
    // Camera
    var camera = setupCamera(scene, canvas);

    // Tracker Mouse Actions
    var pointer = trackPointer(scene);

    // Create Map 
    var map = createMap(scene);

    // Light
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 1), scene);
    light.intensity = 0.5;  // reduce intensity    

    // map creation
    // var mapSubX = 100;
    // var mapSubZ = 100;
    // var mapData = new Float32Array(mapSubX * mapSubZ * 3);   
    // for (var l = 0; l < mapSubZ; l++) {           
    //     for (var w = 0; w < mapSubX; w++) {                
    //         mapData[3 *(l * mapSubX + w)] = (w - mapSubX * 0.5) * 2.0;
    //         mapData[3 * (l * mapSubX + w) + 1] =Math.sin(l / 2) * Math.cos(w / 2) * 2.0;
    //         mapData[3 * (l * mapSubX + w) + 2] = (l - mapSubZ * 0.5) * 2.0;
    //     }            
    // }

    // // terrain creation

    // var pathArray = [];
    // for (var z = 0; z < mapSubZ; z++) {
    //     var path = [];
    //     for (var x = 0; x < mapSubX; x++) {
    //         var idx = (z * mapSubX + x) * 3;
    //         path.push(new BABYLON.Vector3(mapData[idx], mapData[idx+1], mapData[idx+2]));
    //     }
    //     pathArray.push(path);
    // }

    // // Convert mapData to pathArray for Ribbon
    // var pathArray = [];
    // for (var x = 0; x < mapSubX; x++) {  // swap the loop order
    //     var path = [];
    //     for (var z = 0; z < mapSubZ; z++) {
    //         var idx = (z * mapSubX + x) * 3;
    //         path.push(new BABYLON.Vector3(mapData[idx], mapData[idx+1], mapData[idx+2]));
    //     }
    //     pathArray.push(path);
    // }
    // // Create the terrain as a single mesh
    // var terrain = BABYLON.MeshBuilder.CreateRibbon('terrain', { pathArray: pathArray }, scene);

    // var terrainMaterial = new BABYLON.StandardMaterial('terrainMat', scene);
    // terrainMaterial.diffuseColor = new BABYLON.Color3(0, 1, 0);
    // terrain.material = terrainMaterial;

    // // Create a sphere
    // var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 2 }, scene);
    // sphere.position.y = 1;
    
    // // Material for the sphere
    // var sphereMaterial = new BABYLON.StandardMaterial('sphereMat', scene);
    // sphereMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.5, 1);
    // sphere.material = sphereMaterial;
    // console.log('Sphere material:', sphere.sphereMaterial);

    
    // Render loop
    engine.runRenderLoop(() => {
      scene.render();
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      engine.resize();
    });