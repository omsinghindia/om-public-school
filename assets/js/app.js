/**
 * Om Public School - Master Application Controller (PRD v2.0 Specification)
 * Full interactive suite for Home, About, Academics, Admissions, Notices, Gallery
 */

document.addEventListener("DOMContentLoaded", () => {
  let currentLang = "en";
  let activeNewsCat = "all";
  let activeNoticeCat = "all";
  let activeGalleryCat = "all";
  let currentLightboxIdx = 0;
  let publishedNotices = [];

  /* ==========================================================================
     1. HOMEPAGE: ANNOUNCEMENTS TICKER
     ========================================================================== */
  const announcementsTrack = document.getElementById("announcements-track");
  if (announcementsTrack && schoolData.announcements) {
    announcementsTrack.innerHTML = schoolData.announcements
      .map(
        (item) => `
      <span class="ticker-bullet-item" onclick="switchPage('${item.link}')">
        ${item.title}
      </span>
    `
      )
      .join("");
  }

  /* ==========================================================================
     2. HOMEPAGE: OUR PROGRAMS (5 STAGE CARDS)
     ========================================================================== */
  const progContainer = document.getElementById("programs-container");
  if (progContainer && schoolData.programs) {
    progContainer.innerHTML = schoolData.programs
      .map(
        (prog) => `
      <div class="program-level-card" onclick="openAcademicStage('${prog.id}')">
        <div class="program-icon-badge ${prog.badgeClass}">
          ${prog.icon}
        </div>
        <div>
          <h3 class="prog-name">${prog.name}</h3>
          <p class="prog-tagline">${prog.tagline}</p>
        </div>
      </div>
    `
      )
      .join("");
  }

  /* ==========================================================================
     3. HOMEPAGE: NEWS & UPDATES (TABBED WIDGET)
     ========================================================================== */
  function formatDisplayDate(dStr) {
    if (!dStr) return "Official Circular";
    try {
      const d = new Date(dStr);
      if (isNaN(d.getTime())) return dStr;
      return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    } catch {
      return String(dStr).slice(0, 10);
    }
  }

  function renderNews(cat) {
    activeNewsCat = cat;
    const newsContainer = document.getElementById("news-list-container");

    document.querySelectorAll(".btn-news-filter").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.cat === cat);
    });

    const liveItems = (publishedNotices || []).map((n) => ({
      id: n.id,
      title: n.title,
      date: formatDisplayDate(n.date),
      category: n.category || "Notices",
      color: n.important ? "#dc2626" : "#0284c7",
      excerpt: n.shortDescription || n.description || n.title
    }));

    let baseItems = schoolData.newsItems[cat] || schoolData.newsItems.all || [];
    let items = [];

    if (liveItems.length > 0) {
      if (cat === "all") {
        items = [...liveItems, ...baseItems];
      } else {
        const matching = liveItems.filter((item) => item.category.toLowerCase().includes(cat.toLowerCase()));
        items = matching.length > 0 ? [...matching, ...baseItems] : baseItems;
      }
    } else {
      items = baseItems;
    }

    if (newsContainer) {
      newsContainer.innerHTML = items
        .map(
          (item) => `
        <div class="news-thumb-item" onclick="openDocModal('${item.id}')">
          <div class="news-img-box" style="background:${item.color};">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
            </svg>
          </div>
          <div class="news-thumb-info">
            <h4 class="news-thumb-headline">${item.title}</h4>
            <div class="news-thumb-date">${item.date} • <span style="color:#f59e0b; font-weight:700;">${item.category}</span></div>
          </div>
        </div>
      `
        )
        .join("");
    }
  }

  renderNews("all");

  document.querySelectorAll("#news-filter-tabs .btn-news-filter").forEach((btn) => {
    btn.addEventListener("click", () => {
      renderNews(btn.dataset.cat);
    });
  });

  /* ==========================================================================
     4. HOMEPAGE: PHOTO GALLERY (6 GRID)
     ========================================================================== */
  const homeGallery = document.getElementById("gallery-homepage-grid");
  if (homeGallery && schoolData.galleryPhotos) {
    homeGallery.innerHTML = schoolData.galleryPhotos.slice(0, 6)
      .map(
        (photo, idx) => `
      <div class="gallery-grid-img" style="background:${photo.color}; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fff; text-align:center; padding:6px;" onclick="openLightbox(${idx})">
        <span style="font-size:1.4rem; margin-bottom:2px;">${photo.icon}</span>
        <span style="font-size:0.72rem; font-weight:700; background:rgba(0,0,0,0.45); padding:2px 6px; border-radius:3px; max-width:90%;">${photo.title}</span>
      </div>
    `
      )
      .join("");
  }

  /* ==========================================================================
     5. HOMEPAGE: STUDENT LIFE (4 CARDS)
     ========================================================================== */
  const studentLifeContainer = document.getElementById("student-life-container");
  if (studentLifeContainer && schoolData.studentLife) {
    studentLifeContainer.innerHTML = schoolData.studentLife
      .map(
        (item) => `
      <div class="life-item-card" onclick="switchPage('view-gallery')">
        <div class="life-icon-wrap">${item.icon}</div>
        <h4 class="life-card-name">${item.title}</h4>
        <span class="life-card-caption">${item.sub}</span>
      </div>
    `
      )
      .join("");
  }

  /* ==========================================================================
     6. HOMEPAGE: PARTNERS STRIP
     ========================================================================== */
  const partnersContainer = document.getElementById("partners-container");
  if (partnersContainer && schoolData.partners) {
    partnersContainer.innerHTML = schoolData.partners
      .map(
        (p) => `
      <div class="partner-logo-item">
        <div class="partner-circle-emblem">${p.name.substring(0, 4)}</div>
        <span class="partner-label">${p.name}</span>
        <span style="font-size:0.7rem; color:#64748b;">${p.sub}</span>
      </div>
    `
      )
      .join("");
  }

  /* ==========================================================================
     7. ABOUT US: WHY CHOOSE US (4 CARDS)
     ========================================================================== */
  const whyGrid = document.getElementById("why-choose-us-grid");
  if (whyGrid && schoolData.whyChooseUs) {
    whyGrid.innerHTML = schoolData.whyChooseUs
      .map(
        (item) => `
      <div style="background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:1.25rem; text-align:center; box-shadow:var(--shadow-sm);">
        <div style="font-size:2rem; margin-bottom:0.5rem;">${item.icon}</div>
        <h4 style="font-size:0.95rem; font-weight:800; color:#0b2545; margin-bottom:0.35rem;">${item.title}</h4>
        <p style="font-size:0.82rem; color:#64748b; line-height:1.5;">${item.desc}</p>
      </div>
    `
      )
      .join("");
  }

  /* ==========================================================================
     8. ACADEMICS: STREAMS & STAGE TABS
     ========================================================================== */
  const streamsGrid = document.getElementById("academics-streams-grid");
  const streamsDetailList = document.getElementById("acad-streams-detail-list");
  if (streamsGrid && schoolData.streams) {
    streamsGrid.innerHTML = schoolData.streams
      .map(
        (s) => `
      <div style="background:${s.bgColor}; border:1px solid ${s.borderColor}; border-radius:10px; padding:1.25rem;">
        <h5 style="font-size:1.05rem; font-weight:800; color:${s.color}; margin-bottom:0.25rem;">${s.name}</h5>
        <div style="font-size:0.78rem; font-weight:700; color:#475569; margin-bottom:0.5rem;">${s.group}</div>
        <p style="font-size:0.82rem; color:#334155; margin-bottom:0.75rem;">${s.description}</p>
        <div style="font-size:0.76rem; color:#64748b;"><strong>Subjects:</strong> ${s.subjects.join(", ")}</div>
      </div>
    `
      )
      .join("");
  }

  if (streamsDetailList && schoolData.streams) {
    streamsDetailList.innerHTML = schoolData.streams
      .map(
        (s) => `
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:1rem;">
        <h4 style="font-weight:800; color:${s.color}; margin-bottom:0.35rem;">${s.name} (${s.group})</h4>
        <ul style="padding-left:1.2rem; list-style:disc; font-size:0.84rem; color:#334155;">
          ${s.subjects.map((sub) => `<li>${sub}</li>`).join("")}
        </ul>
      </div>
    `
      )
      .join("");
  }

  window.openAcademicStage = function (stageId) {
    switchPage("view-academics");
    const prog = schoolData.programs.find((p) => p.id === stageId);
    if (prog) {
      document.querySelectorAll("#acad-stage-tabs .btn-news-filter").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.stage === stageId);
      });
      const nameEl = document.getElementById("stage-detail-name");
      const descEl = document.getElementById("stage-detail-desc");
      if (nameEl) nameEl.textContent = prog.name;
      if (descEl) descEl.textContent = prog.description;
    }
  };

  document.querySelectorAll("#acad-stage-tabs .btn-news-filter").forEach((btn) => {
    btn.addEventListener("click", () => {
      openAcademicStage(btn.dataset.stage);
    });
  });

  // Academics Sidebar Switcher
  document.querySelectorAll("#view-academics .sidebar-menu-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#view-academics .sidebar-menu-item").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      document.querySelectorAll("#view-academics .subpage-tab-content").forEach((panel) => panel.classList.remove("active"));
      const target = document.getElementById(btn.dataset.tabTarget);
      if (target) target.classList.add("active");
    });
  });

  /* ==========================================================================
     9. ADMISSIONS: ELIGIBILITY & FEES TABLES + FAQS + SIDEBAR
     ========================================================================== */
  const eligTable = document.getElementById("eligibility-table");
  if (eligTable && schoolData.eligibility) {
    eligTable.innerHTML = `
      <thead>
        <tr>
          <th>Class / Grade</th>
          <th>Age Criteria (as of 31st March)</th>
          <th>Required Documents</th>
        </tr>
      </thead>
      <tbody>
        ${schoolData.eligibility
          .map(
            (row) => `
          <tr>
            <td style="font-weight:700; color:#0b2545;">${row.class}</td>
            <td>${row.age}</td>
            <td>${row.doc}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    `;
  }

  const feesTable = document.getElementById("fees-table");
  if (feesTable && schoolData.feeStructure) {
    feesTable.innerHTML = `
      <thead>
        <tr>
          <th>Class / Level</th>
          <th>Monthly Tuition</th>
          <th>Admission Fee (One-Time)</th>
          <th>Annual Lab & Tech Fee</th>
        </tr>
      </thead>
      <tbody>
        ${schoolData.feeStructure
          .map(
            (row) => `
          <tr>
            <td style="font-weight:700; color:#0b2545;">${row.level}</td>
            <td style="color:#d97706; font-weight:700;">${row.tuition}</td>
            <td>${row.admission}</td>
            <td>${row.lab}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    `;
  }

  const faqsContainer = document.getElementById("faqs-accordion-container");
  if (faqsContainer && schoolData.faqs) {
    faqsContainer.innerHTML = schoolData.faqs
      .map(
        (faq, idx) => `
      <div class="faq-accordion-item ${idx === 0 ? "open" : ""}">
        <button class="faq-question-btn">
          <span>${faq.q}</span>
          <span class="faq-chevron">▾</span>
        </button>
        <div class="faq-answer-panel">
          ${faq.a}
        </div>
      </div>
    `
      )
      .join("");

    document.querySelectorAll(".faq-question-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const parent = btn.parentElement;
        parent.classList.toggle("open");
      });
    });
  }

  // Admissions Sidebar Switcher
  document.querySelectorAll("#view-admissions .sidebar-menu-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#view-admissions .sidebar-menu-item").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      document.querySelectorAll("#view-admissions .subpage-tab-content").forEach((panel) => panel.classList.remove("active"));
      const target = document.getElementById(btn.dataset.tabTarget);
      if (target) target.classList.add("active");
    });
  });

  /* ==========================================================================
     10. NOTICES & CIRCULARS: DYNAMIC NOTICE MANAGEMENT (GOOGLE SHEETS INTEGRATED)
     ========================================================================== */
  async function loadDynamicNotices() {
    const tableContainer = document.getElementById("notices-table-container");
    if (tableContainer) {
      tableContainer.innerHTML = `
        <div style="padding:2.5rem 1rem; text-align:center; color:#64748b;">
          <div style="font-size:1.8rem; margin-bottom:0.5rem;">⏳</div>
          <div style="font-weight:700; color:#0b2545;">Loading official school notices...</div>
          <span style="font-size:0.8rem; color:#94a3b8;">Retrieving published circulars</span>
        </div>
      `;
    }

    try {
      publishedNotices = await ApiService.getPublishedNotices();
      renderNoticesTable();
      syncHomepageAnnouncements();
      renderNews(activeNewsCat);
    } catch (err) {
      console.warn("Notice loading error:", err);
      if (tableContainer) {
        tableContainer.innerHTML = `
          <div style="padding:2rem; text-align:center; color:#b91c1c;">
            <p><strong>Unable to load notices at this moment.</strong></p>
            <span style="font-size:0.82rem; color:#64748b;">${err.message || "Please refresh or try again later."}</span>
          </div>
        `;
      }
    }
  }

  function renderNoticesTable() {
    const tableContainer = document.getElementById("notices-table-container");
    if (!tableContainer) return;

    const query = (document.getElementById("notices-search-field")?.value || "").toLowerCase().trim();

    let filtered = publishedNotices.length > 0 ? publishedNotices : (schoolData.noticesList || []);

    if (activeNoticeCat === "Important") {
      filtered = filtered.filter((n) => n.important === true);
    } else if (activeNoticeCat !== "all") {
      filtered = filtered.filter(
        (n) => n.category && n.category.toLowerCase() === activeNoticeCat.toLowerCase()
      );
    }

    if (query) {
      filtered = filtered.filter((n) => {
        const titleMatch = n.title && n.title.toLowerCase().includes(query);
        const descMatch = (n.description || n.desc || n.shortDescription || "").toLowerCase().includes(query);
        const catMatch = n.category && n.category.toLowerCase().includes(query);
        return titleMatch || descMatch || catMatch;
      });
    }

    if (filtered.length === 0) {
      tableContainer.innerHTML = `
        <div style="padding:3rem 1.5rem; text-align:center; color:#64748b;">
          <div style="font-size:2rem; margin-bottom:0.5rem;">📋</div>
          <h4 style="font-size:1.05rem; font-weight:700; color:#0b2545; margin-bottom:0.25rem;">No Notices Found</h4>
          <p style="font-size:0.85rem;">No published notices found matching your criteria. Try choosing 'All Notices' or clearing your search.</p>
        </div>
      `;
      return;
    }

    tableContainer.innerHTML = filtered
      .map((n) => {
        const isImportant = n.important ? `<span class="notice-priority-badge">⭐ Priority</span>` : "";
        const descText = n.shortDescription || n.desc || (n.description ? n.description.substring(0, 120) + "..." : "");
        const rowClass = n.important ? "notices-row is-important" : "notices-row";
        const dateStr = formatDisplayDate(n.date);
        const pdfBtn = n.fileUrl
          ? `<a href="${n.fileUrl}" target="_blank" class="btn-notice-action btn-notice-pdf" title="Download official document">📄 Download PDF</a>`
          : "";

        return `
          <div class="${rowClass}">
            <div style="flex:1;">
              <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:4px; flex-wrap:wrap;">
                <span style="font-size:0.7rem; font-weight:800; background:#fef3c7; color:#92400e; padding:2px 8px; border-radius:3px; text-transform:uppercase;">
                  ${n.category}
                </span>
                ${isImportant}
              </div>
              <h4 style="font-weight:800; font-size:0.96rem; color:#0b2545; margin:3px 0 3px 0;">
                ${n.title}
              </h4>
              <p style="font-size:0.83rem; color:#475569; margin-bottom:4px; line-height:1.45;">
                ${descText}
              </p>
              <div style="font-size:0.75rem; color:#64748b;">📅 Published: ${dateStr}</div>
            </div>
            <div class="notice-btn-wrap">
              <button class="btn-notice-action btn-notice-details" onclick="openDocModal('${n.id}')">
                👁️ View Details
              </button>
              ${pdfBtn}
            </div>
          </div>
        `;
      })
      .join("");
  }

  function syncHomepageAnnouncements() {
    const track = document.getElementById("announcements-track");
    if (track && publishedNotices.length > 0) {
      track.innerHTML = publishedNotices
        .slice(0, 5)
        .map(
          (n) => `
          <span class="ticker-bullet-item" onclick="switchPage('view-notices')">
            ${n.important ? "⭐ " : ""}${n.title}
          </span>
        `
        )
        .join("");
    }
  }

  loadDynamicNotices();

  document.querySelectorAll("#notices-category-menu .sidebar-menu-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#notices-category-menu .sidebar-menu-item").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeNoticeCat = btn.dataset.noticeCat;
      renderNoticesTable();
    });
  });

  document.getElementById("notices-search-field")?.addEventListener("input", renderNoticesTable);

  /* ==========================================================================
     11. GALLERY PAGE: CATEGORY FILTERING & ALBUMS
     ========================================================================== */
  function renderGalleryAlbums() {
    const container = document.getElementById("gallery-albums-container");
    let list = schoolData.galleryPhotos;
    if (activeGalleryCat !== "all") {
      list = list.filter((p) => p.category.toLowerCase() === activeGalleryCat.toLowerCase());
    }

    if (container) {
      container.innerHTML = list
        .map(
          (p, idx) => `
        <div style="background:#fff; border:1px solid #e2e8f0; border-radius:10px; overflow:hidden; box-shadow:var(--shadow-sm); cursor:pointer; transition:var(--transition);" onclick="openLightbox(${idx})">
          <div style="height:160px; background:${p.color}; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fff;">
            <span style="font-size:2.5rem; margin-bottom:0.25rem;">${p.icon}</span>
            <span style="font-size:0.78rem; font-weight:800; background:rgba(0,0,0,0.4); padding:2px 8px; border-radius:4px;">${p.category}</span>
          </div>
          <div style="padding:1rem;">
            <h4 style="font-size:0.92rem; font-weight:800; color:#0b2545; margin-bottom:0.25rem;">${p.title}</h4>
            <p style="font-size:0.78rem; color:#64748b; line-height:1.4; margin-bottom:0.5rem;">${p.desc}</p>
            <span style="font-size:0.72rem; color:#f59e0b; font-weight:700;">📅 ${p.date}</span>
          </div>
        </div>
      `
        )
        .join("");
    }
  }

  renderGalleryAlbums();

  document.querySelectorAll("#gallery-category-menu .sidebar-menu-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#gallery-category-menu .sidebar-menu-item").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeGalleryCat = btn.dataset.galleryCat;
      renderGalleryAlbums();
    });
  });

  /* ==========================================================================
     12. LIGHTBOX VIEWER MODAL
     ========================================================================== */
  const lightboxModal = document.getElementById("gallery-lightbox");
  const lightboxScreen = document.getElementById("lightbox-screen");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxMeta = document.getElementById("lightbox-meta");

  function openLightbox(index) {
    currentLightboxIdx = index;
    updateLightbox();
    if (lightboxModal) lightboxModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  window.openLightbox = openLightbox;

  function closeLightbox() {
    if (lightboxModal) lightboxModal.classList.remove("active");
    document.body.style.overflow = "";
  }
  window.closeLightbox = closeLightbox;

  function lightboxNext() {
    currentLightboxIdx = (currentLightboxIdx + 1) % schoolData.galleryPhotos.length;
    updateLightbox();
  }
  window.lightboxNext = lightboxNext;

  function lightboxPrev() {
    currentLightboxIdx = (currentLightboxIdx - 1 + schoolData.galleryPhotos.length) % schoolData.galleryPhotos.length;
    updateLightbox();
  }
  window.lightboxPrev = lightboxPrev;

  function updateLightbox() {
    const item = schoolData.galleryPhotos[currentLightboxIdx];
    if (item) {
      if (lightboxScreen) {
        lightboxScreen.style.background = item.color;
        lightboxScreen.innerHTML = `<span style="font-size:4.5rem;">${item.icon}</span>`;
      }
      if (lightboxTitle) lightboxTitle.textContent = item.title;
      if (lightboxMeta) lightboxMeta.textContent = `${item.date} • ${item.category} — ${item.desc}`;
    }
  }

  lightboxModal?.addEventListener("click", (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  /* ==========================================================================
     13. PAGE SWITCHER & ROUTING CONTROLLER
     ========================================================================== */
  function switchPage(targetId, subTabId) {
    document.querySelectorAll(".subpage-container").forEach((page) => {
      page.classList.remove("active");
    });
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.classList.add("active");
    }

    // Sync Top Mockup Bar buttons
    document.querySelectorAll(".btn-page-tab").forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.target === targetId);
    });

    // Sync Secondary Nav links
    document.querySelectorAll(".nav-item-link").forEach((link) => {
      link.classList.toggle("active", link.dataset.page === targetId);
    });

    // Sync Mobile Drawer links
    document.querySelectorAll(".drawer-link").forEach((link) => {
      link.classList.toggle("active", link.dataset.page === targetId);
    });

    // Deep link activation if subTabId is supplied
    if (subTabId) {
      setTimeout(() => {
        // Try tab target (Academics / Admissions)
        const subTabBtn = document.querySelector(`[data-tab-target="${subTabId}"]`);
        if (subTabBtn) {
          subTabBtn.click();
          return;
        }
        // Try notice category
        const noticeCatBtn = document.querySelector(`[data-notice-cat="${subTabId}"]`);
        if (noticeCatBtn) {
          noticeCatBtn.click();
          return;
        }
        // Try gallery category
        const galleryCatBtn = document.querySelector(`[data-gallery-cat="${subTabId}"]`);
        if (galleryCatBtn) {
          galleryCatBtn.click();
          return;
        }
      }, 50);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  window.switchPage = switchPage;

  function scrollToSection(sectionId) {
    const homePage = document.getElementById("view-homepage");
    if (homePage && !homePage.classList.contains("active")) {
      switchPage("view-homepage");
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }
  window.scrollToSection = scrollToSection;

  document.querySelectorAll(".btn-page-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      switchPage(tab.dataset.target);
    });
  });

  document.querySelectorAll(".nav-item-link[data-page]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      switchPage(link.dataset.page);
    });
  });

  document.querySelectorAll(".drawer-link[data-page]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      closeMobileDrawer();
      switchPage(link.dataset.page);
    });
  });

  // Global Site Search Handler (Desktop & Mobile)
  function handleSiteSearch(query) {
    if (!query || !query.trim()) return;
    const term = query.trim().toLowerCase();

    if (term.includes("admiss") || term.includes("fee") || term.includes("enquir") || term.includes("form") || term.includes("apply")) {
      if (term.includes("fee")) {
        switchPage("view-admissions", "adm-fees");
      } else if (term.includes("eligib") || term.includes("age")) {
        switchPage("view-admissions", "adm-eligibility");
      } else {
        switchPage("view-admissions", "adm-process");
      }
    } else if (term.includes("curric") || term.includes("acad") || term.includes("exam") || term.includes("stream") || term.includes("subject") || term.includes("calendar")) {
      if (term.includes("exam")) {
        switchPage("view-academics", "acad-exams");
      } else if (term.includes("calendar")) {
        switchPage("view-academics", "acad-calendar");
      } else if (term.includes("subject") || term.includes("stream")) {
        switchPage("view-academics", "acad-subjects");
      } else {
        switchPage("view-academics", "acad-curriculum");
      }
    } else if (term.includes("about") || term.includes("history") || term.includes("vision") || term.includes("mission") || term.includes("princip") || term.includes("facilit")) {
      switchPage("view-about");
    } else if (term.includes("photo") || term.includes("gallery") || term.includes("sport") || term.includes("activit") || term.includes("event")) {
      switchPage("view-gallery");
    } else {
      // Default: route to notices board and filter
      switchPage("view-notices");
      const noticeSearch = document.getElementById("notices-search-field");
      if (noticeSearch) {
        noticeSearch.value = term;
        noticeSearch.dispatchEvent(new Event("input"));
      }
    }
  }

  // Desktop search input listener
  const siteSearchInput = document.getElementById("site-search-input");
  siteSearchInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleSiteSearch(siteSearchInput.value);
    }
  });

  // Mobile drawer search input & button listener
  const mobileSearchInput = document.getElementById("mobile-drawer-search-input");
  const btnDrawerSearch = document.getElementById("btn-drawer-search-exec");
  btnDrawerSearch?.addEventListener("click", () => {
    if (mobileSearchInput) {
      closeMobileDrawer();
      handleSiteSearch(mobileSearchInput.value);
    }
  });
  mobileSearchInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      closeMobileDrawer();
      handleSiteSearch(mobileSearchInput.value);
    }
  });

  /* ==========================================================================
     14. MOBILE OFF-CANVAS DRAWER
     ========================================================================== */
  const mobileDrawer = document.getElementById("mobile-drawer");
  const mobileOverlay = document.getElementById("mobile-overlay");
  const btnMobileMenu = document.getElementById("btn-mobile-menu");
  const btnDrawerClose = document.getElementById("btn-drawer-close");

  function openMobileDrawer() {
    mobileDrawer?.classList.add("active");
    mobileOverlay?.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMobileDrawer() {
    mobileDrawer?.classList.remove("active");
    mobileOverlay?.classList.remove("active");
    document.body.style.overflow = "";
  }
  window.openMobileDrawer = openMobileDrawer;
  window.closeMobileDrawer = closeMobileDrawer;

  btnMobileMenu?.addEventListener("click", openMobileDrawer);
  btnDrawerClose?.addEventListener("click", closeMobileDrawer);
  mobileOverlay?.addEventListener("click", closeMobileDrawer);

  /* ==========================================================================
     15. ADMISSION MODALS & FORMS
     ========================================================================== */
  const admissionModal = document.getElementById("admission-modal-dialog");

  function openAdmissionModal() {
    if (admissionModal) {
      admissionModal.style.display = "flex";
      document.body.style.overflow = "hidden";
    }
  }
  window.openAdmissionModal = openAdmissionModal;

  function closeAdmissionModal() {
    if (admissionModal) {
      admissionModal.style.display = "none";
      document.body.style.overflow = "";
      const successBox = document.getElementById("modal-enquiry-success");
      const form = document.getElementById("modal-enquiry-form");
      if (successBox) successBox.style.display = "none";
      if (form) form.style.display = "block";
    }
  }
  window.closeAdmissionModal = closeAdmissionModal;

  window.handleModalEnquirySubmit = async function (e) {
    e.preventDefault();
    const form = document.getElementById("modal-enquiry-form");
    const successBox = document.getElementById("modal-enquiry-success");
    const submitBtn = form.querySelector("button[type='submit']");

    const studentName = form.querySelector("input[type='text']")?.value;
    const parentName = form.querySelectorAll("input[type='text']")[1]?.value;
    const phone = form.querySelector("input[type='tel']")?.value;
    const classApplied = form.querySelector("select")?.value;
    const captcha = form.querySelector("input[type='number']")?.value;

    if (captcha !== "6") {
      alert("Incorrect security verification. 4 + 2 = 6. Please try again.");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting Enquiry...";

    try {
      const res = await ApiService.submitAdmission({
        studentName: studentName,
        dateOfBirth: "2015-01-01",
        gender: "Not Specified",
        classApplied: classApplied,
        previousSchool: "",
        previousClass: "",
        academicSession: CONFIG.ACADEMIC_SESSION,
        fatherName: parentName,
        motherName: parentName,
        phone: phone,
        email: "enquiry@ompublicschool.in",
        address: "Campus Enquiry Desk",
        city: "Varanasi",
        state: "Uttar Pradesh",
        pinCode: "221005"
      });

      const refEl = successBox.querySelector("strong");
      if (refEl && res.data && res.data.applicationId) {
        refEl.textContent = res.data.applicationId;
      }
      if (form) form.style.display = "none";
      if (successBox) successBox.style.display = "block";
    } catch (err) {
      alert("Enquiry submission failed: " + err.message);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Enquiry";
    }
  };

  window.resetAdmissionFormView = function () {
    const form = document.getElementById("page-enquiry-form");
    const successBox = document.getElementById("page-enquiry-success");
    const errBanner = document.getElementById("page-enquiry-error");
    if (form) {
      form.reset();
      form.style.display = "block";
    }
    if (successBox) successBox.style.display = "none";
    if (errBanner) {
      errBanner.style.display = "none";
      errBanner.textContent = "";
    }
    const submitBtn = document.getElementById("btn-submit-page-enquiry");
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = "<span>📝</span> Submit Admission Application";
    }
  };

  const pageEnquiryForm = document.getElementById("page-enquiry-form");
  pageEnquiryForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const errBanner = document.getElementById("page-enquiry-error");
    const submitBtn = document.getElementById("btn-submit-page-enquiry");

    if (errBanner) {
      errBanner.style.display = "none";
      errBanner.textContent = "";
    }

    // Check CAPTCHA
    const captchaVal = document.getElementById("captcha-answer")?.value;
    if (captchaVal !== "8") {
      if (errBanner) {
        errBanner.textContent = "❌ Incorrect security answer. 5 + 3 = 8. Please verify.";
        errBanner.style.display = "block";
      } else {
        alert("Incorrect security answer. 5 + 3 = 8.");
      }
      return;
    }

    const formData = {
      studentName: document.getElementById("adm-student-name")?.value,
      dateOfBirth: document.getElementById("adm-dob")?.value,
      gender: document.getElementById("adm-gender")?.value,
      classApplied: document.getElementById("adm-class")?.value,
      previousSchool: document.getElementById("adm-prev-school")?.value,
      previousClass: document.getElementById("adm-prev-class")?.value,
      academicSession: CONFIG.ACADEMIC_SESSION,
      fatherName: document.getElementById("adm-father-name")?.value,
      motherName: document.getElementById("adm-mother-name")?.value,
      guardianName: document.getElementById("adm-guardian-name")?.value,
      phone: document.getElementById("adm-phone")?.value,
      email: document.getElementById("adm-email")?.value,
      address: document.getElementById("adm-address")?.value,
      city: document.getElementById("adm-city")?.value,
      state: document.getElementById("adm-state")?.value,
      pinCode: document.getElementById("adm-pin")?.value
    };

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>⏳</span> Submitting Application to Admissions Registry...`;

    try {
      const result = await ApiService.submitAdmission(formData);
      const appId = result.data ? result.data.applicationId : "ADM-2026-0001";

      const form = document.getElementById("page-enquiry-form");
      const successBox = document.getElementById("page-enquiry-success");
      const refDisp = document.getElementById("ref-num-disp");

      if (refDisp) refDisp.textContent = appId;
      if (form) form.style.display = "none";
      if (successBox) {
        successBox.style.display = "block";
        successBox.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } catch (err) {
      console.error("Submission failed:", err);
      if (errBanner) {
        errBanner.textContent = "❌ " + (err.message || "Failed to submit application. Please check your inputs.");
        errBanner.style.display = "block";
      } else {
        alert("Submission failed: " + err.message);
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>📝</span> Submit Admission Application`;
    }
  });

  admissionModal?.addEventListener("click", (e) => {
    if (e.target === admissionModal) closeAdmissionModal();
  });

  /* ==========================================================================
     16. DOCUMENT PREVIEW MODAL
     ========================================================================== */
  const docModal = document.getElementById("document-modal-dialog");
  function openDocModal(docId) {
    const doc =
      publishedNotices.find((n) => n.id === docId) ||
      (schoolData.noticesList && schoolData.noticesList.find((n) => n.id === docId)) ||
      (publishedNotices.length > 0 ? publishedNotices[0] : null);

    if (!doc) return;

    const titleEl = document.getElementById("doc-dialog-title");
    const descEl = document.getElementById("doc-dialog-desc");
    if (titleEl) titleEl.textContent = doc.title;

    const metaInfo = `Published: ${doc.date} | Category: ${doc.category || "General"}${doc.important ? " | Priority: High" : ""}`;
    const fullText = doc.description || doc.desc || doc.shortDescription || "";

    if (descEl) {
      descEl.innerHTML = `
        <div style="font-size:0.78rem; font-weight:700; color:#d97706; margin-bottom:0.5rem;">${metaInfo}</div>
        <p style="white-space:pre-line; color:#334155; line-height:1.6;">${fullText}</p>
      `;
    }

    // Update download button
    const downloadBtn = docModal?.querySelector("button[onclick*='alert']");
    if (downloadBtn) {
      if (doc.fileUrl) {
        downloadBtn.textContent = "Download Official PDF 📄";
        downloadBtn.onclick = () => window.open(doc.fileUrl, "_blank");
      } else {
        downloadBtn.textContent = "Download Circular";
        downloadBtn.onclick = () => alert("Official digitally verified circular on record. Reference ID: " + doc.id);
      }
    }

    if (docModal) {
      docModal.style.display = "flex";
      document.body.style.overflow = "hidden";
    }
  }
  window.openDocModal = openDocModal;

  function closeDocModal() {
    if (docModal) {
      docModal.style.display = "none";
      document.body.style.overflow = "";
    }
  }
  window.closeDocModal = closeDocModal;

  docModal?.addEventListener("click", (e) => {
    if (e.target === docModal) closeDocModal();
  });

  /* ==========================================================================
     17. BILINGUAL SWITCHER (EN / हिन्दी)
     ========================================================================== */
  function setLanguage(lang) {
    currentLang = lang;
    const isHi = lang === "hi";

    document.querySelectorAll(".lang-btn").forEach((b) => {
      b.classList.toggle("active", b.id.includes(lang));
    });

    const dict = translations[lang] || translations.en;
    const nameEl = document.getElementById("dyn-school-name");
    const mottoEl = document.getElementById("dyn-school-motto");
    const heroTitleEl = document.getElementById("dyn-hero-title");
    const heroPillarsEl = document.getElementById("dyn-hero-pillars");
    const knowMoreEl = document.getElementById("dyn-btn-know-more");
    const applyBtnEl = document.getElementById("dyn-btn-apply");
    const deskQuoteEl = document.getElementById("dyn-desk-quote");

    if (nameEl) nameEl.textContent = isHi ? schoolData.profile.hindiName : schoolData.profile.name;
    if (mottoEl) mottoEl.textContent = isHi ? schoolData.profile.hindiTagline : schoolData.profile.tagline;
    if (heroTitleEl) heroTitleEl.textContent = dict.heroTitle;
    if (heroPillarsEl) heroPillarsEl.innerHTML = dict.heroPillars.replace(/\|/g, '<span class="hero-pillar-sep">|</span>');
    if (knowMoreEl) knowMoreEl.textContent = dict.btnKnowMore;
    if (applyBtnEl) applyBtnEl.textContent = dict.btnApply;
    if (deskQuoteEl) deskQuoteEl.textContent = isHi ? schoolData.principal.hindiQuote : schoolData.principal.quote;
  }

  document.getElementById("btn-lang-en")?.addEventListener("click", () => setLanguage("en"));
  document.getElementById("btn-lang-hi")?.addEventListener("click", () => setLanguage("hi"));
  document.getElementById("btn-lang-en-mob")?.addEventListener("click", () => setLanguage("en"));
  document.getElementById("btn-lang-hi-mob")?.addEventListener("click", () => setLanguage("hi"));

  /* ==========================================================================
     18. ACCESSIBILITY CONTROLS
     ========================================================================== */
  let currentBase = 15;
  document.getElementById("font-inc")?.addEventListener("click", () => {
    if (currentBase < 19) currentBase += 1;
    document.documentElement.style.setProperty("--font-size-base", `${currentBase}px`);
  });
  document.getElementById("font-reset")?.addEventListener("click", () => {
    currentBase = 15;
    document.documentElement.style.setProperty("--font-size-base", `15px`);
  });
  document.getElementById("font-dec")?.addEventListener("click", () => {
    if (currentBase > 13) currentBase -= 1;
    document.documentElement.style.setProperty("--font-size-base", `${currentBase}px`);
  });

  document.getElementById("btn-toggle-contrast")?.addEventListener("click", () => {
    document.body.classList.toggle("high-contrast");
  });

  /* ==========================================================================
     19. NEWSLETTER
     ========================================================================== */
  window.handleNewsletter = function () {
    const email = document.getElementById("newsletter-email")?.value;
    if (email && email.includes("@")) {
      alert("Thank you for subscribing to the Om Public School newsletter!");
      document.getElementById("newsletter-email").value = "";
    } else {
      alert("Please enter a valid email address.");
    }
  };

  /* ==========================================================================
     20. HERO TOUCH SWIPE SUPPORT & ARROWS
     ========================================================================== */
  let touchStartX = 0;
  let touchEndX = 0;
  const heroRoot = document.getElementById("hero-carousel-root");

  heroRoot?.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  heroRoot?.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      alert("Swiped to next highlight slide!");
    } else if (touchEndX - touchStartX > 50) {
      alert("Swiped to previous highlight slide!");
    }
  });

  document.getElementById("hero-next")?.addEventListener("click", () => {
    alert("Displaying next academic highlight banner...");
  });
  document.getElementById("hero-prev")?.addEventListener("click", () => {
    alert("Displaying previous academic highlight banner...");
  });

  // Global search input & Quick chips
  window.quickHeaderSearch = function (term) {
    const siteSearch = document.getElementById("site-search-input");
    if (siteSearch) siteSearch.value = term;
    if (term.toLowerCase() === "admissions") {
      switchPage("view-admissions");
    } else {
      switchPage("view-notices");
      const noticeSearch = document.getElementById("notices-search-field");
      if (noticeSearch) {
        noticeSearch.value = term;
        renderNoticesTable();
      }
    }
  };

  const siteSearch = document.getElementById("site-search-input");
  siteSearch?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && siteSearch.value.trim()) {
      switchPage("view-notices");
      const noticeSearch = document.getElementById("notices-search-field");
      if (noticeSearch) {
        noticeSearch.value = siteSearch.value.trim();
        renderNoticesTable();
      }
    }
  });

  // Escape key closes modals
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAdmissionModal();
      closeDocModal();
      closeLightbox();
      closeMobileDrawer();
    }
  });
});
