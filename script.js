window.addEventListener("DOMContentLoaded", init);

function init() {
  // シーンの設定
  const scene1 = new THREE.Scene();

  // レンダラー1の設定
  const canvas1 = document.querySelector("#canvas1");
  const renderer1 = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas1,
  });
  const width = 800;
  const height = 600;
  renderer1.setSize(width, height);

  // カメラ1の設定
  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 10000;
  const camera1 = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera1.position.set(0, -200, 0);

  // カメラ1のコントロールができるようにする(オービットコントロールを作成)
  const controls1 = new THREE.OrbitControls(camera1, canvas1);
  controls1.enableDamping = true; // 慣性の有効化
  controls1.dampingFactor = 0.25;

  // 環境光源を作成
  const ambientLight1 = new THREE.AmbientLight(0xffffff, 0.5);
  scene1.add(ambientLight1);

  // 平行光源を作成
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
  directionalLight1.intensity = 1;
  directionalLight1.position.set(0, -30, 30);
  scene1.add(directionalLight1);

  // 座標軸の表示
  // new THREE.AxesHelper(軸の長さ);
  const axis1 = new THREE.AxesHelper(300);
  scene1.add(axis1);

  // canvas2の設定
  const canvas2 = document.getElementById("canvas2");
  const ctx2 = canvas2.getContext("2d");

  // 大腿骨ファイル入力要素の取得
  let femur;
  const femurfileInput = document.getElementById("femurfileInput");
  femurfileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const contents = e.target.result;
        // OBJLoaderで読み込み
        const objLoader = new THREE.OBJLoader();
        femur = objLoader.parse(contents);
        femur.position.set(0, 0, 0);
        scene1.add(femur);
      };
      reader.readAsText(file);
    }
  });

  // 脛骨ファイル入力要素の取得
  let tibia;
  const tibiafileInput = document.getElementById("tibiafileInput");
  tibiafileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const contents = e.target.result;
        // OBJLoaderで読み込み
        const objLoader = new THREE.OBJLoader();
        tibia = objLoader.parse(contents);
        tibia.position.set(0, 0, 0);
        scene1.add(tibia);
      };
      reader.readAsText(file);
    }
  });

  // 画像ファイルの入力処理
  const img = new Image();
  const imageInput = document.getElementById("imageInput");
  imageInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageURL = e.target.result;

        // Three.js の背景テクスチャに設定
        const textureLoader = new THREE.TextureLoader();
        const backgroundTexture = textureLoader.load(imageURL);
        scene1.background = backgroundTexture;

        // canvas2 に画像を描画
        img.onload = function () {
          ctx2.clearRect(0, 0, canvas2.width, canvas2.height); // 前の内容をクリア
          ctx2.drawImage(img, 0, 0, canvas2.width, canvas2.height);
        };
        img.src = imageURL;
      };
      reader.readAsDataURL(file);
    }
  });

  // *********************************************************************
  //                 大腿骨の設定座標を変えるプログラム
  // *********************************************************************
  // 下記で並進を変更
  const femurTranslation = document.getElementById("femurTranslation");
  femurTranslation.addEventListener("click", function () {
    let femurTranslationX = parseFloat(
      document.getElementById("femurTranslationX").value
    );
    let femurTranslationY = parseFloat(
      document.getElementById("femurTranslationY").value
    );
    let femurTranslationZ = parseFloat(
      document.getElementById("femurTranslationZ").value
    );
    // それぞれの座標値を変更
    femur.position.x = femurTranslationX;
    femur.position.y = femurTranslationY;
    femur.position.z = femurTranslationZ;
  });

  // 下記で回転を変更
  const femurRotate = document.getElementById("femurRotate");
  femurRotate.addEventListener("click", function () {
    let femurRotateX = parseFloat(
      document.getElementById("femurRotateX").value
    );
    let femurRotateY = parseFloat(
      document.getElementById("femurRotateY").value
    );
    let femurRotateZ = parseFloat(
      document.getElementById("femurRotateZ").value
    );
    // ラジアンに変換
    const RadiansFemurRotateX = (femurRotateX * Math.PI) / 180;
    const RadiansFemurRotateY = (femurRotateY * Math.PI) / 180;
    const RadiansFemurRotateZ = (femurRotateZ * Math.PI) / 180;
    // それぞれの座標値を変更
    femur.rotation.x = RadiansFemurRotateX;
    femur.rotation.y = RadiansFemurRotateY;
    femur.rotation.z = RadiansFemurRotateZ;
  });

  // *********************************************************************
  //                 脛骨の設定座標を変えるプログラム
  // *********************************************************************
  // 下記で並進を変更
  const tibiaTranslation = document.getElementById("tibiaTranslation");
  tibiaTranslation.addEventListener("click", function () {
    let tibiaTranslationX = parseFloat(
      document.getElementById("tibiaTranslationX").value
    );
    let tibiaTranslationY = parseFloat(
      document.getElementById("tibiaTranslationY").value
    );
    let tibiaTranslationZ = parseFloat(
      document.getElementById("tibiaTranslationZ").value
    );
    tibia.position.x = tibiaTranslationX;
    tibia.position.y = tibiaTranslationY;
    tibia.position.z = tibiaTranslationZ;
  });

  // 下記で回転を変更
  const tibiaRotate = document.getElementById("tibiaRotate");
  tibiaRotate.addEventListener("click", function () {
    let tibiaRotateX = parseFloat(
      document.getElementById("tibiaRotateX").value
    );
    let tibiaRotateY = parseFloat(
      document.getElementById("tibiaRotateY").value
    );
    let tibiaRotateZ = parseFloat(
      document.getElementById("tibiaRotateZ").value
    );
    // ラジアンに変換
    const RadiansTibiaRotateX = (tibiaRotateX * Math.PI) / 180;
    const RadiansTibiaRotateY = (tibiaRotateY * Math.PI) / 180;
    const RadiansTibiaRotateZ = (tibiaRotateZ * Math.PI) / 180;
    // それぞれの座標値を変更
    tibia.rotation.x = RadiansTibiaRotateX;
    tibia.rotation.y = RadiansTibiaRotateY;
    tibia.rotation.z = RadiansTibiaRotateZ;
  });

  // 「Right」ボタンを押したら3Dモデルを右に移動
  // const rightButton = document.getElementById("rightButton");
  // rightButton.addEventListener("click", function () {
  //   if (object1) {
  //     object1.position.x += 5; // 右方向（+X軸）に10単位移動
  //   }
  // });

  // 「Left」ボタンを押したら3Dモデルを右に移動
  // const leftButton = document.getElementById("leftButton");
  // leftButton.addEventListener("click", function () {
  //   if (object1) {
  //     object1.position.x -= 5;
  //   }
  // });

  // 回転ボタン要素を取得
  // const rotateButton = document.getElementById("rotateButton");
  // rotateButton.addEventListener("click", () => {
  //   if (object1) {
  //     // 回転を適用（y軸周りに回転させる例）
  //     const rotationAngle = Math.PI / 16; // 1回転で45°回転
  //     object1.rotation.z += rotationAngle;
  //   }
  // });

  // 輪郭を抽出して 2D に描画する関数
  const outLine = document.getElementById("outLine");
  outLine.addEventListener("click", extractAndDrawEdges);
  function extractAndDrawEdges() {
    if (!object1) return;
    // 2D キャンバスをクリア
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx2.drawImage(img, 0, 0, canvas2.width, canvas2.height);
    // モデルの回転が反映されたジオメトリを取得
    const geometry = object1.children[0].geometry;
    // オブジェクトの回転を反映させるための回転行列を生成
    const rotationMatrix = new THREE.Matrix4().makeRotationZ(
      object1.rotation.z
    );
    // ジオメトリのコピーを作成（オリジナルを変更しない）
    const rotatedGeometry = geometry.clone();
    // 回転行列をジオメトリに適用（ジオメトリのコピーに回転を適用）
    rotatedGeometry.applyMatrix4(rotationMatrix);
    // エッジの抽出
    const edges = new THREE.EdgesGeometry(rotatedGeometry);
    // エッジの頂点を 2D 座標に変換
    const positions = edges.attributes.position.array;
    for (let i = 0; i < positions.length; i += 6) {
      const start = new THREE.Vector3(
        positions[i],
        positions[i + 1],
        positions[i + 2]
      );
      const end = new THREE.Vector3(
        positions[i + 3],
        positions[i + 4],
        positions[i + 5]
      );
      // スクリーン座標に変換
      const startProjected = start.clone().project(camera1);
      const endProjected = end.clone().project(camera1);
      const startX = (startProjected.x * 0.5 + 0.5) * canvas2.width;
      const startY = (startProjected.y * -0.5 + 0.5) * canvas2.height;
      const endX = (endProjected.x * 0.5 + 0.5) * canvas2.width;
      const endY = (endProjected.y * -0.5 + 0.5) * canvas2.height;

      // 2D キャンバスに線を描画
      ctx2.beginPath();
      ctx2.moveTo(startX, startY);
      ctx2.lineTo(endX, endY);
      ctx2.strokeStyle = "rgba(255, 165, 0, 0.1)";
      ctx2.lineWidth = 1;
      ctx2.stroke();
    }
  }

  tick();

  function tick() {
    renderer1.render(scene1, camera1);
    requestAnimationFrame(tick);
  }
}
