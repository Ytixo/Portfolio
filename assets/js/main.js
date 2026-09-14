/**
 * ==============================================================================
 * LOGIQUE PRINCIPALE DU PORTFOLIO — NOAH BERTRAND
 * ==============================================================================
 * Gestion du rendu dynamique des projets, des filtres réactifs,
 * de la modal / lightbox interactive, du thème sombre/clair, et des animations.
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavbar();
  renderProjects();
  initProjectFilters();
  initProjectModal();
  initImageLightbox();
  renderSkills();
  renderTimeline();
  initContactActions();
});

/* ==============================================================================
   1. GESTION DU THÈME SOMBRE / CLAIR
   ============================================================================== */

function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const htmlRoot = document.documentElement;

  // Récupérer le thème sauvegardé (ou thème sombre sobre par défaut - Studio Minimaliste Dark)
  const savedTheme = localStorage.getItem("theme");
  let currentTheme = savedTheme || "dark";
  htmlRoot.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      currentTheme = htmlRoot.getAttribute("data-theme") === "dark" ? "light" : "dark";
      htmlRoot.setAttribute("data-theme", currentTheme);
      localStorage.setItem("theme", currentTheme);
      updateThemeIcon(currentTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById("theme-icon");
  if (!themeIcon) return;
  if (theme === "dark") {
    themeIcon.className = "fa-solid fa-sun";
  } else {
    themeIcon.className = "fa-solid fa-moon";
  }
}

/* ==============================================================================
   2. NAVBAR, SCROLL SPY & MENU MOBILE
   ============================================================================== */

function initNavbar() {
  const navbar = document.getElementById("navbar");
  const mobileToggle = document.getElementById("nav-mobile-toggle");
  const navLinks = document.getElementById("nav-links");
  const links = document.querySelectorAll(".nav-link");

  // Sticky navbar shadow & throttled scroll spy
  let scrollTicking = false;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        updateScrollSpy();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const icon = mobileToggle.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
      }
    });

    // Fermer le menu lors du clic sur un lien
    links.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        const icon = mobileToggle.querySelector("i");
        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-xmark");
        }
      });
    });
  }

  // Scroll spy
  function updateScrollSpy() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.scrollY + 200;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (scrollPosition >= top && scrollPosition < top + height) {
        links.forEach((l) => {
          l.classList.remove("active");
          if (l.getAttribute("href") === `#${id}`) {
            l.classList.add("active");
          }
        });
      }
    });
  }
}

/* ==============================================================================
   3. RENDU DYNAMIQUE DES PROJETS
   ============================================================================== */

let currentFilteredProjects = [];

