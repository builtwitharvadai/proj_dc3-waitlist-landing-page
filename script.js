// Email validation regex - matches standard email format
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// TODO: Replace 'YOUR_FORM_ID' with your actual Formspree form ID
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

// DOM element selection using data attributes
const form = document.querySelector('[data-waitlist-form]');
const emailInput = document.querySelector('[data-email-input]');
const submitButton = document.querySelector('[data-submit-button]');
const successMessage = document.querySelector('[data-success-message]');
const errorMessage = document.querySelector('[data-error-message]');

// Preserve original submit button text so we can restore it after loading
const originalButtonText = submitButton ? submitButton.textContent : 'Join Waitlist';

// Validation function - tests the email string against the regex
function validateEmail(email) {
  return EMAIL_REGEX.test(email);
}

// State management: show loading state on submit button
function showLoading() {
  submitButton.disabled = true;
  submitButton.setAttribute('aria-busy', 'true');
  submitButton.textContent = 'Submitting...';
  // Clear any previous messages while submitting
  hideMessage(successMessage);
  hideMessage(errorMessage);
  emailInput.setAttribute('aria-invalid', 'false');
}

// State management: show success container, hide error, reset form after 3s
function showSuccess(message) {
  hideMessage(errorMessage);
  // Setting textContent triggers the aria-live announcement
  successMessage.textContent = message;
  successMessage.hidden = false;
  emailInput.setAttribute('aria-invalid', 'false');

  // Reset button and form after 3 seconds
  setTimeout(() => {
    submitButton.disabled = false;
    submitButton.removeAttribute('aria-busy');
    submitButton.textContent = originalButtonText;
    hideMessage(successMessage);
  }, 3000);
}

// State management: show error container, hide success, re-enable button
function showError(message) {
  hideMessage(successMessage);
  // Setting textContent triggers the aria-live announcement
  errorMessage.textContent = message;
  errorMessage.hidden = false;
  emailInput.setAttribute('aria-invalid', 'true');

  submitButton.disabled = false;
  submitButton.removeAttribute('aria-busy');
  submitButton.textContent = originalButtonText;
}

// Helper to hide a message container and clear its text
function hideMessage(el) {
  if (!el) return;
  el.hidden = true;
  el.textContent = '';
}

// Form submit handler: validate, submit to Formspree, and manage UI state
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();

  if (!validateEmail(email)) {
    showError('Please enter a valid email address');
    return;
  }

  showLoading();

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    if (response.ok) {
      showSuccess("Thank you! You're on the waitlist.");
      emailInput.value = '';
      emailInput.focus();
    } else {
      // Attempt to parse a structured error message from Formspree
      let errorText = 'Something went wrong. Please try again.';
      try {
        const data = await response.json();
        if (data && data.error) {
          errorText = data.error;
        } else if (data && Array.isArray(data.errors) && data.errors.length > 0) {
          errorText = data.errors.map((err) => err.message).join(' ');
        }
      } catch (_parseError) {
        // Response body was not JSON; fall back to the default message
      }
      showError(errorText);
    }
  } catch (_networkError) {
    // Network-level failure (offline, DNS, CORS, etc.)
    showError('Network error. Please check your connection and try again.');
  }
});

// Scroll reveal animations using Intersection Observer
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target); // Stop observing after reveal
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  }); // Trigger slightly before element fully enters viewport

  document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el));
} else {
  // If reduced motion is preferred, immediately reveal all elements
  document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('revealed'));
}
