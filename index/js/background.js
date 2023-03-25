// index.htmlの背景に必要なjs

$.scrollify({
  section:'.scrollify', //対象要素を指定
  easing: 'swing', // イージングを指定
  scrollSpeed: 1000, // スクロール時の速度
  updateHash: false, // スクロール時アドレスバーのURLを更新
});

function init() {
  let Height = window.innerHeight;
  let Width = window.innerWidth;
  document.getElementById('wrap').style.height = Height * 3 + 'px';
  document.getElementById('promotion').style.height = Height + 'px';
  document.getElementById('promotion').style.width = Width + 'px';
  document.getElementById('ly_01').style.height = Height + 'px';
  document.getElementById('ly_02').style.height = Height + 'px';
  document.getElementById('ly_03').style.height = Height + 'px';

  const front = 0;// カメラの視点と位置座標（y座標）
  const cube_width = 16;// cubeの横幅
  const cube_height = 10;// cubeの縦幅

  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 5;
    camera.position.y = front;
    camera.position.z = -15;
    camera.lookAt(new THREE.Vector3(5, front, 15));

  let webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(000000));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMap.enabled = true;

    // オブジェクトの表面（surface）に表示する内容を取得（映像）
  let surface = [];
    // surface[0] = document.getElementById('sf_0');
    // surface[1] = document.getElementById('sf_1');
    // surface[2] = document.getElementById('sf_2');
    // surface[3] = document.getElementById('sf_3');
    // surface[4] = document.getElementById('sf_0');
    // surface[5] = document.getElementById('sf_1');
    // surface[6] = document.getElementById('sf_2');
    // surface[7] = document.getElementById('sf_3');
    // surface[8] = document.getElementById('sf_0');
    // surface[9] = document.getElementById('sf_1');
    // surface[10] = document.getElementById('sf_2');
    // surface[11] = document.getElementById('sf_3');

  let surface_img = [];
    let sur = '../assets/img/original/';
    surface_img[0] = sur + 'top.jpg';// 岩谷徹
    surface_img[1] = sur + 'Jf5eIjkdu2zeNHO8vOi5RBSjij5cgx9JENMT5oqaD93cyptGoua5g8nTza7SO9hQbitCgkB9jUL7iNaD.jpg';// パックマンのキャラクター画像１
    surface_img[2] = sur + 'o1200063014836692561.webp';// パックマンのキャラクター画像２
    surface_img[3] = sur + '3ae93dc8.png';// 制作中の様子（もしくはパックマンの映画シーン）

    surface_img[4] = sur + 'R.jpg';// 草間彌生
    surface_img[5] = sur + '14y-01-30-n1-b.jpg';// 作品「かぼちゃ」
    surface_img[6] = sur + 'df23e01eb6c7ea7f91cfd9d214c8fb11.png';// 作品「わが永遠の魂」
    surface_img[7] = sur + 'yayoikusama_17.jpg';// 制作中の様子
    
    surface_img[8] = sur + '09-osakajo.jpg';// 山口一郎
    surface_img[9] = sur + 'a5a777435573d434bd192c3b612b2175.1000x1000x1.jpg';// アルバム「魚図鑑」
    surface_img[10] = sur + 'sakanaction_MV.webp';// アルバム「新宝島」
    surface_img[11] = sur + '2.jpg';// 制作中の様子

  let texture = [];
  let cube_number = 12;// 12個

  // 画像用
  for(num=0; num<cube_number; num++) {
    texture[num] = new THREE.TextureLoader().load(surface_img[num]);
    texture[num].minFilter = THREE.LinearFilter;
    texture[num].magFilter = THREE.LinearFilter;
    texture[num].generateMipmaps = false;
  }

  // ビデオ用
  // for(num=1; num<cube_number; num+2) {
  //   texture[num] = new THREE.VideoTexture(surface[num]);
  //   texture[num].minFilter = THREE.LinearFilter;
  //   texture[num].magFilter = THREE.LinearFilter;
  //   texture[num].generateMipmaps = false;
  // }

  let radius = 10;// 円の半径
  let center_x = 15;// 円の座標中心x
  let center_z = 15;// 円の座標中心z
  let angle = 0;// 初期角度は0度

  let cube = [];// この配列にオブジェクトのcubeを入れていきます

  // メッシュの設定
  function createMesh(geom, num) {
    let materialArray = [];
    materialArray.push(new THREE.MeshBasicMaterial({}));
    materialArray.push(new THREE.MeshBasicMaterial({}));
    materialArray.push(new THREE.MeshBasicMaterial({}));
    materialArray.push(new THREE.MeshBasicMaterial({}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture[num]}));// この面に画像or映像
    materialArray.push(new THREE.MeshBasicMaterial({map: texture[num]}));// この面に画像or映像
    let faceMaterial = new THREE.MultiMaterial(materialArray);
    let mesh = new THREE.Mesh(geom, faceMaterial);
    texture.minFilter = THREE.LinearFilter;
    return mesh;
  }

  cube[0] = createMesh(new THREE.BoxGeometry(cube_width, cube_height, 0), 0 );
  cube[0].position.y = -15;
  cube[0].position.x = Math.cos(Math.PI / 180 * (90 * 0) - (30 * 0)) * radius + center_x;
  cube[0].position.z = Math.sin(Math.PI / 180 * (90 * 0) - (30 * 0)) * radius + center_z;
  cube[0].rotation.y = Math.PI / 2;
  scene.add(cube[0]);

  cube[1] = createMesh(new THREE.BoxGeometry(cube_width, cube_height, 0), 1);
  cube[1].position.y = -15;
  cube[1].position.x = Math.cos(Math.PI / 180 * (angle + (90 * 1) - (30 * 0))) * radius + center_x;
  cube[1].position.z = Math.sin(Math.PI / 180 * (angle + (90 * 1) - (30 * 0))) * radius + center_z;
  cube[1].rotation.y = Math.PI / 1;
  scene.add(cube[1]);

  cube[2] = createMesh(new THREE.BoxGeometry(cube_width, cube_height, 0), 2);
  cube[2].position.y = -15;
  cube[2].position.x = Math.cos(Math.PI / 180 * (angle + (90 * 2) - (30 * 0))) * radius + center_x;
  cube[2].position.z = Math.sin(Math.PI / 180 * (angle + (90 * 2) - (30 * 0))) * radius + center_z;
  cube[2].rotation.y = Math.PI / 2;
  scene.add(cube[2]);

  cube[3] = createMesh(new THREE.BoxGeometry(cube_width, cube_height, 0), 3);
  cube[3].position.y = -15;
  cube[3].position.x = Math.cos(Math.PI / 180 * (angle + (90 * 3) - (30 * 0))) * radius + center_x;
  cube[3].position.z = Math.sin(Math.PI / 180 * (angle + (90 * 3) - (30 * 0))) * radius + center_z;
  cube[3].rotation.y = Math.PI / 1;
  scene.add(cube[3]);

  cube[4] = createMesh(new THREE.BoxGeometry(cube_width, cube_height, 0), 4);
  cube[4].position.y = -30;
  cube[4].position.x = Math.cos(Math.PI / 180 * (angle + (90 * 1) - (30 * 2))) * radius + center_x;
  cube[4].position.z = Math.sin(Math.PI / 180 * (angle + (90 * 1) - (30 * 2))) * radius + center_z;
  cube[4].rotation.y = Math.PI / 1.2;
  scene.add(cube[4]);

  cube[5] = createMesh(new THREE.BoxGeometry(cube_width, cube_height, 0), 5);
  cube[5].position.y = -30;
  cube[5].position.x = Math.cos(Math.PI / 180 * (angle + (90 * 2) - (30 * 2))) * radius + center_x;
  cube[5].position.z = Math.sin(Math.PI / 180 * (angle + (90 * 2) - (30 * 2))) * radius + center_z;
  cube[5].rotation.y = Math.PI / 3;
  scene.add(cube[5]);

  cube[6] = createMesh(new THREE.BoxGeometry(cube_width, cube_height, 0), 6);
  cube[6].position.y = -30;
  cube[6].position.x = Math.cos(Math.PI / 180 * (angle + (90 * 3) - (30 * 2))) * radius + center_x;
  cube[6].position.z = Math.sin(Math.PI / 180 * (angle + (90 * 3) - (30 * 2))) * radius + center_z;
  cube[6].rotation.y = Math.PI / 1.2;
  scene.add(cube[6]);

  cube[7] = createMesh(new THREE.BoxGeometry(cube_width, cube_height, 0), 7);
  cube[7].position.y = -30;
  cube[7].position.x = Math.cos(Math.PI / 180 * (angle + (90 * 4) - (30 * 2))) * radius + center_x;
  cube[7].position.z = Math.sin(Math.PI / 180 * (angle + (90 * 4) - (30 * 2))) * radius + center_z;
  cube[7].rotation.y = Math.PI / 3;
  scene.add(cube[7]);

  cube[8] = createMesh(new THREE.BoxGeometry(cube_width, cube_height, 0), 8);
  cube[8].position.y = -45;
  cube[8].position.x = Math.cos(Math.PI / 180 * (angle + (90 * 1) - (30 * 1))) * radius + center_x;
  cube[8].position.z = Math.sin(Math.PI / 180 * (angle + (90 * 1) - (30 * 1))) * radius + center_z;
  cube[8].rotation.y = Math.PI / 1.5;
  scene.add(cube[8]);

  cube[9] = createMesh(new THREE.BoxGeometry(cube_width, cube_height, 0), 9);
  cube[9].position.y = -45;
  cube[9].position.x = Math.cos(Math.PI / 180 * (angle + (90 * 2) - (30 * 1))) * radius + center_x;
  cube[9].position.z = Math.sin(Math.PI / 180 * (angle + (90 * 2) - (30 * 1))) * radius + center_z;
  cube[9].rotation.y = Math.PI / 6;
  scene.add(cube[9]);

  cube[10] = createMesh(new THREE.BoxGeometry(cube_width, cube_height, 0), 10);
  cube[10].position.y = -45;
  cube[10].position.x = Math.cos(Math.PI / 180 * (angle + (90 * 3) - (30 * 1))) * radius + center_x;
  cube[10].position.z = Math.sin(Math.PI / 180 * (angle + (90 * 3) - (30 * 1))) * radius + center_z;
  cube[10].rotation.y = Math.PI / 1.5;
  scene.add(cube[10]);

  cube[11] = createMesh(new THREE.BoxGeometry(cube_width, cube_height, 0), 11);
  cube[11].position.y = -45;
  cube[11].position.x = Math.cos(Math.PI / 180 * (angle + (90 * 3) - (30 * 1))) * radius + center_x;
  cube[11].position.z = Math.sin(Math.PI / 180 * (angle + (90 * 3) - (30 * 1))) * radius + center_z;
  cube[11].rotation.y = Math.PI / 6;
  scene.add(cube[11]);
  // メッシュの設定終わり

  // lightの用意
  let ambiLight = new THREE.AmbientLight(0x141414);
    scene.add(ambiLight);

  let light = new THREE.DirectionalLight();
    light.position.set(0, 30, 20);
    scene.add(light);
  // lightの用意終わり

  // 出力先の指定
  document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

  // レンダー間隔の指定（アニメーション）
  setTimeout(render(),1000);

  function render() {

    cube[0].rotation.y += (-Math.PI / 180) / 8;
    cube[0].position.x = Math.cos(Math.PI / 180 * angle ) * radius + center_x;
    cube[0].position.z = Math.sin(Math.PI / 180 * angle ) * radius + center_z;

    cube[1].rotation.y += (-Math.PI / 180) / 8;
    cube[1].position.x = Math.cos(Math.PI / 180 * (angle + (90 * 1) - (30 * 0))) * radius + center_x;
    cube[1].position.z = Math.sin(Math.PI / 180 * (angle + (90 * 1) - (30 * 0))) * radius + center_z;

    cube[2].rotation.y += (-Math.PI / 180) / 8;
    cube[2].position.x = Math.cos(Math.PI / 180 * (angle + (90 * 2) - (30 * 0))) * radius + center_x;
    cube[2].position.z = Math.sin(Math.PI / 180 * (angle + (90 * 2) - (30 * 0))) * radius + center_z;

    cube[3].rotation.y += (-Math.PI / 180) / 8;
    cube[3].position.x = Math.cos(Math.PI / 180 * (angle + (90 * 3) - (30 * 0))) * radius + center_x;
    cube[3].position.z = Math.sin(Math.PI / 180 * (angle + (90 * 3) - (30 * 0))) * radius + center_z;

    cube[4].rotation.y += (-Math.PI / 180) / 8;
    cube[4].position.x = Math.cos(Math.PI / 180 * (angle + (90 * 0) - (30 * 2))) * radius + center_x;
    cube[4].position.z = Math.sin(Math.PI / 180 * (angle + (90 * 0) - (30 * 2))) * radius + center_z;

    cube[5].rotation.y += (-Math.PI / 180) / 8;
    cube[5].position.x = Math.cos(Math.PI / 180 * (angle + (90 * 1) - (30 * 2))) * radius + center_x;
    cube[5].position.z = Math.sin(Math.PI / 180 * (angle + (90 * 1) - (30 * 2))) * radius + center_z;

    cube[6].rotation.y += (-Math.PI / 180) / 8;
    cube[6].position.x = Math.cos(Math.PI / 180 * (angle + (90 * 2) - (30 * 2))) * radius + center_x;
    cube[6].position.z = Math.sin(Math.PI / 180 * (angle + (90 * 2) - (30 * 2))) * radius + center_z;

    cube[7].rotation.y += (-Math.PI / 180) / 8;
    cube[7].position.x = Math.cos(Math.PI / 180 * (angle + (90 * 3) - (30 * 2))) * radius + center_x;
    cube[7].position.z = Math.sin(Math.PI / 180 * (angle + (90 * 3) - (30 * 2))) * radius + center_z;

    cube[8].rotation.y += (-Math.PI / 180) / 8;
    cube[8].position.x = Math.cos(Math.PI / 180 * (angle + (90 * 0) - (30 * 1))) * radius + center_x;
    cube[8].position.z = Math.sin(Math.PI / 180 * (angle + (90 * 0) - (30 * 1))) * radius + center_z;

    cube[9].rotation.y += (-Math.PI / 180) / 8;
    cube[9].position.x = Math.cos(Math.PI / 180 * (angle + (90 * 1) - (30 * 1))) * radius + center_x;
    cube[9].position.z = Math.sin(Math.PI / 180 * (angle + (90 * 1) - (30 * 1))) * radius + center_z;

    cube[10].rotation.y += (-Math.PI / 180) / 8;
    cube[10].position.x = Math.cos(Math.PI / 180 * (angle + (90 * 2) - (30 * 1))) * radius + center_x;
    cube[10].position.z = Math.sin(Math.PI / 180 * (angle + (90 * 2) - (30 * 1))) * radius + center_z;

    cube[11].rotation.y += (-Math.PI / 180) / 8;
    cube[11].position.x = Math.cos(Math.PI / 180 * (angle + (90 * 3) - (30 * 1))) * radius + center_x;
    cube[11].position.z = Math.sin(Math.PI / 180 * (angle + (90 * 3) - (30 * 1))) * radius + center_z;

    // cube[12].rotation.y += (-Math.PI / 180) / 8;
    // cube[12].position.x = Math.cos(Math.PI / 180 * (angle + (90 * 0) - (30 * 0))) * radius + center_x;
    // cube[12].position.z = Math.sin(Math.PI / 180 * (angle + (90 * 0) - (30 * 0))) * radius + center_z;

    // cube[13].rotation.y += (-Math.PI / 180) / 8;
    // cube[13].position.x = Math.cos(Math.PI / 180 * (angle + (90 * 1) - (30 * 0))) * radius + center_x;
    // cube[13].position.z = Math.sin(Math.PI / 180 * (angle + (90 * 1) - (30 * 0))) * radius + center_z;

    // cube[14].rotation.y += (-Math.PI / 180) / 8;
    // cube[14].position.x = Math.cos(Math.PI / 180 * (angle + (90 * 2) - (30 * 0))) * radius + center_x;
    // cube[14].position.z = Math.sin(Math.PI / 180 * (angle + (90 * 2) - (30 * 0))) * radius + center_z;

    // cube[15].rotation.y += (-Math.PI / 180) / 8;
    // cube[15].position.x = Math.cos(Math.PI / 180 * (angle + (90 * 3) - (30 * 0))) * radius + center_x;
    // cube[15].position.z = Math.sin(Math.PI / 180 * (angle + (90 * 3) - (30 * 0))) * radius + center_z;

    // 速度指定
    if(angle < 360) {
      angle+=0.125;
    } else {
      angle = 0;
    }

    // カメラの位置設定（float.jsに配慮する）
    camera.position.y = -(scrollY / 52);
    // console.log(camera.position.y);
    // console.log(window.scrollY);// 0, 792, 1584...に近づける

    // アニメーション＆シーン＆カメラを追加
    requestAnimationFrame(render);
    webGLRenderer.render(scene, camera);
  }
}

// window.onload = init;
window.addEventListener('load',init());