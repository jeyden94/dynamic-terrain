    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);
    
    // Camera
    const camera = new BABYLON.UniversalCamera('camera1', new BABYLON.Vector3(0, 5, -10));
    camera.attachControl(canvas, true);
    
    // Light
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    
    // Create a sphere
    const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 2 }, scene);
    sphere.position.y = 1;
    
    // Material for the sphere
    const material = new BABYLON.StandardMaterial('sphereMat', scene);
    material.diffuse = new BABYLON.Color3(0.2, 0.5, 1);
    sphere.material = material;
    
    // Render loop
    engine.runRenderLoop(() => {
      // sphere.rotation.x += 0.01;
      // sphere.rotation.y += 0.01;
      scene.render();
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      engine.resize();
    });