scene.onPointerObservable.add((pointerInfo) => {
  switch (pointerInfo.type) {
    case BABYLON.PointerEventTypes.POINTERDOWN:
      console.log("POINTER DOWN");
      break;
    case BABYLON.PointerEventTypes.POINTERUP:
      console.log("POINTER UP");
      break;
    case BABYLON.PointerEventTypes.POINTERMOVE:
      console.log("POINTER MOVE");
      break;
    case BABYLON.PointerEventTypes.POINTERWHEEL:
      console.log("POINTER WHEEL");
      break;
    case BABYLON.PointerEventTypes.POINTERPICK:
      console.log("POINTER PICK");
      break;
    case BABYLON.PointerEventTypes.POINTERTAP:
      console.log("POINTER TAP");
      break;
    case BABYLON.PointerEventTypes.POINTERDOUBLETAP:
      console.log("POINTER DOUBLE-TAP");
      break;
  }
});