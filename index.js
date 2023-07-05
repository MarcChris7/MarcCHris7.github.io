import WebXRPolyfill from "https://cdn.jsdelivr.net/npm/webxr-polyfill@latest/build/webxr-polyfill.module.js";
import * as THREE from 'three';
const polyfill = new WebXRPolyfill();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



let canvas = null;
let gl = null;

//XR globals
let xrButton = document.getElementById("xr-button");
let xrSession = null;
let xrRefSpace = null;

function initWebXR() {
    if(navigator.xr){
        navigator.xr.isSessionSupported("immersive-ar").then((supported) =>{
            if(supported){
                xrButton.disabled = false;
                xrButton.textContent = "Enter AR";
                xrButton.addEventListener("click", onButtonClicked);
            }
        });
    }
}

function onButtonClicked(){
    if(!xrSession){
        navigator.xr.requestSession("immersive-ar").then(onSessionStarted);
    }
    else{
        xrSession.end();
    }
}

function onSessionStarted(_session){
    xrSession = _session;
    xrSession.addEventListener("end", onSessionStarted);

    initWebGL2({xrCompatible: true});

    xrSession.updateRenderState({baseLayer: new XRWebGLLayer(xrSession, gl)});
    xrSession.requestReferenceSpace("local").then((refSpace) => {
        xrRefSpace = refSpace;
        xrSession.requestAnimationFrame(onSessionFrame);
    });

    function onSessionFrame(t, frame){
        const session = frame.session;
        session.requestAnimationFrame(onSessionFrame);
        let pose = frame.getViewerPose(xrRefSpace);

        if(pose){
            let glLayer = session.renderState.baseLayer;

            gl.bindFramebuffer(gl.FRAMEBUFFER, glLayer.framebuffer);
            gl.clearColor(0.4, 0.7, 0.9, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            for(let view of pose.views){
                let viewport = glLayer.getViewport(view);
                gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
            }
        }
    }

    function onSessionEnded(){
        xrSession = null;
    }
}

function onResize(){
    canvas.width = canvas.clientWidth * window.devicePixelRatio;
    canvas.height = canvas.clientHeight * window.devicePixelRatio;
}
window.onResize = onResize;

function initWebGL2(){
    canvas = document.createElement("canvas");
    gl = canvas.getContext("webgl2", attributes || {alpha: false});
    if(!gl){
        alert("This browser does not support WebGL2.");
        return;
    }
    canvas.style="position:absolute; width: 100%; height: 100%; left:0; top:0; right:0; bottom:0; margin: 0; z-index:-1;"
    document.body.appendChild(canvas);
    onResize();

    gl.clearColor(1.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

initWebXR();