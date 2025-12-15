export function setupCamera(scene, canvas) {

	var camera = new BABYLON.ArcRotateCamera("Camera", 0, 10, 10, new BABYLON.Vector3(0, 0, 0), scene);

  // This positions the camera
  camera.setPosition(new BABYLON.Vector3(0, 0, -10));

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);
  
  camera.lowerRadiusLimit = 6;
  camera.upperRadiusLimit = 60;

  camera.speed = 0.4;
  camera.fov = 1.0;
  camera.metadata = {
      // mouse & keyboard properties
      // Set by camera inputs. Defines, which input moves the camera (mouse or keys)
      movedBy: null,
      // target position, the camera should be moved to
      targetPosition: camera.position.clone(),
      // radius, that is used to rotate camera
      // initial value dependent from camera position and camera target
      radius: new BABYLON.Vector3(camera.position.x, 0, camera.position.z).subtract(new BABYLON.Vector3(camera.target.x, 0, camera.target.z)).length(),
      // helper variable, to rotate camera
      rotation: BABYLON.Tools.ToRadians(180) + camera.rotation.y,
      // speed for rotation
      rotationSpeed: 0.02,
      // boundaries for x and z
      minX: -30,
      maxX: 30,
      minZ: -30,
      maxZ: 30,

      // mousewheel properties
      // similar to targetPosition, targetZoom contains the target value for the zoom
      targetZoom: camera.fov,
      // zoom boundaries
      maxZoom: 1.4,
      minZoom: 0.5,
      // speed for zoom
      zoom: 0.005,
      // zoom distance per mouse wheel interaction
      zoomSteps: 0.2,
  }
  camera.inputs.clear();
  camera.attachControl(canvas, true);

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

  FreeCameraMouseInput.prototype.attachControl = function (noPreventDefault) {
    var _this = this;
    var engine = this.camera.getEngine();
    var element = engine.getInputElement();
    element && element.addEventListener("contextmenu", this.onContextMenu.bind(this), false);

    // top edge area
    this.topEdge.width = 1 - 2*this._heightEdgeScroll;
    this.topEdge.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    this.topEdge.height = this._heightEdgeScroll;
    this.topEdge.background = "green";
    this.topEdge.isPointerBlocker = false;
    this.topEdge.alpha = this._alphaEdgeScroll;
    this.topEdge.isEnabled = this._enabled;
    this.topEdge.onPointerEnterObservable.add((eventData, eventState) => {
        _this._disableEdgeScroll();
        _this._topEdgeScroll = true;
        if (_this.camera.metadata.movedBy === null ) {
            _this.camera.metadata.movedBy = ECameraMovement.MOUSE;
        }
    });
    this.topEdge.onPointerOutObservable.add((eventData, eventState) => {
        _this._disableEdgeScroll();
    });
    gui.addControl(this.topEdge);

    // top right corner area
    this.topRightCorner.height = this._heightEdgeScroll;
    this.topRightCorner.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    this.topRightCorner.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    this.topRightCorner.width = this._widthEdgeScroll;
    this.topRightCorner.background = "green";
    this.topRightCorner.isPointerBlocker = false;
    this.topRightCorner.alpha = this._alphaEdgeScroll;
    this.topRightCorner.isEnabled = this._enabled;
    this.topRightCorner.onPointerEnterObservable.add((eventData, eventState) => {
        _this._disableEdgeScroll();
        _this._topEdgeScroll = true;
        _this._rightEdgeScroll = true;
        if (_this.camera.metadata.movedBy === null ) {
            _this.camera.metadata.movedBy = ECameraMovement.MOUSE;
        }
    });
    this.topRightCorner.onPointerOutObservable.add((eventData, eventState) => {
        _this._disableEdgeScroll();
    });
    gui.addControl(this.topRightCorner);
    
    // right edge area
    this.rightEdge.height = 1 - 2*this._widthEdgeScroll;
    this.rightEdge.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    this.rightEdge.width = this._widthEdgeScroll;
    this.rightEdge.background = "green";
    this.rightEdge.isPointerBlocker = false;
    this.rightEdge.alpha = this._alphaEdgeScroll;
    this.rightEdge.isEnabled = this._enabled;
    this.rightEdge.onPointerEnterObservable.add((eventData, eventState) => {
        _this._disableEdgeScroll();
        _this._rightEdgeScroll = true;
        if (_this.camera.metadata.movedBy === null ) {
            _this.camera.metadata.movedBy = ECameraMovement.MOUSE;
        }
    });
    this.rightEdge.onPointerOutObservable.add((eventData, eventState) => {
        _this._disableEdgeScroll();
    });
    gui.addControl(this.rightEdge);
    
    // bottom right corner area
    this.bottomRightCorner.height = this._heightEdgeScroll;
    this.bottomRightCorner.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    this.bottomRightCorner.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    this.bottomRightCorner.width = this._widthEdgeScroll;
    this.bottomRightCorner.background = "green";
    this.bottomRightCorner.isPointerBlocker = false;
    this.bottomRightCorner.alpha = this._alphaEdgeScroll;
    this.bottomRightCorner.isEnabled = this._enabled;
    this.bottomRightCorner.onPointerEnterObservable.add((eventData, eventState) => {
        _this._disableEdgeScroll();
        _this._bottomEdgeScroll = true;
        _this._rightEdgeScroll = true;
        if (_this.camera.metadata.movedBy === null ) {
            _this.camera.metadata.movedBy = ECameraMovement.MOUSE;
        }
    });
    this.bottomRightCorner.onPointerOutObservable.add((eventData, eventState) => {
        _this._disableEdgeScroll();
    });
    gui.addControl(this.bottomRightCorner);

    // bottom edge area
    this.bottomEdge.width = 1 - 2*this._heightEdgeScroll;
    this.bottomEdge.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    this.bottomEdge.height = this._heightEdgeScroll;
    this.bottomEdge.background = "green";
    this.bottomEdge.isPointerBlocker = false;
    this.bottomEdge.alpha = this._alphaEdgeScroll;
    this.bottomEdge.isEnabled = this._enabled;
    this.bottomEdge.onPointerEnterObservable.add((eventData, eventState) => {
        _this._disableEdgeScroll();
        _this._bottomEdgeScroll = true;
        if (_this.camera.metadata.movedBy === null ) {
            _this.camera.metadata.movedBy = ECameraMovement.MOUSE;
        }
    });
    this.bottomEdge.onPointerOutObservable.add((eventData, eventState) => {
        _this._disableEdgeScroll();
    });
    gui.addControl(this.bottomEdge);

    // bottom left corner area
    this.bottomLeftCorner.height = this._heightEdgeScroll;
    this.bottomLeftCorner.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    this.bottomLeftCorner.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    this.bottomLeftCorner.width = this._widthEdgeScroll;
    this.bottomLeftCorner.background = "green";
    this.bottomLeftCorner.isPointerBlocker = false;
    this.bottomLeftCorner.alpha = this._alphaEdgeScroll;
    this.bottomLeftCorner.isEnabled = this._enabled;
    this.bottomLeftCorner.onPointerEnterObservable.add((eventData, eventState) => {
        _this._disableEdgeScroll();
        _this._bottomEdgeScroll = true;
        _this._leftEdgeScroll = true;
        if (_this.camera.metadata.movedBy === null ) {
            _this.camera.metadata.movedBy = ECameraMovement.MOUSE;
        }
    });
    this.bottomLeftCorner.onPointerOutObservable.add((eventData, eventState) => {
        _this._disableEdgeScroll();
    });
    gui.addControl(this.bottomLeftCorner);

    // left edge area
    this.leftEdge.height = 1 - 2*this._widthEdgeScroll;
    this.leftEdge.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    this.leftEdge.width = this._widthEdgeScroll;
    this.leftEdge.background = "green";
    this.leftEdge.isPointerBlocker = false;
    this.leftEdge.alpha = this._alphaEdgeScroll;
    this.leftEdge.isEnabled = this._enabled;
    this.leftEdge.onPointerEnterObservable.add((eventData, eventState) => {
        _this._disableEdgeScroll();
        _this._leftEdgeScroll = true;
        if (_this.camera.metadata.movedBy === null ) {
            _this.camera.metadata.movedBy = ECameraMovement.MOUSE;
        }
    });
    this.leftEdge.onPointerOutObservable.add((eventData, eventState) => {
        _this._disableEdgeScroll();
    });
    gui.addControl(this.leftEdge);

    // top left corner area
    this.topLeftCorner.height = this._heightEdgeScroll;
    this.topLeftCorner.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    this.topLeftCorner.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    this.topLeftCorner.width = this._widthEdgeScroll;
    this.topLeftCorner.background = "green";
    this.topLeftCorner.isPointerBlocker = false;
    this.topLeftCorner.alpha = this._alphaEdgeScroll;
    this.topLeftCorner.isEnabled = this._enabled;
    this.topLeftCorner.onPointerEnterObservable.add((eventData, eventState) => {
        _this._disableEdgeScroll();
        _this._topEdgeScroll = true;
        _this._leftEdgeScroll = true;
        if (_this.camera.metadata.movedBy === null ) {
            _this.camera.metadata.movedBy = ECameraMovement.MOUSE;
        }
    });
    this.topLeftCorner.onPointerOutObservable.add((eventData, eventState) => {
        _this._disableEdgeScroll();
    });
    gui.addControl(this.topLeftCorner);
  };

  FreeCameraMouseInput.prototype.onContextMenu = function (evt) {
    evt.preventDefault();
  };

  FreeCameraMouseInput.prototype.checkInputs = function () {
    if (this._enabled) {
        const speed = this.camera.speed;
        const mdata = this.camera.metadata;

        // if mouse is in an area, move the camera in that direction
        if(this._topEdgeScroll)    mdata.targetPosition.addInPlace(BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, speed), BABYLON.Matrix.RotationY(camera.rotation.y)));
        if(this._bottomEdgeScroll) mdata.targetPosition.addInPlace(BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, -speed), BABYLON.Matrix.RotationY(camera.rotation.y)));
        if(this._leftEdgeScroll)   mdata.targetPosition.addInPlace(BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-speed, 0, 0), BABYLON.Matrix.RotationY(camera.rotation.y)));
        if(this._rightEdgeScroll)  mdata.targetPosition.addInPlace(BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(speed, 0, 0), BABYLON.Matrix.RotationY(camera.rotation.y)));

        // if limit x/z is reached, set position to max/min value
        if (mdata.targetPosition.x < mdata.minX) mdata.targetPosition.x = mdata.minX;
        if (mdata.targetPosition.x > mdata.maxX) mdata.targetPosition.x = mdata.maxX;
        if (mdata.targetPosition.z < mdata.minZ) mdata.targetPosition.z = mdata.minZ;
        if (mdata.targetPosition.z > mdata.maxZ) mdata.targetPosition.z = mdata.maxZ;

        // calculate distance between actual camera position and targeted camera position
        var lengthDiff = (mdata.targetPosition.subtract(camera.position)).length();
        // movedBy prevent moving camera by keys and mouse simultaneously
        if (lengthDiff > 0 && mdata.movedBy === ECameraMovement.MOUSE) {
            var t = lengthDiff < 0.01 ? 1.0 : 0.02;
            camera.position = BABYLON.Vector3.Lerp(camera.position, mdata.targetPosition, t);
            if (t === 1.0) {
                mdata.movedBy = null;
            }
        }
    }
  }

  FreeCameraMouseInput.prototype.detachControl = function (ignored) {
    if (this.onContextMenu) {
        var engine = this.camera.getEngine();
        var element = engine.getInputElement();
        element && element.removeEventListener("contextmenu", this.onContextMenu);
    }
    gui.remove(this.topEdge);
    gui.remove(this.topRightCorner);
    gui.remove(this.rightEdge);
    gui.remove(this.bottomRightCorner);
    gui.remove(this.bottomEdge);
    gui.remove(this.bottomLeftCorner);
    gui.remove(this.leftEdge);
    gui.remove(this.topLeftCorner);

  };

  FreeCameraMouseInput.prototype.getClassName = function () {
    return "FreeCameraMouseInput";
  };

  FreeCameraMouseInput.prototype.getSimpleName = function () {
    return "mouse";
  };

  camera.inputs.add(new FreeCameraMouseInput());

}
