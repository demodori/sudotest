import * as THREE from 'https://threejs.org/build/three.module.js';
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer;
let controls;

init();

function init() {
    // レンダラーの設定
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // シーン、カメラの設定
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 5;

    // OrbitControlsの設定
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    // GLBモデルのロード
    let loader = new GLTFLoader();
    loader.load( 'model.glb', function ( gltf ) {
        scene.add( gltf.scene );
    }, undefined, function ( error ) {
        console.error( error );
    } );

    animate();
}

// アニメーションループを設定
function animate() {
    requestAnimationFrame( animate );

    // コンフィグに基づいてコントロールをアップデート
    controls.update();

    renderer.render( scene, camera );
}