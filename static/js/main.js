// Three.js Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-canvas'),
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Create infinity symbol geometry
const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-10, 0, 0),
    new THREE.Vector3(-5, 5, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(5, -5, 0),
    new THREE.Vector3(10, 0, 0),
    new THREE.Vector3(5, 5, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(-5, -5, 0),
    new THREE.Vector3(-10, 0, 0)
]);

const points = curve.getPoints(50);
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({ 
    color: 0x3490dc,
    linewidth: 2
});
const infinityCurve = new THREE.Line(geometry, material);
scene.add(infinityCurve);

// Add particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000; // Increased particle count
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 50;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: 0x6574cd,
    transparent: true,
    opacity: 0.8
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Mouse movement effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation
function animate() {
    requestAnimationFrame(animate);
    
    infinityCurve.rotation.x += 0.001;
    infinityCurve.rotation.y += 0.002;
    
    particlesMesh.rotation.y += 0.0005;
    
    // Add subtle movement based on mouse position
    infinityCurve.rotation.x += mouseY * 0.0001;
    infinityCurve.rotation.y += mouseX * 0.0001;
    
    particlesMesh.rotation.x += mouseY * 0.0001;
    particlesMesh.rotation.y += mouseX * 0.0001;
    
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Anime.js animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate navigation items
    anime({
        targets: '.nav-item',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(100),
        easing: 'easeOutExpo'
    });

    // Animate hero content
    anime({
        targets: '.hero-content',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1200,
        delay: 300,
        easing: 'easeOutExpo'
    });

    // Animate service cards on scroll
    const observerService = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    scale: [0.9, 1],
                    opacity: [0, 1],
                    duration: 800,
                    easing: 'easeOutExpo'
                });
                observerService.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card').forEach(card => {
        observerService.observe(card);
    });

    // Animate streaming cards on scroll
    const observerStreaming = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    translateX: [-50, 0],
                    opacity: [0, 1],
                    duration: 800,
                    easing: 'easeOutExpo'
                });
                observerStreaming.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.streaming-card').forEach(card => {
        observerStreaming.observe(card);
    });

    // Form input animations
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            anime({
                targets: input,
                scale: [1, 1.02],
                duration: 300,
                easing: 'easeOutExpo'
            });
        });

        input.addEventListener('blur', () => {
            anime({
                targets: input,
                scale: [1.02, 1],
                duration: 300,
                easing: 'easeOutExpo'
            });
        });
    });
}); 