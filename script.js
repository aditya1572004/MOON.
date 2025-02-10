// URLs for textures
const moonTextureURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/lroc_color_poles_1k.jpg";
const moonDisplacementURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/ldem_3_8bit.jpg";
const starryBackgroundURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/hipp8_s.jpg";

// Create the scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near clipping plane
  1000 // Far clipping plane
);
camera.position.z = 5;

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add controls for the camera
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Create the moon
const moonGeometry = new THREE.SphereGeometry(2, 60, 60);
const textureLoader = new THREE.TextureLoader();
const moonTexture = textureLoader.load(moonTextureURL);
const moonDisplacement = textureLoader.load(moonDisplacementURL);

const moonMaterial = new THREE.MeshPhongMaterial({
  map: moonTexture,
  displacementMap: moonDisplacement,
  displacementScale: 0.06,
  bumpMap: moonDisplacement,
  bumpScale: 0.04,
  shininess: 0,
});

const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon);

// Add lights
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-100, 10, 50);
scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.1);
scene.add(hemisphereLight);

// Create the background
const backgroundGeometry = new THREE.SphereGeometry(1000, 60, 60);
const backgroundTexture = textureLoader.load(starryBackgroundURL);

const backgroundMaterial = new THREE.MeshBasicMaterial({
  map: backgroundTexture,
  side: THREE.BackSide,
});

const background = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
scene.add(background);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  moon.rotation.y += 0.002;
  moon.rotation.x += 0.0001;
  background.rotation.y += 0.0001;
  background.rotation.x += 0.0005;
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