function renderProjects(filter = "all") {
  const grid = document.getElementById("projects-grid");
  if (!grid || typeof PROJECTS_DATA === "undefined") return;

  grid.innerHTML = "";

  currentFilteredProjects = PROJECTS_DATA.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  if (currentFilteredProjects.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; margin-bottom: 1rem;"></i>
        <p>Aucun projet dans cette catégorie pour le moment.</p>
      </div>
    `;
    return;
  }

  currentFilteredProjects.forEach((proj) => {
    const card = createProjectCard(proj);
    grid.appendChild(card);
  });
}

function createProjectCard(proj) {
  const card = document.createElement("article");
  card.className = "project-card";
  card.setAttribute("data-id", proj.id);

  const thumbImg = proj.images && proj.images.length > 0 ? proj.images[0] : "assets/img/logo.png";
  const badgeClass = proj.badge === "En Production" ? "badge-prod" : "";

  // Génération des tags HTML
  const tagsHtml = proj.tags
    .slice(0, 4)
    .map((t) => `<span class="project-tag">${t}</span>`)
    .join("");

  // Liens d'action (icônes d'appoint pour les cartes standard sans page dédiée)
  let linksHtml = "";
  if (!proj.dedicatedPage) {
    if (proj.github) {
      linksHtml += `
        <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="icon-link-btn" title="Voir le code sur GitHub" aria-label="GitHub">
          <i class="fa-brands fa-github"></i>
        </a>`;
    }
    if (proj.demo) {
      linksHtml += `
        <a href="${proj.demo}" target="_blank" rel="noopener noreferrer" class="icon-link-btn" title="Tester la démo en ligne" aria-label="Site Web">
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>`;
    }
    if (proj.confidentialNote) {
      linksHtml += `
        <span class="icon-link-btn" title="${proj.confidentialNote}" aria-label="Projet Confidentiel" style="opacity: 0.7; cursor: help;">
          <i class="fa-solid fa-lock"></i>
        </span>`;
    }
  }

  const numImages = proj.images && proj.images.length > 0 ? proj.images.length : 0;

  card.innerHTML = `
    <div class="project-card-thumb" role="button" tabindex="0" title="Cliquer pour voir les captures en plein écran">
      <img src="${thumbImg}" alt="${proj.title}" class="project-card-img" loading="lazy">
      <span class="project-card-badge ${badgeClass}">${proj.badge || proj.categoryLabel}</span>
      <div class="thumb-hover-overlay">
        <span class="thumb-hover-btn">
          <i class="fa-solid fa-images"></i>
          <span>Voir les captures (${numImages})</span>
        </span>
      </div>
    </div>
    <div class="project-card-body">
      <div class="project-card-meta">
        <span class="project-category-tag">${proj.categoryLabel}</span>
        <span class="project-year">${proj.year}</span>
      </div>
      <h3 class="project-card-title">${proj.title}</h3>
      <p class="project-card-subtitle">${proj.subtitle}</p>
      <p class="project-card-desc">${proj.summary}</p>
      <div class="project-tags-list">${tagsHtml}</div>
      <div class="project-card-footer">
        ${proj.dedicatedPage ? `
          <a href="${proj.dedicatedPage}" class="btn btn-sm btn-primary" style="gap: 0.45rem;">
            <i class="fa-solid fa-server"></i>
            <span>Page Dédiée</span>
          </a>
          <button class="btn btn-sm btn-outline open-modal-btn" data-id="${proj.id}" title="Voir les détails complets">
            <span>Détails</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        ` : `
          <button class="btn btn-sm btn-outline open-modal-btn" data-id="${proj.id}">
            <span>Détails & Captures</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        `}
        ${linksHtml ? `<div class="project-links">${linksHtml}</div>` : ""}
      </div>
    </div>
  `;

  // Clic sur l'image ouvre la Lightbox plein écran avec slider
  const thumb = card.querySelector(".project-card-thumb");
  thumb.addEventListener("click", () => {
    if (proj.images && proj.images.length > 0) {
      openImageLightbox(proj.images, 0, proj.title);
    } else {
      openProjectModal(proj.id);
    }
  });
  thumb.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      if (proj.images && proj.images.length > 0) {
        openImageLightbox(proj.images, 0, proj.title);
      } else {
        openProjectModal(proj.id);
      }
    }
  });

  const openBtn = card.querySelector(".open-modal-btn");
  openBtn.addEventListener("click", () => openProjectModal(proj.id));

  return card;
}

/* ==============================================================================
   4. FILTRES DE CATÉGORIE AVEC COMPTEURS
   ============================================================================== */

function initProjectFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  if (!filterBtns || typeof PROJECTS_DATA === "undefined") return;

  // Calculer et afficher les compteurs
  const counts = {
    all: PROJECTS_DATA.length,
    systeme: PROJECTS_DATA.filter((p) => p.category === "systeme").length,
    academique: PROJECTS_DATA.filter((p) => p.category === "academique").length,
    reseau: PROJECTS_DATA.filter((p) => p.category === "reseau").length,
    logiciel: PROJECTS_DATA.filter((p) => p.category === "logiciel").length
  };

  filterBtns.forEach((btn) => {
    const filter = btn.getAttribute("data-filter");
    if (counts[filter] !== undefined) {
      const countSpan = document.createElement("span");
      countSpan.className = "filter-count";
      countSpan.textContent = counts[filter];
      btn.appendChild(countSpan);
    }

    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects(filter);
    });
  });
}

/* ==============================================================================
   5. MODAL PROJET (DEEP DIVE & LIGHTBOX SLIDER)
   ============================================================================== */

let activeProject = null;
let currentSlideIndex = 0;

function initProjectModal() {
  const backdrop = document.getElementById("project-modal-backdrop");
  const closeBtn = document.getElementById("modal-close-btn");
  const prevBtn = document.getElementById("modal-slider-prev");
  const nextBtn = document.getElementById("modal-slider-next");
  const sliderBox = document.getElementById("modal-slider-box");

  if (!backdrop) return;

  closeBtn.addEventListener("click", closeProjectModal);

  const footerCloseBtn = document.getElementById("modal-footer-close-btn");
  if (footerCloseBtn) footerCloseBtn.addEventListener("click", closeProjectModal);

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeProjectModal();
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!activeProject || !activeProject.images.length) return;
    currentSlideIndex = (currentSlideIndex - 1 + activeProject.images.length) % activeProject.images.length;
    updateModalSlide();
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!activeProject || !activeProject.images.length) return;
    currentSlideIndex = (currentSlideIndex + 1) % activeProject.images.length;
    updateModalSlide();
  });

  // Clic sur le diaporama de la modale ouvre le visualiseur plein écran
  if (sliderBox) {
    sliderBox.addEventListener("click", (e) => {
      if (e.target.closest(".slider-nav-btn") || e.target.closest(".modal-dot")) return;
      if (activeProject && activeProject.images && activeProject.images.length > 0) {
        openImageLightbox(activeProject.images, currentSlideIndex, activeProject.title);
      }
    });
    sliderBox.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        sliderBox.click();
      }
    });
  }

  // Navigation clavier
  document.addEventListener("keydown", (e) => {
    const lightbox = document.getElementById("image-lightbox");
    if (lightbox && lightbox.classList.contains("open")) return; // Priorité à la Lightbox si ouverte
    if (!backdrop.classList.contains("open")) return;
    if (e.key === "Escape") closeProjectModal();
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "ArrowRight") nextBtn.click();
  });
}

function openProjectModal(projectId) {
  const backdrop = document.getElementById("project-modal-backdrop");
  activeProject = PROJECTS_DATA.find((p) => p.id === projectId);
  if (!activeProject || !backdrop) return;

  currentSlideIndex = 0;

  // Titres
  document.getElementById("modal-title").textContent = activeProject.title;
  document.getElementById("modal-subtitle").textContent = `${activeProject.categoryLabel} • ${activeProject.subtitle} (${activeProject.year})`;

  // Description
  document.getElementById("modal-desc").textContent = activeProject.description;

  // Fonctionnalités
  const featList = document.getElementById("modal-features-list");
  featList.innerHTML = (activeProject.features || [])
    .map((f) => `<li><i class="fa-solid fa-check-circle"></i> <span>${f}</span></li>`)
    .join("");

  // Défis techniques
  const challengesList = document.getElementById("modal-challenges-list");
  challengesList.innerHTML = (activeProject.technicalChallenges || [])
    .map((c) => `<li><i class="fa-solid fa-cube"></i> <span>${c}</span></li>`)
    .join("");

  // Tags
  const tagsWrap = document.getElementById("modal-tags-wrap");
  tagsWrap.innerHTML = (activeProject.tags || [])
    .map((t) => `<span class="project-tag">${t}</span>`)
    .join("");

  // Liens d'action
  const actionsWrap = document.getElementById("modal-actions-wrap");
  let actionsHtml = "";
  if (activeProject.dedicatedPage) {
    actionsHtml += `
      <a href="${activeProject.dedicatedPage}" class="btn btn-sm btn-primary" style="background: linear-gradient(135deg, var(--primary), #0284c7); color: #fff;">
        <i class="fa-solid fa-server"></i> Page Dédiée de l'Infrastructure
      </a>`;
  }
  if (activeProject.github) {
    actionsHtml += `
      <a href="${activeProject.github}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary">
        <i class="fa-brands fa-github"></i> Voir le code GitHub
      </a>`;
  }
  if (activeProject.demo && activeProject.demo !== activeProject.dedicatedPage) {
    actionsHtml += `
      <a href="${activeProject.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary">
        <i class="fa-solid fa-globe"></i> Tester la démo en ligne
      </a>`;
  }
  if (activeProject.confidentialNote) {
    actionsHtml += `
      <span class="btn btn-sm btn-secondary" style="opacity: 0.9; cursor: default; border-color: rgba(244, 63, 94, 0.4); color: var(--text-main);" title="${activeProject.confidentialNote}">
        <i class="fa-solid fa-lock" style="color: #f43f5e;"></i> ${activeProject.confidentialNote}
      </span>`;
  }
  actionsWrap.innerHTML = actionsHtml;

  // Afficher la première capture
  updateModalSlide();

  backdrop.classList.add("open");
  document.body.style.overflow = "hidden"; // Bloque le scroll arrière-plan
}

function closeProjectModal() {
  const backdrop = document.getElementById("project-modal-backdrop");
  if (!backdrop) return;
  backdrop.classList.remove("open");
  document.body.style.overflow = "";
}

function updateModalSlide() {
  const slideImg = document.getElementById("modal-slide-img");
  const counter = document.getElementById("modal-slider-counter");
  const prevBtn = document.getElementById("modal-slider-prev");
  const nextBtn = document.getElementById("modal-slider-next");
  const dotsContainer = document.getElementById("modal-slider-dots");

  if (!activeProject || !activeProject.images || activeProject.images.length === 0) {
    slideImg.src = "assets/img/logo.png";
    counter.textContent = "0 / 0";
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
    if (dotsContainer) dotsContainer.innerHTML = "";
    return;
  }

  if (activeProject.images.length <= 1) {
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
  } else {
    prevBtn.style.display = "flex";
    nextBtn.style.display = "flex";
  }

  slideImg.src = activeProject.images[currentSlideIndex];
  slideImg.alt = `${activeProject.title} — capture ${currentSlideIndex + 1}`;
  counter.textContent = `${currentSlideIndex + 1} / ${activeProject.images.length}`;

  // Puces interactives
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    if (activeProject.images.length > 1) {
      activeProject.images.forEach((_, idx) => {
        const dot = document.createElement("button");
        dot.className = `modal-dot ${idx === currentSlideIndex ? "active" : ""}`;
        dot.setAttribute("aria-label", `Afficher l'image ${idx + 1}`);
        dot.addEventListener("click", (e) => {
          e.stopPropagation();
          currentSlideIndex = idx;
          updateModalSlide();
        });
        dotsContainer.appendChild(dot);
      });
    }
  }
}

