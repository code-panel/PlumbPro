/**
 * PlumbPro — Plumbing Services Website
 * Vanilla JavaScript Implementation
 * 
 * Features:
 * - Centralized business configuration for easy customization
 * - Accessible mobile navigation drawer (ARIA attributes & ESC key support)
 * - Sticky header styling & Active scroll spy navigation
 * - Service card instant booking & auto-select
 * - Real-time form validation & Live inquiry text generation
 * - Direct WhatsApp integration with prefilled inquiry message
 * - Email draft mailto integration
 * - Clipboard copy with toast notification
 * - Interactive FAQ accordion
 * - Floating back-to-top button
 */

'use strict';

/* ==========================================================================
   1. Central Business Configuration
   Update these values to customize the plumber's business details
   ========================================================================== */
const BUSINESS_CONFIG = {
  name: "PlumbPro",
  phoneDisplay: "(555) 234-5678",
  phoneRaw: "+15552345678",
  // WhatsApp phone format: Country code + Number without '+' or spaces or dashes
  whatsappNumber: "15552345678",
  email: "service@plumbpro.com",
  address: "142 Riverbend Drive, Suite 100, Metro City",
  serviceAreas: "Downtown, Northwood, Westside, Eastgate, Riverdale & Metro Suburbs"
};

/* ==========================================================================
   2. DOM Content Loaded Initialization
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initHeaderScroll();
  initScrollSpy();
  initSmoothScrollLinks();
  initServiceCardBooking();
  initFAQAccordion();
  initContactForm();
  initBackToTop();
  updateCurrentYear();
});

/* ==========================================================================
   3. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const closeBtn = document.getElementById('mobile-close');
  const navDrawer = document.getElementById('mobile-nav');
  const backdrop = document.getElementById('mobile-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !navDrawer || !backdrop) return;

  function openMenu() {
    navDrawer.classList.add('open');
    backdrop.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    navDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeMenu() {
    navDrawer.classList.remove('open');
    backdrop.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    navDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = navDrawer.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  backdrop.addEventListener('click', closeMenu);

  // Close mobile menu when a nav link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navDrawer.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   4. Sticky Header on Scroll
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 25) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   5. Active Scroll Spy (Desktop Navigation)
   ========================================================================== */
function initScrollSpy() {
  const navLinks = document.querySelectorAll('.nav-desktop .nav-link');
  if (!navLinks.length) return;

  const linkTargets = Array.from(navLinks).map(link => {
    const id = link.getAttribute('href').replace('#', '');
    return { id, el: document.getElementById(id), link };
  }).filter(item => item.el !== null);

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 160;
    let activeItem = null;

    linkTargets.forEach(item => {
      if (scrollPosition >= item.el.offsetTop) {
        activeItem = item;
      }
    });

    if (activeItem) {
      navLinks.forEach(l => l.classList.remove('active'));
      activeItem.link.classList.add('active');
    }
  }, { passive: true });
}

/* ==========================================================================
   6. Smooth Scrolling with Offset
   ========================================================================== */
function initSmoothScrollLinks() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Push history without jarring jump
        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });
}

/* ==========================================================================
   7. Service Card Quick Booking
   When clicking "Book This Service", smoothly scroll to form and pre-select service
   ========================================================================== */
function initServiceCardBooking() {
  const bookButtons = document.querySelectorAll('.btn-book-service');
  const serviceSelect = document.getElementById('serviceType');
  const contactSection = document.getElementById('contact');
  const nameInput = document.getElementById('customerName');

  bookButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const serviceName = this.getAttribute('data-service-name');

      if (serviceSelect && serviceName) {
        // Select matching option
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].value === serviceName) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }

        // Trigger change event to update preview
        serviceSelect.dispatchEvent(new Event('change'));
      }

      // Scroll to contact form
      if (contactSection) {
        const headerOffset = 90;
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Focus customer name input for user convenience
        setTimeout(() => {
          if (nameInput) nameInput.focus();
        }, 600);
      }
    });
  });
}

/* ==========================================================================
   8. FAQ Accordion
   ========================================================================== */
function initFAQAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const body = item.querySelector('.accordion-body');

    if (!header || !body) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all accordion items for single-accordion behavior
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('open');
        const otherHeader = otherItem.querySelector('.accordion-header');
        const otherBody = otherItem.querySelector('.accordion-body');
        if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
        if (otherBody) otherBody.style.maxHeight = null;
      });

      // If clicked item wasn't open, open it
      if (!isOpen) {
        item.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   9. Contact Form & Live Message Formatter
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('service-quote-form');
  const nameInput = document.getElementById('customerName');
  const phoneInput = document.getElementById('customerPhone');
  const serviceSelect = document.getElementById('serviceType');
  const areaInput = document.getElementById('serviceArea');
  const problemInput = document.getElementById('problemDescription');

  const livePreview = document.getElementById('live-inquiry-preview');
  const copyPreviewBtn = document.getElementById('copy-preview-btn');
  const copyBtnText = document.getElementById('copy-btn-text');

  const whatsappBtn = document.getElementById('submit-whatsapp-btn');
  const emailBtn = document.getElementById('submit-email-btn');

  // Confirmation modal elements
  const modal = document.getElementById('confirmation-modal');
  const modalClose = document.getElementById('modal-close-btn');
  const modalMsgPreview = document.getElementById('modal-message-preview');
  const modalWaLink = document.getElementById('modal-wa-link');
  const modalEmailLink = document.getElementById('modal-email-link');
  const modalCopyBtn = document.getElementById('modal-copy-btn');

  if (!form) return;

  // Real-time input listeners to update preview & clear errors
  const inputs = [nameInput, phoneInput, serviceSelect, areaInput, problemInput];
  inputs.forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        clearFieldError(input);
        updateLivePreview();
      });
      input.addEventListener('change', () => {
        clearFieldError(input);
        updateLivePreview();
      });
    }
  });

  // Generates clean formatted message
  function generateInquiryMessage() {
    const name = (nameInput.value || '').trim() || '[Your Name]';
    const phone = (phoneInput.value || '').trim() || '[Your Phone]';
    const service = serviceSelect.value || '[Selected Service]';
    const area = (areaInput.value || '').trim() || '[Your Address/Area]';
    const problem = (problemInput.value || '').trim();

    let msg = `*PlumbPro Service Inquiry*\n`;
    msg += `--------------------------\n`;
    msg += `👤 Customer: ${name}\n`;
    msg += `📞 Phone: ${phone}\n`;
    msg += `🔧 Service: ${service}\n`;
    msg += `📍 Address/Area: ${area}\n`;
    if (problem) {
      msg += `📝 Details: ${problem}\n`;
    }
    msg += `--------------------------\n`;
    msg += `Generated via PlumbPro Website`;

    return msg;
  }

  // Updates live preview box
  function updateLivePreview() {
    if (!livePreview) return;
    const name = (nameInput.value || '').trim();
    const phone = (phoneInput.value || '').trim();
    const service = serviceSelect.value;

    if (!name && !phone && !service) {
      livePreview.textContent = 'Please fill in your name, phone number, and service above to see your formatted message.';
      return;
    }

    livePreview.textContent = generateInquiryMessage();
  }

  // Field validation
  function validateForm() {
    let isValid = true;

    // Validate Name
    const nameVal = (nameInput.value || '').trim();
    if (!nameVal || nameVal.length < 2) {
      showFieldError(nameInput, 'nameError');
      isValid = false;
    } else {
      clearFieldError(nameInput);
    }

    // Validate Phone
    const phoneVal = (phoneInput.value || '').trim();
    const digitsOnly = phoneVal.replace(/\D/g, '');
    if (!phoneVal || digitsOnly.length < 7) {
      showFieldError(phoneInput, 'phoneError');
      isValid = false;
    } else {
      clearFieldError(phoneInput);
    }

    // Validate Service
    if (!serviceSelect.value) {
      showFieldError(serviceSelect, 'serviceError');
      isValid = false;
    } else {
      clearFieldError(serviceSelect);
    }

    // Validate Area
    const areaVal = (areaInput.value || '').trim();
    if (!areaVal || areaVal.length < 2) {
      showFieldError(areaInput, 'areaError');
      isValid = false;
    } else {
      clearFieldError(areaInput);
    }

    return isValid;
  }

  function showFieldError(input, errorId) {
    if (!input) return;
    input.classList.add('is-invalid');
    const errEl = document.getElementById(errorId);
    if (errEl) errEl.classList.add('visible');
  }

  function clearFieldError(input) {
    if (!input) return;
    input.classList.remove('is-invalid');
    // find sibling or matching error message
    const formGroup = input.closest('.form-group');
    if (formGroup) {
      const errEl = formGroup.querySelector('.error-msg');
      if (errEl) errEl.classList.remove('visible');
    }
  }

  // Handle WhatsApp Submission
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      const message = generateInquiryMessage();
      const encodedMsg = encodeURIComponent(message);
      const waUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodedMsg}`;

      // Show confirmation modal
      openModal(message, waUrl);

      // Open WhatsApp in new tab
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // Handle Email Draft Submission
  if (emailBtn) {
    emailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      const name = (nameInput.value || '').trim();
      const service = serviceSelect.value || 'Plumbing Service';
      const message = generateInquiryMessage();

      const subject = encodeURIComponent(`Plumbing Inquiry: ${service} - ${name}`);
      const body = encodeURIComponent(message);
      const mailtoUrl = `mailto:${BUSINESS_CONFIG.email}?subject=${subject}&body=${body}`;

      // Show confirmation modal
      openModal(message, null, mailtoUrl);

      // Trigger mail client
      window.location.href = mailtoUrl;
    });
  }

  // Copy Preview Button
  if (copyPreviewBtn) {
    copyPreviewBtn.addEventListener('click', () => {
      const message = generateInquiryMessage();
      copyToClipboard(message, () => {
        showToast('Sample inquiry copied to clipboard!');
        if (copyBtnText) copyBtnText.textContent = 'Copied!';
        setTimeout(() => {
          if (copyBtnText) copyBtnText.textContent = 'Copy Sample Inquiry';
        }, 2200);
      });
    });
  }

  // Modal Open & Close logic
  function openModal(messageText, waUrl, mailtoUrl) {
    if (!modal) return;
    if (modalMsgPreview) modalMsgPreview.textContent = messageText;

    const encoded = encodeURIComponent(messageText);
    const finalWa = waUrl || `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encoded}`;
    const name = (nameInput.value || '').trim();
    const service = serviceSelect.value || 'Plumbing Service';
    const finalEmail = mailtoUrl || `mailto:${BUSINESS_CONFIG.email}?subject=${encodeURIComponent(`Plumbing Inquiry: ${service} - ${name}`)}&body=${encoded}`;

    if (modalWaLink) modalWaLink.setAttribute('href', finalWa);
    if (modalEmailLink) modalEmailLink.setAttribute('href', finalEmail);

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });

  if (modalCopyBtn) {
    modalCopyBtn.addEventListener('click', () => {
      const text = modalMsgPreview ? modalMsgPreview.textContent : generateInquiryMessage();
      copyToClipboard(text, () => {
        showToast('Inquiry text copied to clipboard!');
      });
    });
  }
}

/* ==========================================================================
   10. Clipboard Copy Helper & Toast Notification
   ========================================================================== */
function copyToClipboard(text, callback) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => {
        if (callback) callback();
      })
      .catch(() => {
        fallbackCopyText(text, callback);
      });
  } else {
    fallbackCopyText(text, callback);
  }
}

function fallbackCopyText(text, callback) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.top = '-9999px';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    if (callback) callback();
  } catch (err) {
    console.error('Fallback copy failed', err);
  }
  document.body.removeChild(textArea);
}

function showToast(message) {
  const toast = document.getElementById('toast-notification');
  const toastText = document.getElementById('toast-text');
  if (!toast) return;

  if (toastText) toastText.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* ==========================================================================
   11. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 380) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   12. Current Year Auto-updater
   ========================================================================== */
function updateCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
