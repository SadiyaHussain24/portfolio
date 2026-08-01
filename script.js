/**
 * SADIYA HUSSAIN - PERSONAL PORTFOLIO JAVASCRIPT
 * Pure Vanilla JavaScript for dynamic typing, scroll animations,
 * interactive modals, contact form validation, and responsive navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. DYNAMIC TYPING ANIMATION EFFECT
  // =========================================================================
  const typingElement = document.getElementById('typingText');
  if (typingElement) {
    const words = [
      'Interactive Web Experiences',
      'Modern Frontend Interfaces',
      'Full-Stack Applications',
      'Clean & Scalable Code',
      'User-Centric UI/UX Designs'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingSpeed = 2000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500;
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }

  // =========================================================================
  // 2. FIXED NAVBAR SCROLL EFFECT & ACTIVE LINK HIGHLIGHT (SCROLLSPY)
  // =========================================================================
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('backToTop');

  function handleScroll() {
    const scrollY = window.scrollY;

    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // =========================================================================
  // 3. MOBILE MENU HAMBURGER TOGGLE
  // =========================================================================
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // =========================================================================
  // 4. INTERSECTION OBSERVER FOR SCROLL REVEAL & PROGRESS BARS
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');

        const progressBar = entry.target.querySelector('.skill-progress-bar');
        if (progressBar) {
          const targetWidth = progressBar.getAttribute('data-width') || '85%';
          progressBar.style.width = targetWidth;
        }

        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.15
  });

  revealElements.forEach((el) => revealObserver.observe(el));

  // =========================================================================
  // 5. TOAST NOTIFICATION UTILITY (Yahan define hai showToast)
  // =========================================================================
  const toastNotice = document.getElementById('toastNotice');
  const toastText = document.getElementById('toastText');
  let toastTimeout;

  function showToast(message) {
    if (!toastNotice || !toastText) return;
    toastText.textContent = message;
    toastNotice.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 4000);
  }

  // =========================================================================
  // 6. "COMING SOON" PROJECT BUTTON HANDLER
  // =========================================================================
  const comingSoonBtns = document.querySelectorAll('.btn-coming-soon');
  comingSoonBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectTitle = btn.getAttribute('data-title') || 'This project';
      showToast(`🚀 ${projectTitle} is currently under active refinement! Full demo coming soon.`);
    });
  });

  // =========================================================================
  // 7. RESUME MODAL HANDLER
  // =========================================================================
  const resumeBtn = document.getElementById('resumeBtn');
  const resumeModal = document.getElementById('resumeModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const printResumeBtn = document.getElementById('printResumeBtn');

  if (resumeBtn && resumeModal) {
    resumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    const closeModal = () => {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
        closeModal();
      }
    });

    if (printResumeBtn) {
      printResumeBtn.addEventListener('click', () => {
        showToast('📄 Preparing Sadiya Hussain\'s Resume for print / download...');
        setTimeout(() => {
          window.print();
        }, 800);
      });
    }
  }

  // =========================================================================
  // 8. CONTACT FORM SUBMISSION HANDLER (Database Connected)
  // =========================================================================
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('formName');
      const emailInput = document.getElementById('formEmail');
      const messageInput = document.getElementById('formMessage');

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const messageVal = messageInput ? messageInput.value.trim() : '';

      if (!nameVal || !emailVal || !messageVal) {
        showToast('⚠️ Please fill in all required fields before sending.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        showToast('⚠️ Please enter a valid email address.');
        return;
      }

      try {
        const formData = new FormData(contactForm);
        const response = await fetch('http://localhost/portfolio-backend/contact.php', {
          method: 'POST',
          body: formData
        });
        const result = await response.json();

        if (result.status === 'success') {
          showToast(`✨ Thank you, ${nameVal}! ${result.message}`);
          contactForm.reset();
        } else {
          showToast(`⚠️ ${result.message}`);
        }
      } catch (error) {
        showToast('⚠️ Server connection failed! Please check XAMPP.');
        console.error('Error:', error);
      }
    });
  }
});