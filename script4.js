import * as THREE from 'three';
import * as THREE_ADD from 'three/addons/';

var main = function () {

    var scene = new THREE.Scene();

    var width = 800;
    var height = 600;
    var fov = 60;
    var aspect = width / height;
    var near = 1;
    var far = 10000;

    //カメラ
    var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 60, 100);
    camera.rotation.set(-0.4, 0, 0);
    var controls = new THREE_ADD.OrbitControls(camera);

    //レンダラの初期化
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);


    //ライトの作成
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 0.2, 0.2);
    scene.add(directionalLight);

    //XYZ軸の表示
    var axis = new THREE.AxisHelper(200);
    scene.add(axis);

    //表示する物体の作成
    var geometry = new THREE.CubeGeometry(30, 30, 30, 5, 5, 5);
    var material = new THREE.MeshBasicMaterial({color: 0x008866, wireframe: true});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 15, 0);
    scene.add(mesh);

    //グリッド
    var grid = new THREE.GridHelper(100, 10);
    grid.position = new THREE.Vector3(0, 0, 0);
    grid.rotation = new THREE.Euler(0, 0, 0);
    scene.add(grid);

    (function renderLoop() {
        requestAnimationFrame(renderLoop);
        controls.update();
        renderer.render(scene, camera);
    })();
};
window.addEventListener('DOMContentLoaded', main, false);