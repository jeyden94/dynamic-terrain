export function setupCamera(scene, canvas) {

	var camera = new BABYLON.ArcRotateCamera("Camera", 0, 10, 10, new BABYLON.Vector3(0, 0, 0), scene);

  // This positions the camera
  camera.setPosition(new BABYLON.Vector3(0, 0, -10));

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);
  
  camera.lowerRadiusLimit = 6;
  camera.upperRadiusLimit = 60;

  // Gui to move camera with mouse 
  const gui = new BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('ui');   

    var FreeCameraMouseInput = function () {
      this._disableEdgeScroll = () => {
          this._topEdgeScroll = false;
          this._rightEdgeScroll = false;
          this._bottomEdgeScroll = false;
          this._leftEdgeScroll = false;
      }

      // enable edge areas
      this._enabled = true;

      // state, where the mouse is
      this._topEdgeScroll = false;
      this._rightEdgeScroll = false;
      this._bottomEdgeScroll = false;
      this._leftEdgeScroll = false;

      // transparency of the edge areas
      this._alphaEdgeScroll = 1.0;

      // width/height in percentage of the edge areas
      this._widthEdgeScroll = 0.05;
      this._heightEdgeScroll = 0.05;

      // gui elements for edge areas
      this.topEdge = new BABYLON.GUI.Rectangle();
      this.topRightCorner = new BABYLON.GUI.Rectangle();
      this.rightEdge = new BABYLON.GUI.Rectangle();
      this.bottomRightCorner = new BABYLON.GUI.Rectangle();
      this.bottomEdge = new BABYLON.GUI.Rectangle();
      this.bottomLeftCorner = new BABYLON.GUI.Rectangle();
      this.leftEdge = new BABYLON.GUI.Rectangle();
      this.topLeftCorner = new BABYLON.GUI.Rectangle();
  };


}
