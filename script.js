// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    body.style.overflow = '';
}));

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// === Animation d'apparition sur toutes les sections ===
document.addEventListener('DOMContentLoaded', () => {
    // Appliquer la classe d'animation à toutes les sections principales
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('section-animate');
    });
    // Observer pour déclencher l'animation
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.section-animate').forEach(section => {
        sectionObserver.observe(section);
    });
});

// === Feedback visuel sur les champs de formulaire ===
function setFieldState(input, state) {
    input.classList.remove('success', 'error');
    if (state) input.classList.add(state);
}

// Form handling for Talent Network
const talentForm = document.getElementById('talentForm');
if (talentForm) {
    talentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        let valid = true;
        // Validation des champs requis
        ['name','email','sector','experience'].forEach(id => {
            const input = this.querySelector(`[name="${id}"]`);
            if (!data[id]) {
                setFieldState(input, 'error');
                valid = false;
            } else {
                setFieldState(input, 'success');
            }
        });
        // Email
        const emailInput = this.querySelector('[name="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (data.email && !emailRegex.test(data.email)) {
            setFieldState(emailInput, 'error');
            valid = false;
        }
        if (!valid) {
            showNotification('Merci de remplir tous les champs obligatoires.', 'error');
            return;
        }
        showNotification('Merci ! Votre profil a bien été soumis.', 'success');
        this.reset();
        this.querySelectorAll('.success, .error').forEach(el => el.classList.remove('success','error'));
    });
    // Feedback instantané
    talentForm.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', function() {
            setFieldState(this, this.value ? 'success' : 'error');
        });
    });
}

// Form handling for Contact
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        let valid = true;
        ['contactName','contactEmail','subject','contactMessage'].forEach(id => {
            const input = this.querySelector(`[name="${id}"]`);
            if (!data[id]) {
                setFieldState(input, 'error');
                valid = false;
            } else {
                setFieldState(input, 'success');
            }
        });
        const emailInput = this.querySelector('[name="contactEmail"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (data.contactEmail && !emailRegex.test(data.contactEmail)) {
            setFieldState(emailInput, 'error');
            valid = false;
        }
        if (!valid) {
            showNotification('Merci de remplir tous les champs obligatoires.', 'error');
            return;
        }
        showNotification('Merci ! Votre message a bien été envoyé.', 'success');
        this.reset();
        this.querySelectorAll('.success, .error').forEach(el => el.classList.remove('success','error'));
    });
    contactForm.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('input', function() {
            setFieldState(this, this.value ? 'success' : 'error');
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.expertise-card, .commitment-card, .philosophy-point');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Special animation for client logos with staggered delays
    const clientLogos = document.querySelectorAll('.client-logo');
    const clientObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const logo = entry.target;
                const delay = parseInt(logo.dataset.delay) || 0;
                
                setTimeout(() => {
                    logo.classList.add('animate-in');
                }, delay);
                
                clientObserver.unobserve(logo);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    clientLogos.forEach(logo => {
        clientObserver.observe(logo);
    });
});

// Add animation classes to CSS
const style = document.createElement('style');
style.textContent = `
    .expertise-card, .commitment-card, .client-logo, .philosophy-point {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .expertise-card.animate-in, .commitment-card.animate-in, .client-logo.animate-in, .philosophy-point.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .nav-link.active {
        color: #2563eb;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// File upload preview for CV
const cvInput = document.getElementById('cv');
const cvFilename = document.getElementById('cv-filename');
if (cvInput && cvFilename) {
    cvInput.addEventListener('change', function() {
        cvFilename.textContent = this.files.length ? this.files[0].name : 'Aucun fichier choisi';
    });
}

// Lazy loading for client logos (when real images are added)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Smooth reveal animation for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add reveal animation styles
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
    }
    
    .reveal.active {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(revealStyle);

// Add reveal class to sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('reveal');
    });
});

// Locomotive clients carousel duplication for infinite scroll
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.clients-track');
  if (track) {
    // Duplicate logos for seamless infinite scroll
    const logos = Array.from(track.children);
    logos.forEach(logo => {
      const clone = logo.cloneNode(true);
      track.appendChild(clone);
    });
    // Supprimer tout effet de pause au survol
    track.addEventListener('mouseenter', e => { track.style.animationPlayState = 'running'; });
    track.addEventListener('mouseleave', e => { track.style.animationPlayState = 'running'; });
  }
});

// Mobile-specific optimizations
function initMobileOptimizations() {
    // Detect touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        // Add touch-specific classes
        document.body.classList.add('touch-device');
        
        // Optimize form inputs for mobile
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            // Prevent zoom on iOS when focusing inputs
            if (input.type !== 'file') {
                input.style.fontSize = '16px';
            }
        });
        
        // Add touch feedback for buttons
        const buttons = document.querySelectorAll('.btn, .nav-link');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            button.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }
    
    // Handle viewport height issues on mobile
    function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
}

// Initialize mobile optimizations
initMobileOptimizations();

// Logo click handler - refresh page
const logoLink = document.getElementById('logo-link');
if (logoLink) {
    logoLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.reload();
    });
}

// Prevent double-tap zoom on mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Optimize scroll performance on mobile
let ticking = false;
function updateScroll() {
    // Add any scroll-based optimizations here
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick, { passive: true });

// Effet scroll sur le header
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}); 

document.querySelectorAll('.nav-link[href="#expertise"]').forEach(link => {
  link.addEventListener('click', function(e) {
    setTimeout(() => {
      const subtitles = document.getElementById('expertise-subtitles');
      if (subtitles) {
        subtitles.style.display = 'block';
        subtitles.classList.add('reveal');
      }
    }, 400);
  });
}); 