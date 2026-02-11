/**
 * OfficiallySp Bar with Quickswitcher
 * Add to any project: <script src="https://officiallysp.net/assets/js/officiallysp-bar.js" data-accent="#6366f1"></script>
 */
(function () {
  const PROJECTS = [
    { name: "Home", url: "https://officiallysp.net" },
    { name: "TFT Mixer", url: "https://tftmixer.officiallysp.net" },
    { name: "Beedle", url: "https://beedle.officiallysp.net" },
    { name: "DestinyGuessr", url: "https://destinyguessr.officiallysp.net" },
    { name: "Discord Tools", url: "https://discordtools.officiallysp.net" },
    { name: "Polymorph", url: "https://polymorph.officiallysp.net" },
    { name: "WoW Levelling", url: "https://wowlevelling.officiallysp.net" },
    { name: "GPT 4o Legacy", url: "https://4oever.officiallysp.net" },
    { name: "ChatStats.live", url: "https://chatstats.live" },
    { name: "Summer Showdown", url: "https://summershowdown.live" },
  ];

  const accent = document.currentScript?.getAttribute("data-accent") || "#6366f1";

  function ensureCSS() {
    if (!document.querySelector('link[href*="design-tokens.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://officiallysp.net/assets/css/design-tokens.css";
      document.head.appendChild(link);
    }
  }

  function createBar() {
    const wrapper = document.createElement("div");
    wrapper.className = "os-bar-wrapper";
    wrapper.style.setProperty("--os-accent", accent);

    const homeLink = document.createElement("a");
    homeLink.href = "https://officiallysp.net";
    homeLink.className = "officiallysp-bar os-bar-home";
    homeLink.setAttribute("aria-label", "OfficiallySp.net – Home");
    homeLink.innerHTML = '<span class="os-icon">◀</span><span class="os-accent">OfficiallySp.net</span>';

    const qs = document.createElement("div");
    qs.className = "os-quickswitcher";
    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "os-qs-trigger";
    trigger.setAttribute("aria-haspopup", "true");
    trigger.setAttribute("aria-expanded", "false");
    trigger.innerHTML = 'Projects <span class="os-qs-chevron">▼</span>';
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = qs.classList.toggle("os-qs-open");
      trigger.setAttribute("aria-expanded", open);
    });

    const dropdown = document.createElement("div");
    dropdown.className = "os-qs-dropdown";
    dropdown.setAttribute("role", "menu");
    PROJECTS.forEach((p) => {
      const a = document.createElement("a");
      a.href = p.url;
      a.textContent = p.name;
      a.setAttribute("role", "menuitem");
      dropdown.appendChild(a);
    });

    qs.appendChild(trigger);
    qs.appendChild(dropdown);
    wrapper.appendChild(homeLink);
    wrapper.appendChild(qs);
    return wrapper;
  }

  function init() {
    const existing = document.querySelector(".officiallysp-bar, .os-bar-wrapper");
    if (existing?.closest(".os-bar-wrapper")) return;
    if (existing) existing.remove();

    ensureCSS();
    const bar = createBar();
    document.body.insertBefore(bar, document.body.firstChild);

    document.addEventListener("click", () => {
      document.querySelectorAll(".os-quickswitcher.os-qs-open").forEach((el) => {
        el.classList.remove("os-qs-open");
        el.querySelector("button")?.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const qs = document.querySelector(".os-quickswitcher");
        if (qs) {
          const open = qs.classList.toggle("os-qs-open");
          qs.querySelector("button")?.setAttribute("aria-expanded", open);
        }
      }
      if (e.key === "Escape") {
        document.querySelectorAll(".os-quickswitcher.os-qs-open").forEach((el) => {
          el.classList.remove("os-qs-open");
          el.querySelector("button")?.setAttribute("aria-expanded", "false");
        });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
