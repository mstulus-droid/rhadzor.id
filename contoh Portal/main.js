// 1. INIT SMOOTH SCROLL (Lenis)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. CUSTOM CURSOR LOGIC
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot mengikuti mouse instan
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline mengikuti dengan delay (efek floating)
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Deteksi Hover pada Link/Card untuk membesarkan kursor
const hoverables = document.querySelectorAll('a, .project-card, .nav-item');
hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// 3. GSAP ANIMATIONS
gsap.registerPlugin(ScrollTrigger);

// Preloader Sequence
const tl = gsap.timeline();

// Hitung mundur angka
let counter = { val: 0 };
const counterEl = document.querySelector('.counter');

tl.to(counter, {
    val: 100,
    duration: 2,
    ease: "power2.inOut",
    onUpdate: () => {
        counterEl.textContent = Math.floor(counter.val);
    }
})
.to('.preloader', {
    y: '-100%',
    duration: 1,
    ease: "expo.inOut",
    delay: 0.2
})
.from('.hero-text .reveal-text', {
    y: 100,
    opacity: 0,
    duration: 1.5,
    stagger: 0.2,
    ease: "power4.out"
}, "-=0.5"); // Mulai sedikit lebih awal sebelum preloader selesai total

// Parallax Effect untuk Gambar Project
gsap.utils.toArray('.project-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top bottom", // Saat bagian atas kartu menyentuh bawah layar
            end: "top center",
            scrub: 1, // Animasi terikat scroll
        },
        y: 100,
        opacity: 0.8
    });
});