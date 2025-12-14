    import { setupCamera } from './camera.js';
    
    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);
    
    // Camera
    var camera = setupCamera(scene, canvas);

    // Light
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 1), scene);    
    
    // map creation
    var mapSubX = 100;
    var mapSubZ = 100;
    var mapData = new Float32Array(mapSubX * mapSubZ * 3);   
    for (var l = 0; l < mapSubZ; l++) {           
        for (var w = 0; w < mapSubX; w++) {                
            mapData[3 *(l * mapSubX + w)] = (w - mapSubX * 0.5) * 2.0;
            mapData[3 * (l * mapSubX + w) + 1] =Math.sin(l / 2) * Math.cos(w / 2) * 2.0;
            mapData[3 * (l * mapSubX + w) + 2] = (l - mapSubZ * 0.5) * 2.0;
        }            
    }

    // terrain creation
    var terrainSub = 50;
    var params = {
        mapData: mapData,
        mapSubX: mapSubX,
        mapSubZ: mapSubZ,
        terrainSub: terrainSub
    };
    var terrain = new BABYLON.DynamicTerrain("terrain", params, scene);

    var terrainMaterial = new BABYLON.StandardMaterial('terrainMat', scene);
    terrainMaterial.diffuse = new BABYLON.Color3(0, 1, 0);  // green
    terrain.mesh.material = terrainMaterial;

    // Create a sphere
    var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 2 }, scene);
    sphere.position.y = 1;
    
    // Material for the sphere
    var material = new BABYLON.StandardMaterial('sphereMat', scene);
    material.diffuse = new BABYLON.Color3(0.2, 0.5, 1);
    sphere.material = material;
    
    // Render loop
    engine.runRenderLoop(() => {
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      scene.render();
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      engine.resize();
    });