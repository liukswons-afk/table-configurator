let scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

let camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(200, 150, 200);

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth - 300, window.innerHeight - 80);
document.getElementById("scene").appendChild(renderer.domElement);

// світло
scene.add(new THREE.AmbientLight(0xffffff, 0.8));
let dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
dirLight.position.set(100, 200, 100);
scene.add(dirLight);

// група столу
let tableGroup = new THREE.Group();
scene.add(tableGroup);

// створення столу
function createTable(length, width, metalColor) {
  tableGroup.clear();

  // стільниця
  let topGeometry = new THREE.BoxGeometry(length, 6, width);
  let topMaterial = new THREE.MeshStandardMaterial({ color: 0x8b5a2b });
  let tabletop = new THREE.Mesh(topGeometry, topMaterial);
  tabletop.position.y = 75;
  tableGroup.add(tabletop);

  // ноги
  let legMaterial = new THREE.MeshStandardMaterial({ color: metalColor });
  let legGeo = new THREE.BoxGeometry(6, 70, 6);

  let positions = [
    [-length/2 + 5, 35, -width/2 + 5],
    [ length/2 - 5, 35, -width/2 + 5],
    [-length/2 + 5, 35,  width/2 - 5],
    [ length/2 - 5, 35,  width/2 - 5]
  ];

  positions.forEach(p => {
    let leg = new THREE.Mesh(legGeo, legMaterial);
    leg.position.set(p[0], p[1], p[2]);
    tableGroup.add(leg);
  });
}

createTable(160, 80, "#111111");

// керування
length.oninput = update;
width.oninput = update;
metalColor.onchange = update;

function update() {
  createTable(+length.value, +width.value, metalColor.value);
}

// анімація
function animate() {
  requestAnimationFrame(animate);
  tableGroup.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();
