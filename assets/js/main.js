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
        
        // Initialize or reinitialize dropdowns after loading navbar
        if (targetId === 'navbar-container') {
          setTimeout(() => {
            if (window.dropdownMenu) {
              window.dropdownMenu.reinit();
            } else {
              // If DropdownMenu hasn't been initialized yet, create it
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
          if (window.innerWidth < 992) {
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
    // Clear existing handlers and reinitialize
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

// ============================================================
// AI Usage Badges + Legend
// ------------------------------------------------------------
// One place to manage "how much AI was used" across the site.
//
//   AI_LEVELS         - the four levels: label, icon, colour class and the
//                       definition shown in the homepage legend.
//   PROJECT_AI_LEVELS - the level for each project. To correct a project,
//                       change its value to one of:
//                       'none' | 'assisted' | 'complementary' | 'autonomous'
//
// Homepage cards get an icon-only corner badge (hover for the label).
// Project detail pages (pages/*.html) get a full icon + label badge under
// the title - identified automatically by the page file name, so no
// per-page edits are needed. The homepage legend (#ai-legend) is generated
// from AI_LEVELS, so it always matches the badges.
// ============================================================

const AI_LEVELS = {
  none: {
    label: "No AI",
    icon: "fa-pen-nib",
    cls: "ai-badge--none",
    desc: "No AI was used in the creation of this project.",
  },
  assisted: {
    label: "AI-Assisted",
    icon: "fa-wand-magic-sparkles",
    cls: "ai-badge--assisted",
    desc: "AI autocomplete and inline tab completion suggestions, Code was still manually written.",
  },
  complementary: {
    label: "AI-Complementary",
    icon: "fa-handshake",
    cls: "ai-badge--complementary",
    desc: "Built working alongside an AI agent. Codebase is still manually written to and audited",
  },
  autonomous: {
    label: "Fully Autonomous",
    icon: "fa-robot",
    cls: "ai-badge--autonomous",
    desc: "Built end-to-end by AI. Codebase is fully automated and generated by AI.",
  },
};

// DRAFT assignments - best-guess starting point, please correct.
const PROJECT_AI_LEVELS = {
  // Web Projects
  chatstats: "none",
  summershowdown: "none",
  tftmixer: "none",
  wowlevelling: "none",
  sonicopus: "autonomous", // "built with Claude Opus"
  destinyguessr: "assisted",
  lightledger: "complementary",
  beedle: "none",
  discordtools: "assisted",
  discompress: "complementary", // detail page behind the Discord Tools card
  polymorph: "complementary",
  scranorban: "complementary",
  promptimizer: "none",
  // Games
  tankalot: "none",
  unite: "none",
  tpl: "none",
  tanklegacy: "none",
  // Electron Apps
  firefly: "none",
  feathercord: "none",
  d2tools: "none",
  snapdesktop: "none",
  "sa2-mod-installer": "complementary",
  // Python Apps
  fpsickle: "none",
  lolannouncer: "none",
  clipperino: "none",
  // C# Apps
  riftrandomizer: "none",
  unboundmc: "autonomous", // built end-to-end with AI (Avalonia)
  // Mods
  f3nope: "none",
  ism: "none",
  "alchemical-excellence": "none",
  // Extras
  mmrcharts: "none",
  tankalotnet: "none",
  cards: "none",
  pyramid: "none",
  // Other detail pages (not currently on the homepage)
  pedromap: "assisted",
  pekspuzzle: "none",
  potato: "none",
  shadestories: "none",
  valentine24: "none",
  valentine25: "none",
  valentine26: "none",
  valentine26amy: "none",
  valentine26jake: "none",
};

function buildAiBadge(levelKey, options = {}) {
  const level = AI_LEVELS[levelKey];
  if (!level) return null;

  const badge = document.createElement("span");
  badge.className = "ai-badge " + level.cls + (options.corner ? " ai-badge--corner" : "");
  badge.setAttribute("title", "AI usage: " + level.label);
  badge.setAttribute("aria-label", "AI usage: " + level.label);

  const icon = document.createElement("i");
  icon.className = "fa-solid " + level.icon;
  badge.appendChild(icon);

  if (!options.corner) {
    badge.appendChild(document.createTextNode(" " + level.label));
  }
  return badge;
}

function slugFromPath() {
  const file = window.location.pathname.split("/").pop() || "";
  return file.replace(/\.html?$/i, "");
}

function renderAiLegend() {
  const container = document.getElementById("ai-legend");
  if (!container) return;

  Object.keys(AI_LEVELS).forEach((key) => {
    const item = document.createElement("div");
    item.className = "ai-legend-item";

    const badge = buildAiBadge(key);
    if (badge) item.appendChild(badge);

    const p = document.createElement("p");
    p.textContent = AI_LEVELS[key].desc;
    item.appendChild(p);

    container.appendChild(item);
  });
}

function initAiBadges() {
  // Homepage cards: icon-only corner badge
  document.querySelectorAll(".project-card[data-project]").forEach((card) => {
    const badge = buildAiBadge(PROJECT_AI_LEVELS[card.getAttribute("data-project")], { corner: true });
    if (badge) card.appendChild(badge);
  });

  // Project detail page: full labelled badge under the title
  const header = document.querySelector(".project-header");
  if (header) {
    const heading = header.querySelector("h1");
    const badge = buildAiBadge(PROJECT_AI_LEVELS[slugFromPath()]);
    if (badge && heading) {
      heading.insertAdjacentElement("afterend", badge);
    }
  }

  // Homepage legend
  renderAiLegend();
}

document.addEventListener("DOMContentLoaded", initAiBadges);

// Export for use in other scripts
window.TypingAnimation = TypingAnimation;
window.CounterAnimation = CounterAnimation;
window.ComponentLoader = ComponentLoader;
window.DropdownMenu = DropdownMenu;

