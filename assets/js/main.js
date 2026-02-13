// Vanilla JS Utilities for OfficiallySp.net

// Typing Animation
class TypingAnimation {
  constructor(elementId, stringsElementId, options = {}) {
    this.element = document.getElementById(elementId);
    this.stringsElement = document.getElementById(stringsElementId);
    if (!this.element || !this.stringsElement) return;

    this.strings = Array.from(this.stringsElement.children).map(el => el.textContent);
    this.typeSpeed = options.typeSpeed || 70;
    this.backSpeed = options.backSpeed || 50;
    this.backDelay = options.backDelay || 2000;
    this.startDelay = options.startDelay || 500;
    this.loop = options.loop !== false;
    
    this.currentStringIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.timeout = null;
    
    this.start();
  }

  start() {
    setTimeout(() => {
      this.type();
    }, this.startDelay);
  }

  type() {
    const currentString = this.strings[this.currentStringIndex];
    
    if (this.isDeleting) {
      this.element.textContent = currentString.substring(0, this.currentCharIndex - 1);
      this.currentCharIndex--;
    } else {
      this.element.textContent = currentString.substring(0, this.currentCharIndex + 1);
      this.currentCharIndex++;
    }

    let typeSpeed = this.isDeleting ? this.backSpeed : this.typeSpeed;

    if (!this.isDeleting && this.currentCharIndex === currentString.length) {
      typeSpeed = this.backDelay;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentCharIndex === 0) {
      this.isDeleting = false;
      this.currentStringIndex++;
      if (this.currentStringIndex >= this.strings.length) {
        if (this.loop) {
          this.currentStringIndex = 0;
        } else {
          return;
        }
      }
    }

    this.timeout = setTimeout(() => this.type(), typeSpeed);
  }

  destroy() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
}

// Counter Animation
class CounterAnimation {
  constructor(elementId, targetValue, options = {}) {
    this.element = document.getElementById(elementId);
    if (!this.element) return;

    this.targetValue = parseInt(targetValue) || 0;
    this.duration = options.duration || 2000;
    this.startValue = 0;
    this.startTime = null;
    this.isAnimating = false;
    
    this.animate();
  }

  animate() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.startTime = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - this.startTime;
      const progress = Math.min(elapsed / this.duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(this.startValue + (this.targetValue - this.startValue) * easeOut);
      
      this.element.textContent = currentValue;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        this.element.textContent = this.targetValue;
        this.isAnimating = false;
      }
    };
    
    requestAnimationFrame(updateCounter);
  }
}

// Component Loader
class ComponentLoader {
  static async load(url, targetId) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load ${url}: ${response.status}`);
      }
      const html = await response.text();
      const target = document.getElementById(targetId);
      if (target) {
        target.innerHTML = html;
        
        // Initialize or reinitialize navbar components after loading
        if (targetId === 'navbar-container') {
          setTimeout(() => {
            // Initialize or reinitialize mobile menu
            window.mobileMenu = new MobileMenu();

            // Initialize or reinitialize dropdowns
            if (window.dropdownMenu) {
              window.dropdownMenu.reinit();
            } else {
              window.dropdownMenu = new DropdownMenu();
            }
          }, 10);
        }
      }
      return html;
    } catch (error) {
      console.error(`Error loading component ${url}:`, error);
      const target = document.getElementById(targetId);
      if (target) {
        target.innerHTML = `<div class="alert">Failed to load ${url}</div>`;
      }
    }
  }
}

// Mobile Menu Toggle
class MobileMenu {
  constructor() {
    this.toggle = document.querySelector('.navbar-toggle');
    this.nav = document.querySelector('.navbar-nav');
    
    if (this.toggle && this.nav) {
      this.toggle.addEventListener('click', () => this.toggleMenu());
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!this.nav.contains(e.target) && !this.toggle.contains(e.target)) {
          this.closeMenu();
        }
      });
      
      // Close menu when clicking a link
      const links = this.nav.querySelectorAll('.nav-link');
      links.forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth < 1024) {
            this.closeMenu();
          }
        });
      });
    }
  }

  toggleMenu() {
    this.nav.classList.toggle('active');
    const isOpen = this.nav.classList.contains('active');
    this.toggle.setAttribute('aria-expanded', isOpen);
    
    const spans = this.toggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '1';
      spans[2].style.transform = '';
    }
  }

  closeMenu() {
    this.nav.classList.remove('active');
    this.toggle.setAttribute('aria-expanded', 'false');
    const spans = this.toggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '1';
    spans[2].style.transform = '';
  }
}

// Dropdown Menu Handler
class DropdownMenu {
  constructor() {
    this.dropdowns = new Map();
    this.initDropdowns();
  }

  initDropdowns() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    
    dropdowns.forEach(dropdown => {
      // Skip if already initialized
      if (this.dropdowns.has(dropdown)) {
        return;
      }
      
      const link = dropdown.querySelector('.nav-link');
      const menu = dropdown.querySelector('.dropdown-menu');
      let hoverTimeout;
      
      if (link && menu) {
        const handlers = {
          mouseenter: () => {
            if (window.innerWidth >= 1024) {
              clearTimeout(hoverTimeout);
              dropdown.classList.add('active');
            }
          },
          mouseleave: () => {
            if (window.innerWidth >= 1024) {
              hoverTimeout = setTimeout(() => {
                dropdown.classList.remove('active');
              }, 150);
            }
          },
          click: (e) => {
            if (window.innerWidth < 1024) {
              e.preventDefault();
              dropdown.classList.toggle('active');
            }
          }
        };
        
        // Attach event listeners
        dropdown.addEventListener('mouseenter', handlers.mouseenter);
        dropdown.addEventListener('mouseleave', handlers.mouseleave);
        link.addEventListener('click', handlers.click);
        
        // Store handlers for potential cleanup
        this.dropdowns.set(dropdown, handlers);
      }
    });
  }
  
  reinit() {
    // Remove existing event listeners before reinitializing
    this.dropdowns.forEach((handlers, dropdown) => {
      const link = dropdown.querySelector('.nav-link');
      dropdown.removeEventListener('mouseenter', handlers.mouseenter);
      dropdown.removeEventListener('mouseleave', handlers.mouseleave);
      if (link) {
        link.removeEventListener('click', handlers.click);
      }
    });
    this.dropdowns.clear();
    this.initDropdowns();
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize mobile menu
  new MobileMenu();
  
  // Initialize dropdown menu
  window.dropdownMenu = new DropdownMenu();
  
  // Initialize typing animation if element exists
  if (document.getElementById('typed') && document.getElementById('typed-strings')) {
    new TypingAnimation('typed', 'typed-strings', {
      typeSpeed: 70,
      backSpeed: 50,
      backDelay: 2000,
      startDelay: 500,
      loop: true
    });
  }
  
  // Initialize counters
  const counterElements = document.querySelectorAll('[data-count]');
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const targetValue = element.getAttribute('data-count');
        if (targetValue && !element.dataset.animated) {
          element.dataset.animated = 'true';
          new CounterAnimation(element.id, targetValue, {
            duration: 2000
          });
        }
      }
    });
  }, observerOptions);
  
  counterElements.forEach(el => counterObserver.observe(el));
});

// Export for use in other scripts
window.TypingAnimation = TypingAnimation;
window.CounterAnimation = CounterAnimation;
window.ComponentLoader = ComponentLoader;
window.DropdownMenu = DropdownMenu;

