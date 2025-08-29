/**
 * Groupe Razama Website - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initCarousel();

    // Check if there are placeholder images that need to be replaced
    checkPlaceholderImages();
});

/**
 * Initialize the navigation menu functionality
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');

                // Close all dropdowns
                const dropdownLinks = document.querySelectorAll('.has-dropdown > a');
                dropdownLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.nextElementSibling) {
                        link.nextElementSibling.classList.remove('active');
                    }
                });
            }
        });

        // Handle dropdown menus on mobile
        const dropdownLinks = document.querySelectorAll('.has-dropdown > a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                // Only for mobile view
                if (window.innerWidth <= 768) {
                    event.preventDefault();
                    this.classList.toggle('active');
                    const dropdown = this.nextElementSibling;
                    if (dropdown) {
                        dropdown.classList.toggle('active');
                    }
                }
            });
        });

        // Close menu when clicking on a non-dropdown link
        const navLinks = navMenu.querySelectorAll('a:not(.has-dropdown > a)');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

/**
 * Initialize carousel functionality
 */
function initCarousel() {
    // Initialize company image carousel if it exists
    const carouselContainer = document.querySelector('.company-image .carousel-container');
    if (carouselContainer) {
        let currentSlide = 0;
        const slides = carouselContainer.querySelectorAll('.carousel-slide');
        const totalSlides = slides.length;

        // Auto-advance carousel every 5 seconds
        setInterval(() => {
            changeSlide(1);
        }, 5000);

        // Make changeSlide function available globally for button clicks
        window.changeSlide = function(direction) {
            // Remove active class from current slide
            slides[currentSlide].classList.remove('active');

            // Calculate new slide index
            currentSlide += direction;

            // Handle wrap-around
            if (currentSlide >= totalSlides) {
                currentSlide = 0;
            } else if (currentSlide < 0) {
                currentSlide = totalSlides - 1;
            }

            // Add active class to new slide
            slides[currentSlide].classList.add('active');
        };
    }
}

/**
 * Check for placeholder images and replace with actual content when available
 */
function checkPlaceholderImages() {
    // List of placeholder images to be replaced with actual content
    const placeholderImages = [
        // Note: Hero section now uses carousel, so no background image needed
        // Add other placeholder images as needed
    ];

    placeholderImages.forEach(item => {
        const element = document.querySelector(item.selector);
        if (element) {
            // Check if the image exists
            const img = new Image();
            img.src = item.backgroundImage;

            img.onload = function() {
                // Image exists, set it as background
                element.style.backgroundImage = `url('${item.backgroundImage}')`;
            };

            img.onerror = function() {
                // Image doesn't exist, use fallback color
                console.warn(`Image ${item.backgroundImage} not found. Using fallback color.`);
                element.style.backgroundColor = item.fallbackColor;
            };
        }
    });
}

/**
 * Utility function to debounce function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Helper function to check if an element is in viewport
 * @param {HTMLElement} element - The element to check
 * @param {number} offset - Offset value to trigger animation before element is fully visible
 * @returns {boolean} - Whether the element is in viewport
 */
function isInViewport(element, offset = 100) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight - offset || document.documentElement.clientHeight - offset) &&
        rect.bottom >= 0 &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.right >= 0
    );
}

/**
 * Helper function to add a class after a delay
 * @param {HTMLElement} element - The element to add the class to
 * @param {string} className - The class name to add
 * @param {number} delay - Delay in milliseconds
 */
function addClassWithDelay(element, className, delay) {
    setTimeout(() => {
        element.classList.add(className);
    }, delay);
}

/**
 * Helper function to format a date
 * @param {Date} date - The date to format
 * @param {string} locale - The locale to use for formatting
 * @returns {string} - Formatted date string
 */
function formatDate(date, locale = 'fr-FR') {
    return new Date(date).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Helper function to validate an email address
 * @param {string} email - The email address to validate
 * @returns {boolean} - Whether the email is valid
 */
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Helper function to create a debounced function
 * @param {Function} func - The function to debounce
 * @param {number} wait - The debounce wait time in milliseconds
 * @returns {Function} - The debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
