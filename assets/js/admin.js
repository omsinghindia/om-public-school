/**
 * Om Public School - Admin Panel Controller
 * Handles Admin Authentication, Dashboard KPIs, Notice CRUD + Google Drive Uploads,
 * Admission Review + Status Transitions, and Excel/CSV Export.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Global Admin State
  let adminNotices = [];
  let adminAdmissions = [];
  let activeTab = "dashboard";
  let noticeToDeleteId = null;

  // DOM Elements
  const authView = document.getElementById("admin-auth-view");
  const mainView = document.getElementById("admin-main-view");
  const loginForm = document.getElementById("admin-login-form");
  const loginAlert = document.getElementById("login-alert");
  const btnLoginSubmit = document.getElementById("btn-login-submit");
  const currentAdminUserSpan = document.getElementById("current-admin-user");
  const btnLogout = document.getElementById("btn-logout");

  // Modals
  const noticeModal = document.getElementById("notice-form-modal");
  const noticeForm = document.getElementById("notice-edit-form");
  const noticeModalTitle = document.getElementById("notice-modal-title");
  const confirmModal = document.getElementById("confirm-dialog-modal");
  const confirmMsg = document.getElementById("confirm-dialog-msg");
  const btnConfirmAction = document.getElementById("btn-confirm-action");
  const admissionDetailModal = document.getElementById("admission-detail-modal");
  const noticePreviewModal = document.getElementById("notice-preview-modal");

  /* ==========================================================================
     1. AUTHENTICATION LIFECYCLE
     ========================================================================== */

  function checkAuth() {
    const session = ApiService.getAdminSession();
    if (session) {
      authView.style.display = "none";
      mainView.style.display = "block";
      if (currentAdminUserSpan) {
        currentAdminUserSpan.textContent = session.username;
      }
      loadAllAdminData();
    } else {
      authView.style.display = "flex";
      mainView.style.display = "none";
    }
  }

  // Handle Login Form Submit
  loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const usernameInput = document.getElementById("admin-username");
    const passwordInput = document.getElementById("admin-password");

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    loginAlert.className = "login-alert";
    loginAlert.style.display = "none";

    btnLoginSubmit.disabled = true;
    btnLoginSubmit.textContent = "Verifying Credentials...";

    try {
      await ApiService.adminLogin(username, password);
      loginForm.reset();
      checkAuth();
    } catch (err) {
      loginAlert.textContent = err.message || "Invalid credentials.";
      loginAlert.classList.add("error");
      loginAlert.style.display = "block";
    } finally {
      btnLoginSubmit.disabled = false;
      btnLoginSubmit.textContent = "Sign In to Admin Portal";
    }
  });

  // Handle Logout
  btnLogout?.addEventListener("click", () => {
    if (confirm("Are you sure you want to log out of the Admin Portal?")) {
      ApiService.adminLogout();
      checkAuth();
    }
  });

  /* ==========================================================================
     2. TAB NAVIGATION
     ========================================================================== */
  window.switchAdminTab = function (tabName) {
    activeTab = tabName;

    document.querySelectorAll(".admin-tab-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === tabName);
    });

    document.querySelectorAll(".admin-view-panel").forEach((panel) => {
      panel.classList.toggle("active", panel.id === `panel-${tabName}`);
    });

    if (tabName === "notices") renderNoticesTable();
    if (tabName === "admissions") renderAdmissionsTable();
    if (tabName === "dashboard") updateDashboardKpis();
  };

  document.querySelectorAll(".admin-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      switchAdminTab(btn.dataset.tab);
    });
  });

  /* ==========================================================================
     3. DATA LOADING & KPI CALCULATION
     ========================================================================== */
  async function loadAllAdminData() {
    try {
      const [notices, admissions] = await Promise.all([
        ApiService.adminGetNotices(),
        ApiService.adminGetAdmissions()
      ]);
      adminNotices = notices || [];
      adminAdmissions = admissions || [];

      updateDashboardKpis();
      renderNoticesTable();
      renderAdmissionsTable();
      renderSettingsInfo();
    } catch (err) {
      console.error("Failed to load admin data:", err);
      alert("Error loading data from server: " + err.message);
    }
  }

  function updateDashboardKpis() {
    const totalNotices = adminNotices.length;
    const publishedNotices = adminNotices.filter((n) => n.status === "Published").length;
    const draftNotices = adminNotices.filter((n) => n.status === "Draft").length;

    const totalAdmissions = adminAdmissions.length;
    const newAdmissions = adminAdmissions.filter((a) => a.status === "NEW").length;
    const underReview = adminAdmissions.filter((a) => a.status === "UNDER_REVIEW").length;
    const admitted = adminAdmissions.filter((a) => a.status === "ADMITTED").length;

    document.getElementById("kpi-total-notices").textContent = totalNotices;
    document.getElementById("kpi-published-notices").textContent = publishedNotices;
    document.getElementById("kpi-draft-notices").textContent = draftNotices;

    document.getElementById("kpi-total-admissions").textContent = totalAdmissions;
    document.getElementById("kpi-new-admissions").textContent = newAdmissions;
    document.getElementById("kpi-under-review").textContent = underReview;
    document.getElementById("kpi-admitted").textContent = admitted;

    // Update Tab count badges
    const tabNoticeCount = document.getElementById("tab-notice-count");
    if (tabNoticeCount) tabNoticeCount.textContent = totalNotices;
    const tabAdmissionCount = document.getElementById("tab-admission-count");
    if (tabAdmissionCount) tabAdmissionCount.textContent = totalAdmissions;

    // Render Recent Admissions list on dashboard
    renderRecentAdmissionsList();
  }

  function renderRecentAdmissionsList() {
    const container = document.getElementById("dashboard-recent-admissions");
    if (!container) return;

    const recent = adminAdmissions.slice(0, 5);
    if (recent.length === 0) {
      container.innerHTML = `<div class="state-box">No admission applications received yet.</div>`;
      return;
    }

    container.innerHTML = `
      <table class="admin-table">
        <thead>
          <tr>
            <th>Application ID</th>
            <th>Student Name</th>
            <th>Class Applied</th>
            <th>Parent Phone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${recent
            .map(
              (a) => `
            <tr>
              <td><strong>${a.applicationId}</strong></td>
              <td>${a.studentName}</td>
              <td>${a.classApplied}</td>
              <td>${a.phone}</td>
              <td><span class="status-pill ${a.status.toLowerCase()}">${a.status}</span></td>
              <td>
                <button class="btn-action-sm" onclick="openAdmissionDetail('${a.applicationId}')">View Details</button>
              </td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;
  }

  /* ==========================================================================
     4. NOTICES MANAGEMENT
     ========================================================================== */

  function renderNoticesTable() {
    const tableBody = document.getElementById("admin-notices-tbody");
    if (!tableBody) return;

    const searchVal = (document.getElementById("notice-search-input")?.value || "").toLowerCase().trim();
    const catFilter = document.getElementById("notice-cat-filter")?.value || "all";
    const statusFilter = document.getElementById("notice-status-filter")?.value || "all";

    let filtered = adminNotices;

    if (catFilter !== "all") {
      filtered = filtered.filter((n) => n.category.toLowerCase() === catFilter.toLowerCase());
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((n) => n.status.toLowerCase() === statusFilter.toLowerCase());
    }

    if (searchVal) {
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(searchVal) ||
          (n.description && n.description.toLowerCase().includes(searchVal)) ||
          n.id.toLowerCase().includes(searchVal)
      );
    }

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" class="state-box">
            <div class="state-box-icon">📋</div>
            <p>No notices found matching your filter criteria.</p>
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered
      .map((n) => {
        const isImportant = n.important ? `<span class="important-star">⭐ Priority</span>` : "";
        const fileIcon = n.fileUrl
          ? `<a href="${n.fileUrl}" target="_blank" title="View attached document" style="color:#059669; font-weight:700; text-decoration:underline;">📄 Attached</a>`
          : `<span style="color:#94a3b8;">None</span>`;

        return `
          <tr>
            <td><span style="font-family:monospace; font-weight:700; color:#0b2545;">${n.id}</span></td>
            <td>
              <div style="font-weight:700; color:#0f172a;">${n.title} ${isImportant}</div>
              <div style="font-size:0.75rem; color:#64748b;">${n.shortDescription || ""}</div>
            </td>
            <td><span style="font-weight:700; color:#475569;">${n.category}</span></td>
            <td><span class="status-pill ${n.status.toLowerCase()}">${n.status}</span></td>
            <td>${fileIcon}</td>
            <td style="font-size:0.8rem; color:#64748b; white-space:nowrap;">${n.date}</td>
            <td>
              <div class="action-btn-group">
                <button class="btn-action-sm" onclick="openEditNoticeModal('${n.id}')" title="Edit notice">✏️ Edit</button>
                <button class="btn-action-sm" onclick="previewNoticeAdmin('${n.id}')" title="Preview notice">👁️</button>
                <button class="btn-action-sm" onclick="togglePublishNotice('${n.id}')" title="Toggle publish status">
                  ${n.status === "Published" ? "Unpublish" : "Publish"}
                </button>
                <button class="btn-action-sm danger" onclick="promptDeleteNotice('${n.id}')" title="Archive / Delete">🗑️</button>
              </div>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  // Filter Event Listeners
  document.getElementById("notice-search-input")?.addEventListener("input", renderNoticesTable);
  document.getElementById("notice-cat-filter")?.addEventListener("change", renderNoticesTable);
  document.getElementById("notice-status-filter")?.addEventListener("change", renderNoticesTable);

  // Open Notice Modal (Add or Edit)
  window.openAddNoticeModal = function () {
    noticeModalTitle.textContent = "Create New School Notice";
    noticeForm.reset();
    document.getElementById("notice-form-id").value = "";
    document.getElementById("notice-form-date").value = new Date().toISOString().slice(0, 10);
    document.getElementById("notice-file-upload-status").textContent = "";
    noticeModal.classList.add("active");
  };

  window.openEditNoticeModal = function (noticeId) {
    const notice = adminNotices.find((n) => n.id === noticeId);
    if (!notice) return;

    noticeModalTitle.textContent = `Edit Notice: ${notice.id}`;
    document.getElementById("notice-form-id").value = notice.id;
    document.getElementById("notice-form-title").value = notice.title;
    document.getElementById("notice-form-short-desc").value = notice.shortDescription || "";
    document.getElementById("notice-form-desc").value = notice.description || "";
    document.getElementById("notice-form-category").value = notice.category;
    document.getElementById("notice-form-date").value = notice.date;
    document.getElementById("notice-form-expiry").value = notice.expiryDate || "";
    document.getElementById("notice-form-status").value = notice.status;
    document.getElementById("notice-form-important").checked = Boolean(notice.important);
    document.getElementById("notice-form-file-url").value = notice.fileUrl || "";
    document.getElementById("notice-file-upload-status").textContent = "";

    noticeModal.classList.add("active");
  };

  window.closeNoticeModal = function () {
    noticeModal.classList.remove("active");
  };

  // Upload File to Google Drive
  const fileInput = document.getElementById("notice-file-input");
  fileInput?.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const statusEl = document.getElementById("notice-file-upload-status");
    statusEl.textContent = "⏳ Uploading file to Google Drive...";
    statusEl.style.color = "#d97706";

    try {
      const driveUrl = await ApiService.adminUploadFile(file);
      document.getElementById("notice-form-file-url").value = driveUrl;
      statusEl.textContent = "✓ Uploaded to Google Drive successfully!";
      statusEl.style.color = "#059669";
    } catch (err) {
      statusEl.textContent = "❌ Upload failed: " + err.message;
      statusEl.style.color = "#dc2626";
    }
  });

  // Handle Notice Form Submit
  noticeForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById("btn-save-notice");
    submitBtn.disabled = true;
    submitBtn.textContent = "Saving Notice...";

    const id = document.getElementById("notice-form-id").value;
    const noticeData = {
      id: id || undefined,
      title: document.getElementById("notice-form-title").value.trim(),
      shortDescription: document.getElementById("notice-form-short-desc").value.trim(),
      description: document.getElementById("notice-form-desc").value.trim(),
      category: document.getElementById("notice-form-category").value,
      date: document.getElementById("notice-form-date").value,
      expiryDate: document.getElementById("notice-form-expiry").value,
      status: document.getElementById("notice-form-status").value,
      important: document.getElementById("notice-form-important").checked,
      fileUrl: document.getElementById("notice-form-file-url").value.trim()
    };

    try {
      await ApiService.adminSaveNotice(noticeData);
      closeNoticeModal();
      await loadAllAdminData();
      alert("Notice saved successfully!");
    } catch (err) {
      alert("Error saving notice: " + err.message);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Save Notice";
    }
  });

  // Toggle Publish / Unpublish
  window.togglePublishNotice = async function (noticeId) {
    const notice = adminNotices.find((n) => n.id === noticeId);
    if (!notice) return;

    const newStatus = notice.status === "Published" ? "Draft" : "Published";
    try {
      await ApiService.adminSaveNotice({
        ...notice,
        status: newStatus
      });
      await loadAllAdminData();
    } catch (err) {
      alert("Error updating notice status: " + err.message);
    }
  };

  // Prompt Archive / Delete Confirmation
  window.promptDeleteNotice = function (noticeId) {
    noticeToDeleteId = noticeId;
    const notice = adminNotices.find((n) => n.id === noticeId);
    confirmMsg.textContent = `Are you sure you want to archive / delete notice "${notice ? notice.title : noticeId}"? This will remove it from public view.`;
    confirmModal.classList.add("active");
  };

  window.closeConfirmModal = function () {
    confirmModal.classList.remove("active");
    noticeToDeleteId = null;
  };

  btnConfirmAction?.addEventListener("click", async () => {
    if (!noticeToDeleteId) return;
    btnConfirmAction.disabled = true;
    btnConfirmAction.textContent = "Processing...";

    try {
      await ApiService.adminDeleteNotice(noticeToDeleteId);
      closeConfirmModal();
      await loadAllAdminData();
      alert("Notice archived successfully.");
    } catch (err) {
      alert("Error archiving notice: " + err.message);
    } finally {
      btnConfirmAction.disabled = false;
      btnConfirmAction.textContent = "Confirm Action";
    }
  });

  // Preview Notice Modal
  window.previewNoticeAdmin = function (noticeId) {
    const notice = adminNotices.find((n) => n.id === noticeId);
    if (!notice) return;

    document.getElementById("preview-notice-title").textContent = notice.title;
    document.getElementById("preview-notice-meta").textContent = `Category: ${notice.category} | Date: ${notice.date} | Status: ${notice.status}`;
    document.getElementById("preview-notice-desc").textContent = notice.description || notice.shortDescription || "No detailed content provided.";

    const fileWrap = document.getElementById("preview-notice-file-wrap");
    if (notice.fileUrl) {
      fileWrap.innerHTML = `<a href="${notice.fileUrl}" target="_blank" class="btn-primary-action" style="display:inline-flex;">📄 View / Download Attached PDF</a>`;
    } else {
      fileWrap.innerHTML = `<span style="color:#94a3b8; font-size:0.85rem;">No document attached.</span>`;
    }

    noticePreviewModal.classList.add("active");
  };

  window.closeNoticePreviewModal = function () {
    noticePreviewModal.classList.remove("active");
  };

  /* ==========================================================================
     5. ADMISSIONS MANAGEMENT
     ========================================================================== */

  function renderAdmissionsTable() {
    const tableBody = document.getElementById("admin-admissions-tbody");
    if (!tableBody) return;

    const searchVal = (document.getElementById("admission-search-input")?.value || "").toLowerCase().trim();
    const classFilter = document.getElementById("admission-class-filter")?.value || "all";
    const statusFilter = document.getElementById("admission-status-filter")?.value || "all";

    let filtered = adminAdmissions;

    if (classFilter !== "all") {
      filtered = filtered.filter((a) => a.classApplied.toLowerCase().includes(classFilter.toLowerCase()));
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((a) => a.status.toLowerCase() === statusFilter.toLowerCase());
    }

    if (searchVal) {
      filtered = filtered.filter(
        (a) =>
          a.applicationId.toLowerCase().includes(searchVal) ||
          a.studentName.toLowerCase().includes(searchVal) ||
          a.phone.toLowerCase().includes(searchVal) ||
          (a.fatherName && a.fatherName.toLowerCase().includes(searchVal)) ||
          (a.email && a.email.toLowerCase().includes(searchVal))
      );
    }

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="8" class="state-box">
            <div class="state-box-icon">🎓</div>
            <p>No admission applications match your filter.</p>
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered
      .map((a) => {
        const dateStr = a.submittedAt ? new Date(a.submittedAt).toLocaleDateString("en-IN") : "-";
        return `
          <tr>
            <td><strong style="font-family:monospace; color:#0b2545;">${a.applicationId}</strong></td>
            <td><strong>${a.studentName}</strong></td>
            <td>${a.classApplied}</td>
            <td>${a.fatherName || a.guardianName || "-"}</td>
            <td>${a.phone}</td>
            <td><span class="status-pill ${a.status.toLowerCase()}">${a.status}</span></td>
            <td style="font-size:0.8rem; color:#64748b;">${dateStr}</td>
            <td>
              <button class="btn-action-sm" onclick="openAdmissionDetail('${a.applicationId}')">View Details</button>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  // Filter Event Listeners for Admissions
  document.getElementById("admission-search-input")?.addEventListener("input", renderAdmissionsTable);
  document.getElementById("admission-class-filter")?.addEventListener("change", renderAdmissionsTable);
  document.getElementById("admission-status-filter")?.addEventListener("change", renderAdmissionsTable);

  // Open Admission Details Modal
  window.openAdmissionDetail = function (appId) {
    const app = adminAdmissions.find((a) => a.applicationId === appId);
    if (!app) return;

    document.getElementById("detail-app-id").textContent = app.applicationId;
    document.getElementById("detail-student-name").textContent = app.studentName;
    document.getElementById("detail-dob").textContent = app.dateOfBirth;
    document.getElementById("detail-gender").textContent = app.gender;
    document.getElementById("detail-class").textContent = app.classApplied;
    document.getElementById("detail-prev-school").textContent = app.previousSchool || "Not Specified";
    document.getElementById("detail-prev-class").textContent = app.previousClass || "Not Specified";
    document.getElementById("detail-session").textContent = app.academicSession || "2025-26";

    document.getElementById("detail-father").textContent = app.fatherName;
    document.getElementById("detail-mother").textContent = app.motherName;
    document.getElementById("detail-guardian").textContent = app.guardianName || app.fatherName;
    document.getElementById("detail-phone").textContent = app.phone;
    document.getElementById("detail-email").textContent = app.email;

    document.getElementById("detail-address").textContent = app.address;
    document.getElementById("detail-city").textContent = app.city;
    document.getElementById("detail-state").textContent = app.state;
    document.getElementById("detail-pin").textContent = app.pinCode;

    document.getElementById("detail-submitted-at").textContent = app.submittedAt
      ? new Date(app.submittedAt).toLocaleString("en-IN")
      : "-";

    // Set status select
    const statusSelect = document.getElementById("detail-status-select");
    statusSelect.value = app.status;
    statusSelect.dataset.appId = app.applicationId;

    admissionDetailModal.classList.add("active");
  };

  window.closeAdmissionDetailModal = function () {
    admissionDetailModal.classList.remove("active");
  };

  // Update Status from Inside Modal
  window.handleUpdateStatusClick = async function () {
    const statusSelect = document.getElementById("detail-status-select");
    const appId = statusSelect.dataset.appId;
    const newStatus = statusSelect.value;
    const btn = document.getElementById("btn-update-status");

    btn.disabled = true;
    btn.textContent = "Updating...";

    try {
      await ApiService.adminUpdateAdmissionStatus(appId, newStatus);
      await loadAllAdminData();
      alert(`Application ${appId} status updated to ${newStatus}`);
      closeAdmissionDetailModal();
    } catch (err) {
      alert("Failed to update status: " + err.message);
    } finally {
      btn.disabled = false;
      btn.textContent = "Update Status";
    }
  };

  // Export to Excel / CSV
  document.getElementById("btn-export-admissions-csv")?.addEventListener("click", () => {
    try {
      ApiService.exportAdmissionsToCsv(adminAdmissions);
    } catch (err) {
      alert(err.message);
    }
  });

  /* ==========================================================================
     6. SYSTEM & SETTINGS VIEW
     ========================================================================== */
  function renderSettingsInfo() {
    const isLive = ApiService.isLiveApiConfigured();
    const endpointEl = document.getElementById("settings-api-endpoint");
    const statusBadgeEl = document.getElementById("settings-api-status");

    if (endpointEl) {
      endpointEl.textContent = isLive ? CONFIG.API_BASE_URL : "(Not Configured — Operating in Local Demo Mode)";
    }

    if (statusBadgeEl) {
      if (isLive) {
        statusBadgeEl.innerHTML = `<span style="color:#059669; font-weight:800;">✓ Connected to Google Apps Script</span>`;
      } else {
        statusBadgeEl.innerHTML = `<span style="color:#d97706; font-weight:800;">⚠️ Local Demo Mode (Browser Persistence Active)</span>`;
      }
    }
  }

  // Quick Action from Header
  window.openAddNoticeModalFromHeader = function () {
    switchAdminTab("notices");
    if (typeof window.openAddNoticeModal === "function") {
      window.openAddNoticeModal();
    }
  };

  // Live IST Digital Clock Ticker
  function startLiveClock() {
    const clockEl = document.getElementById("admin-live-clock");
    if (!clockEl) return;

    function update() {
      const now = new Date();
      const options = {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      };
      try {
        const formatter = new Intl.DateTimeFormat("en-IN", options);
        clockEl.textContent = formatter.format(now) + " IST";
      } catch (e) {
        clockEl.textContent = now.toLocaleDateString() + " " + now.toLocaleTimeString();
      }
    }

    update();
    setInterval(update, 1000);
  }

  // Initialize
  startLiveClock();
  checkAuth();
});
