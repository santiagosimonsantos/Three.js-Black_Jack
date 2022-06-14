import {create_card, create_card_pile, create_table} from './objects.js';

import * as THREE from './three_packages/three.module.js';
import {OrbitControls} from './three_packages/OrbitControls.js';

let number_of_cards = 52;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9a4141);
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg')
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 35;
camera.position.y = 25;

const gridHelper = new THREE.GridHelper(220, 40);
const Controls = new OrbitControls(camera, renderer.domElement);
//scene.add(gridHelper)

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

const card_pile = create_card_pile(number_of_cards);

card_pile.position.y = 1.51
card_pile.position.x = 11;
card_pile.position.z = -10.5;
{
    const card = card_pile.children[number_of_cards - 1]
    card.position.y = 0
    card.position.x = -11;
    card.position.z = 21;
    card.rotation.y = Math.PI;
    card.rotation.z = Math.PI;
}{
    const card = card_pile.children[number_of_cards - 2];
    card.position.y = 0.0251;
    card.position.x = -10;
    card.position.z = 21;
    card.rotation.y = Math.PI;
    card.rotation.z = Math.PI;
}{
    const card = card_pile.children[number_of_cards - 3];
    card.position.y = 0;
    card.position.x = -11;
    card.position.z = 4.5;
}{
    const card = card_pile.children[number_of_cards - 4];
    card.position.y = 0.0251;
    card.position.x = -12;
    card.position.z = 4.5;
    card.rotateY(Math.PI);
}

const table = create_table();

scene.add(card_pile, table);

animate(scene,camera);