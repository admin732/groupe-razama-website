/**
 * Groupe Razama Website - Contact Page JavaScript
 * Handles form validation and submission
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact form
    initContactForm();
    
    // Check for product parameter in URL
    checkProductParameter();
});

/**
 * Initialize contact form validation and submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // Add form submission event
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate the form
        if (validateForm(contactForm)) {
            // If valid, simulate form submission
            simulateFormSubmission(contactForm);
        }
    });
    
    // Add input event listeners for real-time validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            validateInput(this);
        });
        
        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });
}

/**
 * Validate the entire form
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Validate a single input field
 * @param {HTMLInputElement|HTMLTextAreaElement} input - The input to validate
 * @returns {boolean} - Whether the input is valid
 */
function validateInput(input) {
    const errorElement = input.nextElementSibling;
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous error
    errorElement.style.display = 'none';
    errorElement.textContent = '';
    
    // Check if the field is required and empty
    if (input.required && !input.value.trim()) {
        isValid = false;
        errorMessage = getTranslation('contact.form.errors.required') || 'Ce champ est requis.';
    } 
    // Email validation
    else if (input.type === 'email' && input.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
            isValid = false;
            errorMessage = getTranslation('contact.form.errors.email') || 'Veuillez entrer une adresse email valide.';
        }
    }
    
    // If not valid, show error message
    if (!isValid) {
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
        input.classList.add('error');
    } else {
        input.classList.remove('error');
    }
    
    return isValid;
}

/**
 * Simulate form submission (for demo purposes)
 * @param {HTMLFormElement} form - The form to submit
 */
function simulateFormSubmission(form) {
    const formStatus = document.getElementById('formStatus');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Disable the submit button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = getTranslation('contact.form.sending') || 'Envoi en cours...';
    
    // Simulate API call with timeout
    setTimeout(() => {
        // Re-enable the submit button
        submitButton.disabled = false;
        submitButton.textContent = getTranslation('contact.form.submit') || 'Envoyer';
        
        // Show success message
        formStatus.textContent = getTranslation('contact.form.success') || 
            'Votre message a été envoyé avec succès. Nous vous contacterons bientôt.';
        formStatus.className = 'form-status success';
        
        // Reset the form
        form.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }, 1500);
}

/**
 * Check for product parameter in URL and pre-fill the form
 */
function checkProductParameter() {
    const urlParams = new URLSearchParams(window.location.search);
    const product = urlParams.get('product');
    
    if (product) {
        const subjectField = document.getElementById('subject');
        const messageField = document.getElementById('message');
        
        if (subjectField) {
            subjectField.value = getTranslation('contact.form.productInquiry') || 'Demande de devis: ' + product;
        }
        
        if (messageField) {
            messageField.value = getTranslation('contact.form.productMessage') || 
                `Je souhaite obtenir plus d'informations et un devis pour le produit: ${product}.\n\nMerci.`;
        }
    }
}

/**
 * Get translation for a specific key (simplified version for contact.js)
 * This is a duplicate of the function in language.js to ensure contact.js can work independently
 * @param {string} key - The translation key
 * @returns {string|null} - The translated text or null if not found
 */
function getTranslation(key) {
    // If the main language.js getTranslation function exists, use it
    if (window.getTranslation && typeof window.getTranslation === 'function') {
        return window.getTranslation(key);
    }
    
    // Otherwise, return null and let the caller use the default value
    return null;
}