/* ==============================================================================
   5.1 SYSTÈME DE VISUALISATION D'IMAGES & LIGHTBOX (SLIDER)
   ============================================================================== */

let lightboxImages = [];
let lightboxIndex = 0;
let lightboxTitle = "";
let touchStartX = 0;
let touchEndX = 0;

function initImageLightbox() {
  const lightbox = document.getElementById("image-lightbox");
  const overlay = document.getElementById("lightbox-overlay");
  const closeBtn = document.getElementById("lightbox-close-btn");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");
  const fsBtn = document.getElementById("lightbox-fullscreen-btn");
  const stage = document.querySelector(".lightbox-stage");

  if (!lightbox) return;

  if (closeBtn) closeBtn.addEventListener("click", closeImageLightbox);
  if (overlay) overlay.addEventListener("click", closeImageLightbox);

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (!lightboxImages.length) return;
      lightboxGoTo(lightboxIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (!lightboxImages.length) return;
      lightboxGoTo(lightboxIndex + 1);
    });
  }

  // Plein écran
  if (fsBtn) {
    fsBtn.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        lightbox.requestFullscreen?.().catch(() => {});
      } else {
        document.exitFullscreen?.().catch(() => {});
      }
    });

    document.addEventListener("fullscreenchange", () => {
      const fsIcon = document.getElementById("lightbox-fs-icon");
      if (fsIcon) {
        if (document.fullscreenElement) {
          fsIcon.className = "fa-solid fa-compress";
        } else {
          fsIcon.className = "fa-solid fa-expand";
        }
      }
    });
  }

  // Navigation clavier
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeImageLightbox();
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      lightboxGoTo(lightboxIndex - 1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      lightboxGoTo(lightboxIndex + 1);
    }
    if (e.key.toLowerCase() === "f") {
      fsBtn?.click();
    }
  });

  // Gestes tactiles (swipe mobile)
  if (stage) {
    stage.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    stage.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        lightboxGoTo(lightboxIndex - 1);
      } else {
        lightboxGoTo(lightboxIndex + 1);
      }
    }
  }
}

