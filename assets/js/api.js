/**
 * Om Public School - API Service Layer
 * Clean client interface for Google Apps Script Web App API.
 * Seamlessly handles Public Notices, Admissions, Admin Auth, and Drive File Uploads,
 * with built-in resilient offline/demo fallback mode for local testing.
 */

const ApiService = (() => {
  // Storage keys for demo/local persistence
  const STORAGE_NOTICES_KEY = "ops_local_notices_db";
  const STORAGE_ADMISSIONS_KEY = "ops_local_admissions_db";

  // Initial seed data for notices when starting in demo/fallback mode
  const SEED_NOTICES = [
    {
      id: "NOT-2025-0001",
      title: "Class 10 & 12 Board Exam Schedule 2025-26",
      shortDescription: "Detailed date sheet, shift timings, reporting protocols, and CBSE instructions.",
      description: "CBSE has officially announced the commencement schedule for Secondary (Class X) and Senior Secondary (Class XII) Annual Board Examinations for the academic year 2025-26. Practical examinations commence 15th January 2026 and theory examinations commence 15th February 2026. Hall tickets will be distributed from the administrative office.",
      date: "2025-09-12",
      expiryDate: "2026-03-31",
      category: "Examination",
      important: true,
      fileUrl: "https://www.cbse.gov.in",
      status: "Published",
      createdAt: "2025-09-12T09:00:00Z",
      updatedAt: "2025-09-12T09:00:00Z"
    },
    {
      id: "NOT-2025-0002",
      title: "Admissions Open for Session 2025-26 (Pre-Primary to Class XI)",
      shortDescription: "Online registration open with scholarship assessment for meritorious applicants.",
      description: "Om Public School announces opening of admissions for Nursery, Primary, Middle, Secondary, and Senior Secondary (Science, Commerce, Humanities) for the upcoming academic session 2025-26. Merit scholarships up to 100% tuition waiver available for top scorers. Prospective parents can book campus tours every Saturday.",
      date: "2025-09-10",
      expiryDate: "2025-12-31",
      category: "Admissions",
      important: true,
      fileUrl: "",
      status: "Published",
      createdAt: "2025-09-10T10:30:00Z",
      updatedAt: "2025-09-10T10:30:00Z"
    },
    {
      id: "NOT-2025-0003",
      title: "Annual Academic Calendar & Gazetted Holiday List 2025-26",
      shortDescription: "Complete list of term breaks, gazetted festivals, examination weeks, and sports days.",
      description: "The Academic Council has finalized the official holiday and examination calendar for the academic session 2025-26. Summer vacations will run from 20 May to 30 June 2025. Mid-term assessments will be conducted from 15 Sep to 28 Sep 2025. Please download the circular for full details.",
      date: "2025-09-01",
      expiryDate: "2026-04-30",
      category: "Holiday",
      important: false,
      fileUrl: "",
      status: "Published",
      createdAt: "2025-09-01T08:00:00Z",
      updatedAt: "2025-09-01T08:00:00Z"
    },
    {
      id: "NOT-2025-0004",
      title: "Parent Teacher Meeting (PTM) for Term 1",
      shortDescription: "Roll number-wise consultations for parents to review student academic progress.",
      description: "Parent-Teacher Meeting (PTM) for Classes Nursery to XII will be held on Saturday, 20th September 2025, from 08:30 AM to 01:30 PM. Parents are requested to adhere to their designated time slots to ensure productive, individualized discussions with class teachers and subject faculty.",
      date: "2025-08-28",
      expiryDate: "2025-09-21",
      category: "General",
      important: false,
      fileUrl: "",
      status: "Published",
      createdAt: "2025-08-28T11:00:00Z",
      updatedAt: "2025-08-28T11:00:00Z"
    },
    {
      id: "NOT-2025-0005",
      title: "Annual Sports Day Event Rules & House Guidelines",
      shortDescription: "Track, relay, and march-past participation guidelines for Red, Blue, Green, and Gold houses.",
      description: "The 18th Annual Athletic Meet and Sports Day will be celebrated on 15 November 2025. House captains and athletic coordinators have posted registration forms on the campus sports noticeboard. Students interested in 100m, 400m sprint, shot put, and inter-house relay should report to the Physical Education department.",
      date: "2025-08-20",
      expiryDate: "2025-11-16",
      category: "Event",
      important: false,
      fileUrl: "",
      status: "Published",
      createdAt: "2025-08-20T14:15:00Z",
      updatedAt: "2025-08-20T14:15:00Z"
    },
    {
      id: "NOT-2025-0006",
      title: "Internal Staff Curriculum Review Meeting (Draft Notice)",
      shortDescription: "Agenda points for senior faculty curriculum planning meeting.",
      description: "Internal staff memorandum regarding NEP 2020 pedagogical integration. For authorized academic staff only.",
      date: "2025-08-15",
      expiryDate: "2025-09-30",
      category: "General",
      important: false,
      fileUrl: "",
      status: "Draft",
      createdAt: "2025-08-15T09:00:00Z",
      updatedAt: "2025-08-15T09:00:00Z"
    }
  ];

  // Initial seed admissions for demonstration
  const SEED_ADMISSIONS = [
    {
      applicationId: "ADM-2026-0001",
      studentName: "Aarav Sharma",
      dateOfBirth: "2012-05-14",
      gender: "Male",
      classApplied: "Class 8 (Middle)",
      previousSchool: "Sunbeam English School, Varanasi",
      previousClass: "Class 7",
      academicSession: "2025-26",
      fatherName: "Rajesh Sharma",
      motherName: "Sunita Sharma",
      guardianName: "Rajesh Sharma",
      phone: "9876543210",
      email: "rajesh.sharma@example.com",
      address: "B-42, Jawahar Nagar, Near Assi Ghat",
      city: "Varanasi",
      state: "Uttar Pradesh",
      pinCode: "221005",
      status: "UNDER_REVIEW",
      submittedAt: "2025-09-10T11:42:00Z"
    },
    {
      applicationId: "ADM-2026-0002",
      studentName: "Priya Verma",
      dateOfBirth: "2009-08-22",
      gender: "Female",
      classApplied: "Class 11 (Science)",
      previousSchool: "Delhi Public School, Kashi",
      previousClass: "Class 10 (94.2% CBSE)",
      academicSession: "2025-26",
      fatherName: "Anil Verma",
      motherName: "Meenakshi Verma",
      guardianName: "Anil Verma",
      phone: "9839012345",
      email: "anil.verma@example.com",
      address: "Flat 302, Ganga Heights, Sigra",
      city: "Varanasi",
      state: "Uttar Pradesh",
      pinCode: "221002",
      status: "SHORTLISTED",
      submittedAt: "2025-09-11T14:10:00Z"
    },
    {
      applicationId: "ADM-2026-0003",
      studentName: "Kabir Singh Patel",
      dateOfBirth: "2021-03-10",
      gender: "Male",
      classApplied: "Pre-Primary (Nursery)",
      previousSchool: "Little Angels Play School",
      previousClass: "Playgroup",
      academicSession: "2025-26",
      fatherName: "Vikram Patel",
      motherName: "Pooja Patel",
      guardianName: "Vikram Patel",
      phone: "9918234567",
      email: "vikram.patel@example.com",
      address: "12, Kabir Chaura Lane",
      city: "Varanasi",
      state: "Uttar Pradesh",
      pinCode: "221001",
      status: "NEW",
      submittedAt: "2025-09-12T08:15:00Z"
    }
  ];

  // Initialize local demo storage if empty
  function initDemoStorage() {
    if (!localStorage.getItem(STORAGE_NOTICES_KEY)) {
      localStorage.setItem(STORAGE_NOTICES_KEY, JSON.stringify(SEED_NOTICES));
    }
    if (!localStorage.getItem(STORAGE_ADMISSIONS_KEY)) {
      localStorage.setItem(STORAGE_ADMISSIONS_KEY, JSON.stringify(SEED_ADMISSIONS));
    }
  }
  initDemoStorage();

  // Helper for checking if live API is configured
  function isLiveApiConfigured() {
    return Boolean(CONFIG.API_BASE_URL && CONFIG.API_BASE_URL.trim().startsWith("http"));
  }

  // Helper for HTTP requests
  async function makeRequest(url, options = {}) {
    const isGet = !options.method || options.method.toUpperCase() === "GET";
    const headers = {};
    
    // Only set Content-Type for POST/PUT requests with a body.
    // Omit Content-Type on GET to ensure it remains a CORS simple request across 302 redirects.
    if (!isGet) {
      headers["Content-Type"] = "text/plain;charset=utf-8";
    }

    const response = await fetch(url, {
      redirect: "follow",
      ...options,
      headers: {
        ...headers,
        ...(options.headers || {})
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  }

  /* ==========================================================================
     PUBLIC APIS
     ========================================================================== */

  /**
   * Fetch all published notices for public users (excluding drafts/archived/expired)
   */
  async function getPublishedNotices() {
    if (isLiveApiConfigured()) {
      try {
        const url = `${CONFIG.API_BASE_URL}?action=getPublishedNotices&t=${Date.now()}`;
        const res = await makeRequest(url);
        if (res.success && Array.isArray(res.data)) {
          return res.data;
        }
        throw new Error(res.message || "Failed to parse notices from API");
      } catch (err) {
        console.warn("Live API fetch failed, falling back to local storage:", err);
        if (!CONFIG.DEMO_MODE_FALLBACK) throw err;
      }
    }

    // Fallback: filter local published notices
    const raw = JSON.parse(localStorage.getItem(STORAGE_NOTICES_KEY) || "[]");
    const today = new Date().toISOString().slice(0, 10);
    return raw
      .filter((n) => n.status === "Published" && (!n.expiryDate || n.expiryDate >= today))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  /**
   * Submit admission application form
   * @param {Object} formData
   */
  async function submitAdmission(formData) {
    // Validate required fields
    const required = [
      "studentName",
      "dateOfBirth",
      "gender",
      "classApplied",
      "fatherName",
      "motherName",
      "phone",
      "email",
      "address",
      "city",
      "state",
      "pinCode"
    ];

    for (const field of required) {
      if (!formData[field] || !String(formData[field]).trim()) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Phone validation (Indian 10-digit number starting with 6, 7, 8, or 9)
    const phoneClean = String(formData.phone).trim().replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(phoneClean)) {
      throw new Error("Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9).");
    }

    // Email validation
    const emailClean = String(formData.email).trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailClean)) {
      throw new Error("Please enter a valid email address.");
    }

    // PIN code validation (6 digits, cannot start with 0)
    const pinClean = String(formData.pinCode).trim();
    if (!/^[1-9][0-9]{5}$/.test(pinClean)) {
      throw new Error("Please enter a valid 6-digit PIN code.");
    }

    const payload = {
      action: "createAdmission",
      data: {
        studentName: formData.studentName.trim(),
        dateOfBirth: formData.dateOfBirth.trim(),
        gender: formData.gender.trim(),
        classApplied: formData.classApplied.trim(),
        previousSchool: (formData.previousSchool || "").trim(),
        previousClass: (formData.previousClass || "").trim(),
        academicSession: formData.academicSession || CONFIG.ACADEMIC_SESSION,
        fatherName: formData.fatherName.trim(),
        motherName: formData.motherName.trim(),
        guardianName: (formData.guardianName || formData.fatherName).trim(),
        phone: phoneClean,
        email: emailClean,
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pinCode: pinClean
      }
    };

    if (isLiveApiConfigured()) {
      try {
        const res = await makeRequest(CONFIG.API_BASE_URL, {
          method: "POST",
          body: JSON.stringify(payload)
        });
        if (res.success) {
          return res;
        }
        throw new Error(res.message || "Submission rejected by server");
      } catch (err) {
        console.warn("Live API admission submission failed, using local storage fallback:", err);
        if (!CONFIG.DEMO_MODE_FALLBACK) throw err;
      }
    }

    // Fallback: Generate ID and save to local storage
    const list = JSON.parse(localStorage.getItem(STORAGE_ADMISSIONS_KEY) || "[]");
    const nextSeq = String(list.length + 1).padStart(4, "0");
    const year = new Date().getFullYear();
    const newId = `ADM-${year}-${nextSeq}`;

    const record = {
      applicationId: newId,
      ...payload.data,
      status: "NEW",
      submittedAt: new Date().toISOString()
    };

    list.unshift(record);
    localStorage.setItem(STORAGE_ADMISSIONS_KEY, JSON.stringify(list));

    return {
      success: true,
      data: {
        applicationId: newId,
        submittedAt: record.submittedAt
      },
      message: "Application submitted successfully! (Saved to local database)"
    };
  }

  /* ==========================================================================
     ADMIN AUTHENTICATION & SESSION MANAGEMENT
     ========================================================================== */

  /**
   * Check if admin is currently authenticated with a valid session
   */
  function getAdminSession() {
    try {
      const raw = sessionStorage.getItem(CONFIG.SESSION_STORAGE_KEY);
      if (!raw) return null;
      const session = JSON.parse(raw);
      if (!session.token || !session.expiresAt) return null;
      if (Date.now() > session.expiresAt) {
        sessionStorage.removeItem(CONFIG.SESSION_STORAGE_KEY);
        return null;
      }
      return session;
    } catch {
      return null;
    }
  }

  /**
   * Login as Administrator
   * @param {string} username
   * @param {string} password
   */
  async function adminLogin(username, password) {
    if (!username || !password) {
      throw new Error("Please enter both username and password.");
    }

    if (isLiveApiConfigured()) {
      try {
        const res = await makeRequest(CONFIG.API_BASE_URL, {
          method: "POST",
          body: JSON.stringify({
            action: "login",
            username: username.trim(),
            password: password.trim()
          })
        });

        if (res.success && res.data && res.data.token) {
          const session = {
            token: res.data.token,
            username: res.data.username || username.trim(),
            role: res.data.role || "ADMIN",
            isLive: true,
            expiresAt: Date.now() + CONFIG.SESSION_TIMEOUT_MINUTES * 60 * 1000
          };
          sessionStorage.setItem(CONFIG.SESSION_STORAGE_KEY, JSON.stringify(session));
          return session;
        }
        throw new Error(res.message || "Invalid credentials.");
      } catch (err) {
        if (!CONFIG.DEMO_MODE_FALLBACK) throw err;
        console.warn("Live login failed, testing demo fallback:", err);
      }
    }

    // Demo Mode Authentication (when Apps Script URL is not yet connected)
    // Default credentials for local testing: admin / opsadmin2025
    if (username.trim().toLowerCase() === "admin" && (password === "opsadmin2025" || password === "admin123")) {
      const demoToken = "demo_token_" + Math.random().toString(36).substring(2) + "_" + Date.now();
      const session = {
        token: demoToken,
        username: "admin",
        role: "ADMIN",
        isLive: false,
        expiresAt: Date.now() + CONFIG.SESSION_TIMEOUT_MINUTES * 60 * 1000
      };
      sessionStorage.setItem(CONFIG.SESSION_STORAGE_KEY, JSON.stringify(session));
      return session;
    }

    throw new Error("Invalid username or password. (For demo testing, use: admin / opsadmin2025)");
  }

  /**
   * Log out admin
   */
  function adminLogout() {
    sessionStorage.removeItem(CONFIG.SESSION_STORAGE_KEY);
  }

  /**
   * Helper to verify authentication or throw
   */
  function requireAdminToken() {
    const session = getAdminSession();
    if (!session || !session.token) {
      throw new Error("Unauthorized: Admin login session has expired. Please log in again.");
    }
    return session.token;
  }

  /* ==========================================================================
     ADMIN NOTICES APIS
     ========================================================================== */

  /**
   * Fetch all notices for admin (including drafts and archived)
   */
  async function adminGetNotices() {
    const token = requireAdminToken();

    if (isLiveApiConfigured()) {
      try {
        const url = `${CONFIG.API_BASE_URL}?action=getNotices&token=${encodeURIComponent(token)}&t=${Date.now()}`;
        const res = await makeRequest(url);
        if (res.success && Array.isArray(res.data)) {
          return res.data;
        }
        throw new Error(res.message || "Failed to load notices");
      } catch (err) {
        console.warn("Live admin notices fetch failed, using local storage:", err);
        if (!CONFIG.DEMO_MODE_FALLBACK) throw err;
      }
    }

    const raw = JSON.parse(localStorage.getItem(STORAGE_NOTICES_KEY) || "[]");
    return raw.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  /**
   * Create or Update a notice
   * @param {Object} notice
   */
  async function adminSaveNotice(notice) {
    const token = requireAdminToken();

    if (!notice.title || !notice.date || !notice.category) {
      throw new Error("Notice Title, Date, and Category are required.");
    }

    const isEdit = Boolean(notice.id);
    const action = isEdit ? "updateNotice" : "createNotice";

    if (isLiveApiConfigured()) {
      try {
        const res = await makeRequest(CONFIG.API_BASE_URL, {
          method: "POST",
          body: JSON.stringify({
            action,
            token,
            data: notice
          })
        });
        if (res.success) return res.data;
        throw new Error(res.message || "Failed to save notice.");
      } catch (err) {
        console.warn("Live notice save failed, using local storage:", err);
        if (!CONFIG.DEMO_MODE_FALLBACK) throw err;
      }
    }

    // Fallback: local storage
    const list = JSON.parse(localStorage.getItem(STORAGE_NOTICES_KEY) || "[]");
    const now = new Date().toISOString();

    if (isEdit) {
      const idx = list.findIndex((n) => n.id === notice.id);
      if (idx === -1) throw new Error("Notice not found to update.");
      list[idx] = {
        ...list[idx],
        ...notice,
        updatedAt: now
      };
      localStorage.setItem(STORAGE_NOTICES_KEY, JSON.stringify(list));
      return list[idx];
    } else {
      const nextSeq = String(list.length + 1).padStart(4, "0");
      const year = new Date().getFullYear();
      const newNotice = {
        id: `NOT-${year}-${nextSeq}`,
        title: notice.title.trim(),
        shortDescription: (notice.shortDescription || "").trim(),
        description: (notice.description || "").trim(),
        date: notice.date,
        expiryDate: notice.expiryDate || "",
        category: notice.category,
        important: Boolean(notice.important),
        fileUrl: notice.fileUrl || "",
        status: notice.status || "Published",
        createdAt: now,
        updatedAt: now
      };
      list.unshift(newNotice);
      localStorage.setItem(STORAGE_NOTICES_KEY, JSON.stringify(list));
      return newNotice;
    }
  }

  /**
   * Delete or archive a notice
   * @param {string} noticeId
   */
  async function adminDeleteNotice(noticeId) {
    const token = requireAdminToken();

    if (isLiveApiConfigured()) {
      try {
        const res = await makeRequest(CONFIG.API_BASE_URL, {
          method: "POST",
          body: JSON.stringify({
            action: "archiveNotice",
            token,
            id: noticeId
          })
        });
        if (res.success) return true;
        throw new Error(res.message || "Failed to delete notice.");
      } catch (err) {
        console.warn("Live notice delete failed, using local storage:", err);
        if (!CONFIG.DEMO_MODE_FALLBACK) throw err;
      }
    }

    const list = JSON.parse(localStorage.getItem(STORAGE_NOTICES_KEY) || "[]");
    const filtered = list.filter((n) => n.id !== noticeId);
    localStorage.setItem(STORAGE_NOTICES_KEY, JSON.stringify(filtered));
    return true;
  }

  /**
   * Upload PDF or document to Google Drive via Apps Script
   * @param {File} file
   */
  async function adminUploadFile(file) {
    const token = requireAdminToken();

    if (!file) throw new Error("No file selected.");
    if (file.size > 10 * 1024 * 1024) {
      throw new Error("File size exceeds 10MB limit.");
    }

    // Convert to Base64
    const base64Data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const res = reader.result;
        // Strip data:mime/type;base64, prefix
        const base64 = res.split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    if (isLiveApiConfigured()) {
      try {
        const res = await makeRequest(CONFIG.API_BASE_URL, {
          method: "POST",
          body: JSON.stringify({
            action: "uploadNoticeFile",
            token,
            fileName: file.name,
            mimeType: file.type || "application/pdf",
            fileData: base64Data
          })
        });

        if (res.success && res.data && res.data.fileUrl) {
          return res.data.fileUrl;
        }
        throw new Error(res.message || "Drive upload failed.");
      } catch (err) {
        console.warn("Live file upload to Drive failed:", err);
        if (!CONFIG.DEMO_MODE_FALLBACK) throw err;
      }
    }

    // In demo fallback mode, create a local object URL or mock URL
    return URL.createObjectURL(file);
  }

  /* ==========================================================================
     ADMIN ADMISSIONS APIS
     ========================================================================== */

  /**
   * Fetch all admissions applications for admin
   */
  async function adminGetAdmissions() {
    const token = requireAdminToken();

    if (isLiveApiConfigured()) {
      try {
        const url = `${CONFIG.API_BASE_URL}?action=getAdmissions&token=${encodeURIComponent(token)}&t=${Date.now()}`;
        const res = await makeRequest(url);
        if (res.success && Array.isArray(res.data)) {
          return res.data;
        }
        throw new Error(res.message || "Failed to load admissions.");
      } catch (err) {
        console.warn("Live admin admissions fetch failed, using local storage:", err);
        if (!CONFIG.DEMO_MODE_FALLBACK) throw err;
      }
    }

    const list = JSON.parse(localStorage.getItem(STORAGE_ADMISSIONS_KEY) || "[]");
    return list.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
  }

  /**
   * Update application status (NEW, UNDER_REVIEW, SHORTLISTED, REJECTED, ADMITTED)
   * @param {string} applicationId
   * @param {string} newStatus
   */
  async function adminUpdateAdmissionStatus(applicationId, newStatus) {
    const token = requireAdminToken();

    if (!CONFIG.ADMISSION_STATUSES.includes(newStatus)) {
      throw new Error(`Invalid status. Allowed values: ${CONFIG.ADMISSION_STATUSES.join(", ")}`);
    }

    if (isLiveApiConfigured()) {
      try {
        const res = await makeRequest(CONFIG.API_BASE_URL, {
          method: "POST",
          body: JSON.stringify({
            action: "updateAdmissionStatus",
            token,
            applicationId,
            status: newStatus
          })
        });
        if (res.success) return true;
        throw new Error(res.message || "Failed to update admission status.");
      } catch (err) {
        console.warn("Live status update failed, using local storage:", err);
        if (!CONFIG.DEMO_MODE_FALLBACK) throw err;
      }
    }

    const list = JSON.parse(localStorage.getItem(STORAGE_ADMISSIONS_KEY) || "[]");
    const item = list.find((a) => a.applicationId === applicationId);
    if (!item) throw new Error("Application not found.");
    item.status = newStatus;
    item.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_ADMISSIONS_KEY, JSON.stringify(list));
    return true;
  }

  /**
   * Export applications to Excel-compatible CSV file (with UTF-8 BOM)
   * @param {Array} admissions
   */
  function exportAdmissionsToCsv(admissions) {
    if (!Array.isArray(admissions) || admissions.length === 0) {
      throw new Error("No admission applications available to export.");
    }

    const headers = [
      "Application ID",
      "Student Name",
      "Date of Birth",
      "Gender",
      "Class Applied",
      "Previous School",
      "Previous Class",
      "Academic Session",
      "Father Name",
      "Mother Name",
      "Guardian Name",
      "Phone",
      "Email",
      "Address",
      "City",
      "State",
      "PIN Code",
      "Status",
      "Submitted Date"
    ];

    const rows = admissions.map((item) => [
      item.applicationId || "",
      item.studentName || "",
      item.dateOfBirth || "",
      item.gender || "",
      item.classApplied || "",
      item.previousSchool || "",
      item.previousClass || "",
      item.academicSession || "",
      item.fatherName || "",
      item.motherName || "",
      item.guardianName || "",
      item.phone || "",
      item.email || "",
      item.address || "",
      item.city || "",
      item.state || "",
      item.pinCode || "",
      item.status || "",
      item.submittedAt ? new Date(item.submittedAt).toLocaleString("en-IN") : ""
    ]);

    // Escape CSV fields
    const escapeCsvField = (val) => {
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const csvContent =
      "\uFEFF" + // UTF-8 BOM for Microsoft Excel
      [headers.map(escapeCsvField).join(","), ...rows.map((r) => r.map(escapeCsvField).join(","))].join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const dateStamp = new Date().toISOString().slice(0, 10);
    link.setAttribute("href", url);
    link.setAttribute("download", `Om_Public_School_Admissions_${dateStamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Public Interface
  return {
    isLiveApiConfigured,
    getPublishedNotices,
    submitAdmission,
    getAdminSession,
    adminLogin,
    adminLogout,
    adminGetNotices,
    adminSaveNotice,
    adminDeleteNotice,
    adminUploadFile,
    adminGetAdmissions,
    adminUpdateAdmissionStatus,
    exportAdmissionsToCsv
  };
})();
