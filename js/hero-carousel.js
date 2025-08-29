/**
 * Hero Carousel Functionality
 * Auto-changes images every 3 seconds with manual navigation
 */

let currentSlide = 0;
let autoSlideInterval = null;
const autoSlideDelay = 3000; // 3 seconds

function initHeroCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const leftArrow = document.querySelector('.carousel-arrow-left');
    const rightArrow = document.querySelector('.carousel-arrow-right');

    if (slides.length === 0) {
        console.log('No carousel slides found');
        return;
    }

    console.log(`Hero carousel initialized with ${slides.length} slides`);
    console.log('Left arrow element:', leftArrow);
    console.log('Right arrow element:', rightArrow);

    // Set up arrow click events with multiple event types
    if (leftArrow) {
        leftArrow.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Left arrow clicked');
            previousSlide();
        });

        leftArrow.addEventListener('mousedown', function(e) {
            e.preventDefault();
            console.log('Left arrow mousedown');
        });

        // Make sure the button is visible and clickable
        leftArrow.style.pointerEvents = 'auto';
        leftArrow.style.zIndex = '1000';
    } else {
        console.error('Left arrow not found!');
    }

    if (rightArrow) {
        rightArrow.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Right arrow clicked');
            nextSlide();
        });

        rightArrow.addEventListener('mousedown', function(e) {
            e.preventDefault();
            console.log('Right arrow mousedown');
        });

        // Make sure the button is visible and clickable
        rightArrow.style.pointerEvents = 'auto';
        rightArrow.style.zIndex = '1000';
    } else {
        console.error('Right arrow not found!');
    }

    // Start auto-slide
    startAutoSlide();

    // Pause auto-slide on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', pauseAutoSlide);
        heroSection.addEventListener('mouseleave', startAutoSlide);
    }

    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            previousSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Handle visibility change (pause when tab is not active)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            pauseAutoSlide();
        } else {
            startAutoSlide();
        }
    });
}

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');

    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));

    // Add active class to current slide
    if (slides[index]) {
        slides[index].classList.add('active');
        currentSlide = index;
        console.log(`Showing slide ${index + 1} of ${slides.length}`);
    }
}

function nextSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);

    // Restart auto-slide timer
    restartAutoSlide();
}

function previousSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);

    // Restart auto-slide timer
    restartAutoSlide();
}

function startAutoSlide() {
    pauseAutoSlide(); // Clear any existing interval
    autoSlideInterval = setInterval(function() {
        nextSlide();
    }, autoSlideDelay);
}

function pauseAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

function restartAutoSlide() {
    startAutoSlide();
}

// Test function to manually trigger slides
function testCarousel() {
    console.log('Testing carousel manually...');
    const slides = document.querySelectorAll('.carousel-slide');
    console.log('Found slides:', slides.length);

    if (slides.length > 0) {
        console.log('Current slide:', currentSlide);
        nextSlide();
        console.log('After next, current slide:', currentSlide);
    }
}

// Make test function globally available
window.testCarousel = testCarousel;
window.nextSlide = nextSlide;
window.previousSlide = previousSlide;

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing carousel...');
    initHeroCarousel();

    // Add a small delay and test
    setTimeout(function() {
        console.log('Testing carousel after 1 second...');
        const leftArrow = document.querySelector('.carousel-arrow-left');
        const rightArrow = document.querySelector('.carousel-arrow-right');
        console.log('Left arrow found:', !!leftArrow);
        console.log('Right arrow found:', !!rightArrow);

        if (leftArrow) {
            console.log('Left arrow styles:', {
                display: getComputedStyle(leftArrow).display,
                visibility: getComputedStyle(leftArrow).visibility,
                pointerEvents: getComputedStyle(leftArrow).pointerEvents,
                zIndex: getComputedStyle(leftArrow).zIndex
            });
        }
    }, 1000);
});

// Also initialize if script is loaded after DOM is ready
if (document.readyState !== 'loading') {
    initHeroCarousel();
}