function openImageLightbox(images, startIndex = 0, title = "") {
  const lightbox = document.getElementById("image-lightbox");
  if (!lightbox || !images || images.length === 0) return;

  lightboxImages = Array.isArray(images) ? images : [images];
  lightboxIndex = Math.max(0, Math.min(startIndex, lightboxImages.length - 1));
  lightboxTitle = title || "Visualisation du Projet";

  const titleEl = document.getElementById("lightbox-title");
  if (titleEl) titleEl.textContent = lightboxTitle;

  renderLightboxThumbnails();
  renderLightboxSlide(false);

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeImageLightbox() {
  const lightbox = document.getElementById("image-lightbox");
  if (!lightbox) return;

  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");

  if (document.fullscreenElement) {
    document.exitFullscreen?.().catch(() => {});
  }

  // Rétablir le scroll si la modale de projet n'est pas ouverte
  const projectModal = document.getElementById("project-modal-backdrop");
  if (!projectModal || !projectModal.classList.contains("open")) {
    document.body.style.overflow = "";
  }
}

function lightboxGoTo(newIndex) {
  if (!lightboxImages.length) return;
  lightboxIndex = (newIndex + lightboxImages.length) % lightboxImages.length;
  renderLightboxSlide(true);
  updateActiveThumbnail();
}

function renderLightboxSlide(animate = true) {
  const imgEl = document.getElementById("lightbox-img");
  const counterEl = document.getElementById("lightbox-counter");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  if (!imgEl) return;

  if (counterEl) {
    counterEl.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
  }

  if (prevBtn && nextBtn) {
    const showBtns = lightboxImages.length > 1;
    prevBtn.style.display = showBtns ? "flex" : "none";
    nextBtn.style.display = showBtns ? "flex" : "none";
  }

  if (animate) {
    imgEl.classList.add("fade-out");
    setTimeout(() => {
      imgEl.src = lightboxImages[lightboxIndex];
      imgEl.alt = `${lightboxTitle} — Capture ${lightboxIndex + 1}`;
      imgEl.classList.remove("fade-out");
    }, 150);
  } else {
    imgEl.src = lightboxImages[lightboxIndex];
    imgEl.alt = `${lightboxTitle} — Capture ${lightboxIndex + 1}`;
  }
}

function renderLightboxThumbnails() {
  const track = document.getElementById("lightbox-thumbnails-track");
  if (!track) return;

  track.innerHTML = "";
  if (lightboxImages.length <= 1) {
    track.style.display = "none";
    return;
  }
  track.style.display = "flex";

  lightboxImages.forEach((src, idx) => {
    const thumb = document.createElement("div");
    thumb.className = `lightbox-thumb-item ${idx === lightboxIndex ? "active" : ""}`;
    thumb.setAttribute("role", "button");
    thumb.setAttribute("tabindex", "0");
    thumb.setAttribute("aria-label", `Afficher l'image ${idx + 1}`);

    const img = document.createElement("img");
    img.src = src;
    img.alt = `Miniature ${idx + 1}`;
    img.loading = "lazy";

    thumb.appendChild(img);

    thumb.addEventListener("click", () => lightboxGoTo(idx));
    thumb.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") lightboxGoTo(idx);
    });

    track.appendChild(thumb);
  });
}

