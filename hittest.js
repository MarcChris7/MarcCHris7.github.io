import { VRButton } from 'three/addons/webxr/VRButton.js';
document.body.appendChild( VRButton.createButton( renderer ) );
renderer.xr.enabled = true;
renderer.setAnimationLoop( function () {

	renderer.render( scene, camera );

} );