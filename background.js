(function () {
  const canvas = document.getElementById("cosmic-canvas");
  if (!canvas || typeof THREE === "undefined") return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 2200;
  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i += 1) {
    posArray[i] = (Math.random() - 0.5) * 18;
  }

  particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.015,
    color: 0x4aa8ff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);
  camera.position.z = 3;

  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
  });

  const clock = new THREE.Clock();

  function tick() {
    const elapsed = clock.getElapsedTime();

    particlesMesh.rotation.y = elapsed * 0.045 + mouseX * 0.38;
    particlesMesh.rotation.x = elapsed * 0.02 + mouseY * 0.3;

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  }

  tick();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  document.querySelectorAll(".card-studio").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--sx", x.toFixed(2) + "%");
      card.style.setProperty("--sy", y.toFixed(2) + "%");
    });

    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--sx", "50%");
      card.style.setProperty("--sy", "50%");
    });
  });

  const cursorDot = document.querySelector(".cursor-dot");
  const cursorOutline = document.querySelector(".cursor-outline");

  if (!cursorDot || !cursorOutline) return;

  let dotX = window.innerWidth / 2;
  let dotY = window.innerHeight / 2;
  let outlineX = dotX;
  let outlineY = dotY;
  let targetX = dotX;
  let targetY = dotY;

  document.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  document.querySelectorAll("a, button, .pathway-card, .pill").forEach((el) => {
    el.addEventListener("mouseenter", () => document.body.classList.add("hovering"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("hovering"));
  });

  function animateCursor() {
    dotX += (targetX - dotX) * 0.35;
    dotY += (targetY - dotY) * 0.35;
    outlineX += (targetX - outlineX) * 0.14;
    outlineY += (targetY - outlineY) * 0.14;

    cursorDot.style.left = dotX + "px";
    cursorDot.style.top = dotY + "px";
    cursorOutline.style.left = outlineX + "px";
    cursorOutline.style.top = outlineY + "px";

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
})();