function updateActiveThumbnail() {
  const thumbs = document.querySelectorAll(".lightbox-thumb-item");
  thumbs.forEach((t, idx) => {
    t.classList.toggle("active", idx === lightboxIndex);
    if (idx === lightboxIndex) {
      t.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  });
}

/* ==============================================================================
   6. RENDU DES COMPÉTENCES & BENTO
   ============================================================================== */

function renderSkills() {
  const langsContainer = document.getElementById("skills-languages-list");
  const toolsContainer = document.getElementById("skills-tools-list");
  const methodsContainer = document.getElementById("skills-methods-list");

  if (!langsContainer || typeof SKILLS_DATA === "undefined") return;

  // Langages
  langsContainer.innerHTML = SKILLS_DATA.languages
    .map(
      (l) => `
      <div class="skill-row">
        <div class="skill-info">
          <i class="${l.icon}"></i>
          <div class="skill-text">
            <h5>${l.name}</h5>
            <p>${l.desc}</p>
          </div>
        </div>
        <span class="skill-badge">${l.level}</span>
      </div>
    `
    )
    .join("");

  // Outils
  toolsContainer.innerHTML = SKILLS_DATA.tools
    .map(
      (t) => `
      <div class="skill-row">
        <div class="skill-info">
          <i class="${t.icon}"></i>
          <div class="skill-text">
            <h5>${t.name}</h5>
            <p>${t.desc}</p>
          </div>
        </div>
      </div>
    `
    )
    .join("");

  // Méthodologies
  methodsContainer.innerHTML = SKILLS_DATA.methodologies
    .map(
      (m) => `
      <div class="skill-row">
        <div class="skill-info">
          <i class="fa-solid fa-check"></i>
          <div class="skill-text">
            <h5>${m.title}</h5>
            <p>${m.desc}</p>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

/* ==============================================================================
   7. RENDU DE LA FORMATION & EXPÉRIENCES
   ============================================================================== */

function renderTimeline() {
  const timelineTrack = document.getElementById("formation-timeline");
  const expTrack = document.getElementById("experiences-timeline");

  if (timelineTrack && typeof TIMELINE_DATA !== "undefined") {
    timelineTrack.innerHTML = TIMELINE_DATA.map(
      (item) => `
        <div class="timeline-card-item">
          <div class="timeline-point"></div>
          <div class="timeline-box">
            <div class="timeline-header-meta">
              <span class="timeline-date">${item.period}</span>
              <span class="skill-badge">${item.badge}</span>
            </div>
            <h4>${item.title}</h4>
            <p class="timeline-institution"><i class="fa-solid fa-graduation-cap"></i> ${item.institution} — <em>${item.subtitle}</em></p>
            <p class="timeline-desc">${item.desc}</p>
            <div class="timeline-skills-tags">
              ${(item.skillsLearned || []).map((s) => `<span class="project-tag">${s}</span>`).join("")}
            </div>
          </div>
        </div>
      `
    ).join("");
  }

  if (expTrack && typeof EXPERIENCES_DATA !== "undefined") {
    expTrack.innerHTML = EXPERIENCES_DATA.map(
      (exp) => `
        <div class="timeline-card-item">
          <div class="timeline-point" style="background: var(--accent-cyan); box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.4);"></div>
          <div class="timeline-box">
            <div class="timeline-header-meta">
              <span class="timeline-date" style="color: var(--primary);">${exp.period}</span>
              <span class="skill-badge" style="background: var(--accent-cyan-bg); color: var(--accent-cyan);">${exp.type}</span>
            </div>
            <h4>${exp.role}</h4>
            <p class="timeline-institution"><i class="fa-solid fa-briefcase"></i> ${exp.company}</p>
            <p class="timeline-desc">${exp.desc}</p>
          </div>
        </div>
      `
    ).join("");
  }
}

/* ==============================================================================
   8. ACTIONS CONTACT & COPIE D'EMAIL AVEC TOAST
   ============================================================================== */

function initContactActions() {
  const copyBtn = document.getElementById("copy-email-card");
  if (!copyBtn) return;

  const getEmail = () => (typeof PROFILE_DATA !== "undefined" && PROFILE_DATA.email) || "luzrobertrand@gmail.com";

  copyBtn.addEventListener("click", () => {
    const email = getEmail();
    navigator.clipboard.writeText(email).then(() => {
      showToast(`Email copié dans le presse-papier ! (${email})`);
    }).catch(() => {
      // Fallback
      showToast(`Email : ${email}`);
    });
  });

  copyBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      copyBtn.click();
    }
  });
}

function showToast(message) {
  let toastContainer = document.querySelector(".toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  // Animation apparition
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  // Disparition après 3.2s
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
