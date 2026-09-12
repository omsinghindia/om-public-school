/**
 * Om Public School - Central Configuration
 * Single source of truth for API endpoints, settings, and credentials management.
 */

const CONFIG = {
  // Google Apps Script Web App URL
  // Deploy your Google Apps Script as a Web App (Execute as: Me, Access: Anyone)
  API_BASE_URL: "https://script.google.com/macros/s/AKfycbxYqBjXYMvqBYOm_Lb9tutkr87zFLa004FixOpE2Oh-tcYGSJiWFum8MjS1nXF7qW0Z/exec",

  // School Information
  SCHOOL_NAME: "Om Public School",
  SCHOOL_AFFILIATION: "CBSE Affiliated No: 2130894 | School Code: 71203",
  ACADEMIC_SESSION: "2025-26",

  // Authentication & Session
  SESSION_STORAGE_KEY: "ops_admin_session",
  SESSION_TIMEOUT_MINUTES: 120,

  // Fallback / Demo Mode
  // If API_BASE_URL is empty, this enables local offline simulation with browser persistence,
  // allowing full end-to-end testing of notices, admissions, and admin panel before Google deployment.
  DEMO_MODE_FALLBACK: true,

  // Notice Categories
  NOTICE_CATEGORIES: [
    "General",
    "Admissions",
    "Examination",
    "Holiday",
    "Event",
    "Result",
    "Important"
  ],

  // Admission Statuses
  ADMISSION_STATUSES: [
    "NEW",
    "UNDER_REVIEW",
    "SHORTLISTED",
    "REJECTED",
    "ADMITTED"
  ]
};

// Freeze configuration to avoid accidental modification
if (typeof Object.freeze === "function") {
  Object.freeze(CONFIG.NOTICE_CATEGORIES);
  Object.freeze(CONFIG.ADMISSION_STATUSES);
}
