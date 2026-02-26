// Setup Scene
const canvas = document.querySelector('#webgl-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Create Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000; // Jumlah partikel (bintang)

const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    // Sebarkan partikel di ruang 3D acak
    posArray[i] = (Math.random() - 0.5) * 15; 
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Material Partikel (Biru & Putih)
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.015,
    color: 0x4aa8ff, // Biru Rhadzor
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

// Mesh
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 3;

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
});

// Animation Loop
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Rotasi Otomatis (Lambat)
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = elapsedTime * 0.02;

    // Interaksi Mouse (Parallax)
    // Partikel bergerak sedikit melawan arah mouse
    particlesMesh.rotation.y += mouseX * 0.5; 
    particlesMesh.rotation.x += mouseY * 0.5;

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}

tick();

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});