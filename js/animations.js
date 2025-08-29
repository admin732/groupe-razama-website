/**
 * Groupe Razama Website - Animations JavaScript
 * Uses IntersectionObserver for scroll-based animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initScrollAnimations();
});

/**
 * Initialize scroll-based animations using IntersectionObserver
 */
function initScrollAnimations() {
    // Get all elements with the animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // If IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // If the element is in the viewport
                if (entry.isIntersecting) {
                    // Add the active class to trigger the animation
                    entry.target.classList.add('active');
                    
                    // Stop observing the element after it's animated
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null, // Use the viewport as the root
            rootMargin: '0px', // No margin
            threshold: 0.1 // Trigger when 10% of the element is visible
        });
        
        // Observe each animated element
        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animatedElements.forEach(element => {
            element.classList.add('active');
        });
    }
}

/**
 * Add a staggered animation to a group of elements
 * @param {string} selector - CSS selector for the elements to animate
 * @param {number} staggerDelay - Delay between each element's animation in milliseconds
 */
function addStaggeredAnimation(selector, staggerDelay = 100) {
    const elements = document.querySelectorAll(selector);
    
    if (elements.length === 0) return;
    
    elements.forEach((element, index) => {
        // Add a delay class based on the index
        element.style.transitionDelay = `${index * staggerDelay}ms`;
    });
}

/**
 * Initialize parallax effect for background elements
 * @param {string} selector - CSS selector for the elements to apply parallax to
 */
function initParallaxEffect(selector) {
    const parallaxElements = document.querySelectorAll(selector);
    
    if (parallaxElements.length === 0) return;
    
    // Function to update parallax position
    function updateParallax() {
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    }
    
    // Add scroll event listener with debounce for better performance
    window.addEventListener('scroll', debounce(updateParallax, 10));
    
    // Initial update
    updateParallax();
}

/**
 * Initialize counter animation for numeric elements
 * @param {string} selector - CSS selector for the counter elements
 * @param {number} duration - Animation duration in milliseconds
 */
function initCounterAnimation(selector, duration = 2000) {
    const counterElements = document.querySelectorAll(selector);
    
    if (counterElements.length === 0) return;
    
    // Create an observer for counter elements
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.dataset.target, 10);
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        element.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        element.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observe each counter element
    counterElements.forEach(element => {
        counterObserver.observe(element);
    });
}

/**
 * Initialize typing animation for text elements
 * @param {string} selector - CSS selector for the elements to apply typing animation to
 * @param {number} speed - Typing speed in milliseconds per character
 */
function initTypingAnimation(selector, speed = 50) {
    const typingElements = document.querySelectorAll(selector);
    
    if (typingElements.length === 0) return;
    
    // Create an observer for typing elements
    const typingObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.dataset.text || element.textContent;
                
                // Clear the element's content
                element.textContent = '';
                element.style.visibility = 'visible';
                
                // Start typing animation
                let charIndex = 0;
                const typeChar = () => {
                    if (charIndex < text.length) {
                        element.textContent += text.charAt(charIndex);
                        charIndex++;
                        setTimeout(typeChar, speed);
                    }
                };
                
                typeChar();
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observe each typing element
    typingElements.forEach(element => {
        // Hide the element initially
        element.style.visibility = 'hidden';
        typingObserver.observe(element);
    });
}

// Initialize staggered animations for specific elements
document.addEventListener('DOMContentLoaded', function() {
    // Add staggered animations to various elements
    addStaggeredAnimation('.values-grid .value-card', 100);
    addStaggeredAnimation('.products-container .product-card', 100);
    addStaggeredAnimation('.ships-grid .ship-card', 100);
    
    // Initialize any other custom animations
    // initParallaxEffect('.parallax-bg');
    // initCounterAnimation('.counter');
    // initTypingAnimation('.typing-text');
});
