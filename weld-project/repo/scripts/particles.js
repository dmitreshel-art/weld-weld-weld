// Адаптивная конфигурация particles.js
// Оптимизация производительности для мобильных устройств

(function() {
    // Определение производительности устройства
    const isMobile = window.innerWidth < 768;
    const isLowPerf = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    
    // Настройки в зависимости от устройства
    const particleCount = (isMobile || isLowPerf) ? 40 : 80;
    const particleArea = (isMobile || isLowPerf) ? 400 : 800;
    const lineDistance = isMobile ? 100 : 150;
    const moveSpeed = isMobile ? 1.5 : 2;
    
    // Инициализация particles
    particlesJS("particles-js", {
        particles: {
            number: { 
                value: particleCount, 
                density: { enable: true, value_area: particleArea } 
            },
            color: { value: "#000000" },
            shape: {
                type: "circle",
                stroke: { width: 0, color: "#000000" },
                polygon: { nb_sides: 5 }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
            },
            size: {
                value: 3,
                random: true,
                anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
            },
            line_linked: {
                enable: true,
                distance: lineDistance,
                color: "#000000",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: moveSpeed,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: { enable: false, rotateX: 600, rotateY: 1200 }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: !isMobile, mode: "repulse" }, // Отключаем hover на мобильных
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 400, line_linked: { opacity: 1 } },
                bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                repulse: { distance: isMobile ? 100 : 200, duration: 0.4 },
                push: { particles_nb: 4 },
                remove: { particles_nb: 2 }
            }
        },
        retina_detect: true
    });
    
    // Логирование для отладки (можно убрать в production)
    console.log('Particles initialized:', { 
        count: particleCount, 
        isMobile, 
        isLowPerf 
    });
})();

// Код статистики (отключён на мобильных для производительности)
const isMobile = window.innerWidth < 768;

if (!isMobile && typeof Stats !== 'undefined') {
    var stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
    
    var count_particles = document.querySelector(".js-count-particles");
    var update = function() {
        stats.begin();
        stats.end();
        if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
            count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
        }
        requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}