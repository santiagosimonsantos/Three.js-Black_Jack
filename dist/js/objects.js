import * as THREE from './three_packages/three.module.js';
import {FontLoader } from './three_packages/FontLoader.js';
import {TextGeometry } from './three_packages/TextGeometry.js';

export function create_card( card_number, card_figure ){
    const card = new THREE.Group();

    const geometry_card = new THREE.BoxGeometry(3, 4.5, 0.025);
    const material_card = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const card_front = new THREE.Mesh(geometry_card, material_card);
    const edges = new THREE.EdgesGeometry( geometry_card );
    const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
    card.add( line );

    if (card_figure == "heart") {
        const shape_heart = new THREE.Shape();
        const x = 0;
        const y = 0;
        shape_heart.moveTo(x, y-0.5);
        shape_heart.lineTo(x-0.75, y+0.5);
        shape_heart.bezierCurveTo(x-1, y+1, x-0.5, y+1.75, x, y+1);
        shape_heart.bezierCurveTo(x+0.5, y+1.75, x+1, y+1, x+0.75, y+0.5);
        shape_heart.lineTo(x, y-0.5);
        const geometry_heart = new THREE.ShapeBufferGeometry(shape_heart);
        const material_red = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
        const figure_heart = new THREE.Mesh(geometry_heart, material_red);
        const figure_heart2 = figure_heart.clone();
        const figure_heart3 = figure_heart.clone();
        figure_heart.position.z = 0.0251;
        figure_heart.position.y = -0.5;

        const loader = new FontLoader();
        loader.load( '../fonts/Tinos_Nerd_Font_Bold.json', function ( font ) {
            const textGeometry = new TextGeometry( card_number, {
                font: font,
                size: 0.5,
                height: 0.005,
            });
            const text_material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            const text_up = new THREE.Mesh( textGeometry, text_material );
            const text_down = text_up.clone();
            text_up.position.z = 0.021;
            text_up.position.y = 1.7;
            text_up.position.x = -1.4;
            text_down.position.z = 0.021;
            text_down.position.y = -1.7;
            text_down.position.x = 1.4;
            text_down.rotation.z = Math.PI;
            card.add(text_up, text_down);
        });

        figure_heart2.scale.set(0.25, 0.25, 0.25);
        figure_heart2.position.z = 0.0251;
        figure_heart2.position.y = 1.3;
        figure_heart2.position.x = -1.15;
        figure_heart3.scale.set(0.25, 0.25, 0.25);
        figure_heart3.position.z = 0.0251;
        figure_heart3.position.y = -1.3;
        figure_heart3.position.x = 1.15;
        figure_heart3.rotation.z = Math.PI;
        card.add(figure_heart, figure_heart2, figure_heart3);
    }
    const shape_back1 = new THREE.Shape();
    const x_back1 = 0;
    const y_back1 = 0;
    shape_back1.moveTo(x_back1-1.25, y_back1+2);
    shape_back1.lineTo(x_back1+1.25, y_back1+2);
    shape_back1.lineTo(x_back1+1.25, y_back1-2);
    shape_back1.lineTo(x_back1-1.25, y_back1-2);
    const geometry_back1 = new THREE.ShapeGeometry(shape_back1);
    const material_back1 = new THREE.MeshBasicMaterial({ color: 0x6767bb });
    const figure_back1 = new THREE.Mesh(geometry_back1, material_back1);
    figure_back1.position.z = -0.03;
    figure_back1.rotation.y = Math.PI;

    const geometry_back2 = new THREE.CircleGeometry( 1, 12 );
    const geometry_edges2 = new THREE.WireframeGeometry(geometry_back2);
    const material_back2 = new THREE.LineBasicMaterial( { color: 0xffffff } );
    const figure_back2 = new THREE.LineSegments( geometry_edges2, material_back2 );
    figure_back2 .position.z = -0.031;
    figure_back2 .rotation.y = Math.PI;

    card.add(card_front);
    card.add(figure_back1);
    card.add(figure_back2);

    return card;
}

export function create_card_pile(number_of_cards){
    const card_pile = new THREE.Group();
    for(let i = 0; i < number_of_cards; i++){
        const card = create_card("A", "heart");
        card.rotation.x = Math.PI/2;
        card.position.y = i * 0.025;
        card_pile.add(card);
    }
    return card_pile;
}

//0x129922
export function create_table(){
    const table = new THREE.Group();
    const geometry_table = new THREE.BoxGeometry(30, 30, 3);
    const material_table = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const table_front = new THREE.Mesh(geometry_table, material_table);
    const table_leg = new THREE.BoxGeometry(3, 15, 3);
    const material_leg = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const table_leg_left = new THREE.Mesh(table_leg, material_leg);
    table_leg_left.rotateX(Math.PI/2);
    table_leg_left.position.x = -13.5;
    table_leg_left.position.y = -13.5;
    table_leg_left.position.z = 9;
    const table_leg_right = table_leg_left.clone();
    table_leg_right.position.x = 13.5;
    const table_leg_back = table_leg_left.clone();
    table_leg_back.position.y = 13.5;
    const table_leg_front = table_leg_right.clone();
    table_leg_front.position.y = 13.5;
    table_front.add(table_leg_left, table_leg_right, table_leg_back, table_leg_front);
    table.add(table_front);
    const shape_back1 = new THREE.Shape();
    const x_back1 = 0;
    const y_back1 = 0;
    shape_back1.moveTo(x_back1-14, y_back1+14);
    shape_back1.lineTo(x_back1+14, y_back1+14);
    shape_back1.lineTo(x_back1+14, y_back1-14);
    shape_back1.lineTo(x_back1-14, y_back1-14);
    const geometry_back1 = new THREE.ShapeGeometry(shape_back1);
    const material_back1 = new THREE.MeshBasicMaterial({ color: 0x129922 });
    const figure_back1 = new THREE.Mesh(geometry_back1, material_back1);
    figure_back1.position.z = -1.51;
    figure_back1.rotateX(Math.PI);
    table.add(figure_back1);


    table.rotateX(Math.PI/2);
    return table;
}
