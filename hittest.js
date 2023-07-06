let xrButton = document.getElementById("Header");

async function activateXR() {
    // Add a canvas element and initialize a WebGL context that is compatible with WebXR.
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    const gl = canvas.getContext("webgl", {xrCompatible: true});
    xrButton.textContent = "Hat nicht geklappt";
    // To be continued in upcoming steps.
  }