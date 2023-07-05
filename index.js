let canvas = null;
let gl = null;

//XR globals
let xrButton = document.getElementById("xr-button");
let xrSession = null;
let xrRefSpace = null;

function initWebXR() {
    if(navigator.xr){
        navigator.xr.isSessionSupported("immersive-vr").then((supported) =>{
            if(supported){
                xrButton.disabled = false;
                xrButton.textContent = "Enter VR";
                xrButton.addEventListener("click", onButtonClicked);
            }
        });
    }
}

function onResize(){
    canvas.width = canvas.clientWidth * window.devicePixelRatio;
    canvas.height = canvas.clientHeight * window.devicePixelRatio;
}
window.onResize = onResize;

function initWebGL2(){
    canvas = document.createElement("canvas");
    gl = canvas.getContext("webgl2");
    if(!gl){
        alert("This browser does not support WebGL2.");
        return;
    }
    canvas.style="position:absolute; width: 100%; height: 100%; z-index:-1;"
    document.body.appendChild(canvas);
    onResize();

    gl.clearColor(1.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

initWebGL2();