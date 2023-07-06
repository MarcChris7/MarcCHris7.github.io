var header = document.getElementById("header");
async function activateXR() {
    
    //let xrButton = document.getElementById("Header");
    header.textContent  = "Hat nicht geklappt";
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    const gl = canvas.getContext("webgl", {xrCompatible: true});
    // Add a canvas element and initialize a WebGL context that is compatible with WebXR.
  
    // To be continued in upcoming steps.
  }