// Vanilla JS utilities for OfficiallySp.net

class TypingAnimation {
  constructor(elementId, stringsElementId, options = {}) {
    this.element = document.getElementById(elementId);
    this.stringsElement = document.getElementById(stringsElementId);
    if (!this.element || !this.stringsElement) return;

    this.strings = Array.from(this.stringsElement.children).map((el) => el.textContent);
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
    setTimeout(() => this.type(), this.startDelay);
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
    if (this.timeout) clearTimeout(this.timeout);
  }
}

class CounterAnimation {
  constructor(elementId, targetValue, options = {}) {
    this.element = document.getElementById(elementId);
    if (!this.element) return;

    this.targetValue = parseInt(targetValue, 10) || 0;
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
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(
        this.startValue + (this.targetValue - this.startValue) * easeOut
      );

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

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("typed") && document.getElementById("typed-strings")) {
    new TypingAnimation("typed", "typed-strings", {
      typeSpeed: 70,
      backSpeed: 50,
      backDelay: 2000,
      startDelay: 500,
      loop: true,
    });
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        const targetValue = element.getAttribute("data-count");
        if (targetValue && !element.dataset.animated) {
          element.dataset.animated = "true";
          new CounterAnimation(element.id, targetValue, { duration: 2000 });
        }
      });
    },
    { threshold: 0.5, rootMargin: "0px" }
  );

  document.querySelectorAll("[data-count]").forEach((el) => counterObserver.observe(el));
});

// AI usage badges + homepage legend
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
    desc: "AI autocomplete and inline tab completion suggestions. Code was still manually written.",
  },
  complementary: {
    label: "AI-Complementary",
    icon: "fa-handshake",
    cls: "ai-badge--complementary",
    desc: "Built working alongside an AI agent. Codebase is still manually written to and audited.",
  },
  autonomous: {
    label: "Fully Autonomous",
    icon: "fa-robot",
    cls: "ai-badge--autonomous",
    desc: "Built end-to-end by AI. Codebase is fully automated and generated by AI.",
  },
};

const PROJECT_AI_LEVELS = {
  chatstats: "none",
  summershowdown: "none",
  tftmixer: "none",
  wowlevelling: "none",
  sonicopus: "autonomous",
  destinyguessr: "assisted",
  lightledger: "complementary",
  beedle: "none",
  discordtools: "assisted",
  discompress: "complementary",
  polymorph: "complementary",
  scranorban: "complementary",
  promptimizer: "none",
  tankalot: "none",
  unite: "none",
  tpl: "none",
  tanklegacy: "none",
  firefly: "none",
  feathercord: "none",
  d2tools: "none",
  snapdesktop: "none",
  "sa2-mod-installer": "complementary",
  leagueredisplayed: "none",
  fpsickle: "none",
  lolannouncer: "none",
  clipperino: "none",
  riftrandomizer: "none",
  unboundmc: "autonomous",
  f3nope: "none",
  ism: "none",
  "alchemical-excellence": "none",
  comfirmations: "complementary",
  pedromap: "assisted",
  wowapm: "complementary",
  talentswapper: "autonomous",
  dropzone: "complementary",
  mmrcharts: "none",
  tankalotnet: "none",
  cards: "none",
  pyramid: "none",
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
  document.querySelectorAll(".project-card[data-project]").forEach((card) => {
    const badge = buildAiBadge(PROJECT_AI_LEVELS[card.getAttribute("data-project")], {
      corner: true,
    });
    if (badge) card.appendChild(badge);
  });

  const header = document.querySelector(".project-header");
  if (header) {
    const heading = header.querySelector("h1");
    const badge = buildAiBadge(PROJECT_AI_LEVELS[slugFromPath()]);
    if (badge && heading) {
      heading.insertAdjacentElement("afterend", badge);
    }
  }

  renderAiLegend();
}

document.addEventListener("DOMContentLoaded", initAiBadges);

window.TypingAnimation = TypingAnimation;
window.CounterAnimation = CounterAnimation;
window.ComponentLoader = ComponentLoader;
