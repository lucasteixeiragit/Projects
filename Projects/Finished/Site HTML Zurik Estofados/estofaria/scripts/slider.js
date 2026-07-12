// Slider functionality
let currentSlide = 0;
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slider__img');
const navDots = document.querySelectorAll('.slider__nav a');

function showSlide(index) {
    if (!slider || slides.length === 0) return;
    if (index < 0 || index >= slides.length) index = 0;

    slider.scrollLeft = index * slider.offsetWidth;
    currentSlide = index;

    // Update active dot
    navDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Add click events to navigation dots
navDots.forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
        e.preventDefault();
        showSlide(index);
    });
});

// Arrow controls
const prevArrow = document.querySelector('.slider__arrow--prev');
const nextArrow = document.querySelector('.slider__arrow--next');

if (prevArrow) {
    prevArrow.addEventListener('click', () => {
        prevSlide();
    });
}

if (nextArrow) {
    nextArrow.addEventListener('click', () => {
        nextSlide();
    });
}

// Auto-play functionality (optional)
let autoPlayInterval = setInterval(nextSlide, 5000);

// Pause auto-play on hover
const gallerySlider = document.querySelector('.galery__slider');
if (gallerySlider) {
    gallerySlider.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    gallerySlider.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
    });
}

// Adjust after window resize
window.addEventListener('resize', () => {
    showSlide(currentSlide);
});

// Initialize
showSlide(0);