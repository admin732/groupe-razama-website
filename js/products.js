/**
 * Groupe Razama Website - Products Page JavaScript
 * Handles product filtering and modal functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize product filtering
    initProductFilter();

    // Initialize product image clicks for modal
    initProductImageClicks();

    // Initialize modal functionality
    initModal();
});

/**
 * Initialize product filtering functionality
 */
function initProductFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterButtons.length === 0 || productCards.length === 0) return;

    // Add click event to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get the filter category
            const filterValue = this.getAttribute('data-filter');

            // Filter the products
            filterProducts(filterValue, productCards);
        });
    });
}

/**
 * Filter products based on category
 * @param {string} category - The category to filter by
 * @param {NodeList} products - The product elements to filter
 */
function filterProducts(category, products) {
    products.forEach(product => {
        // Get the product's category
        const productCategory = product.getAttribute('data-category');

        // If the filter is 'all' or the product matches the filter
        if (category === 'all' || productCategory === category) {
            // Show the product with animation
            product.style.display = 'block';
            setTimeout(() => {
                product.style.opacity = '1';
                product.style.transform = 'translateY(0)';
            }, 10);
        } else {
            // Hide the product with animation
            product.style.opacity = '0';
            product.style.transform = 'translateY(20px)';
            setTimeout(() => {
                product.style.display = 'none';
            }, 300);
        }
    });
}

/**
 * Initialize product image clicks for modal
 */
function initProductImageClicks() {
    const clickableImages = document.querySelectorAll('.clickable-image');
    const detailButtons = document.querySelectorAll('.product-details-btn');

    // Add click event to clickable images
    clickableImages.forEach(image => {
        image.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            showProductModal(productCard);
        });
    });

    // Add click event to detail buttons
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            showProductModal(productCard);
        });
    });
}

/**
 * Initialize modal functionality
 */
function initModal() {
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.modal-close');

    if (!modal || !closeBtn) return;

    // Close modal when clicking the X button
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

/**
 * Show product modal with details
 * @param {HTMLElement} productCard - The product card element
 */
function showProductModal(productCard) {
    const modal = document.getElementById('productModal');
    if (!modal) return;

    // Get product data from attributes
    const productName = productCard.getAttribute('data-product-name');
    const productDescription = productCard.getAttribute('data-product-description');
    const productDetails = productCard.getAttribute('data-product-details');
    const productOrigin = productCard.getAttribute('data-product-origin');
    const productSeason = productCard.getAttribute('data-product-season');
    const productPackaging = productCard.getAttribute('data-product-packaging');
    const productImage = productCard.querySelector('img').src;
    const productAlt = productCard.querySelector('img').alt;

    // Populate modal with product information
    document.getElementById('modalProductName').textContent = productName;
    document.getElementById('modalProductDescription').textContent = productDescription;
    document.getElementById('modalProductDetails').textContent = productDetails;
    document.getElementById('modalProductOrigin').textContent = productOrigin;
    document.getElementById('modalProductSeason').textContent = productSeason;
    document.getElementById('modalProductPackaging').textContent = productPackaging;

    const modalImage = document.getElementById('modalProductImage');
    modalImage.src = productImage;
    modalImage.alt = productAlt;

    // Show the modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

/**
 * Close the product modal
 */
function closeModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Make closeModal function globally available for onclick events
window.closeModal = closeModal;

/**
 * Initialize product image gallery (for product detail pages)
 * @param {string} gallerySelector - Selector for the gallery container
 * @param {string} mainImageSelector - Selector for the main image
 * @param {string} thumbnailSelector - Selector for the thumbnail images
 */
function initProductGallery(gallerySelector, mainImageSelector, thumbnailSelector) {
    const gallery = document.querySelector(gallerySelector);

    if (!gallery) return;

    const mainImage = gallery.querySelector(mainImageSelector);
    const thumbnails = gallery.querySelectorAll(thumbnailSelector);

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Get the full-size image URL
            const fullSizeUrl = this.getAttribute('data-full-size') || this.src;

            // Update the main image
            mainImage.src = fullSizeUrl;
            mainImage.alt = this.alt;

            // Remove active class from all thumbnails
            thumbnails.forEach(thumb => thumb.classList.remove('active'));

            // Add active class to clicked thumbnail
            this.classList.add('active');
        });
    });
}
