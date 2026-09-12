/**
 * ==============================================================================
 * OM PUBLIC SCHOOL - GOOGLE APPS SCRIPT BACKEND API (v2.0)
 * ==============================================================================
 * Architecture:
 *   Frontend (Web / Admin / Android) -> Google Apps Script -> Google Sheets & Drive
 * 
 * Free Google Cloud / Workspace Database:
 *   - Google Sheet: "Notices"
 *   - Google Sheet: "Admissions"
 *   - Google Drive Folder: "Om Public School - Notice Documents"
 * 
 * Deployment Instructions:
 *   1. Create a Google Spreadsheet (e.g., "Om Public School Database")
 *   2. Go to Extensions -> Apps Script
 *   3. Paste this entire file into Code.gs
 *   4. Run the function `setupInitialDatabase()` once to create sheets and columns
 *   5. Set Script Properties (Project Settings -> Script Properties):
 *      - ADMIN_USERNAME (e.g. admin)
 *      - ADMIN_PASSWORD (e.g. your secure password)
 *      - DRIVE_FOLDER_ID (Google Drive folder ID for notice PDFs)
 *   6. Click Deploy -> New deployment -> Web app:
 *      - Execute as: Me (your Google account)
 *      - Who has access: Anyone
 *   7. Copy the Web App URL and paste it into `assets/js/config.js` as `API_BASE_URL`
 * ==============================================================================
 */

// Global Sheet Names
const SHEET_NOTICES = "Notices";
const SHEET_ADMISSIONS = "Admissions";

// Column Definitions
const NOTICES_COLUMNS = [
  "id",
  "title",
  "shortDescription",
  "description",
  "date",
  "expiryDate",
  "category",
  "important",
  "fileUrl",
  "status",
  "createdAt",
  "updatedAt"
];

const ADMISSIONS_COLUMNS = [
  "applicationId",
  "studentName",
  "dateOfBirth",
  "gender",
  "classApplied",
  "previousSchool",
  "previousClass",
  "academicSession",
  "fatherName",
  "motherName",
  "guardianName",
  "phone",
  "email",
  "address",
  "city",
  "state",
  "pinCode",
  "status",
  "submittedAt"
];

/**
 * Handle HTTP GET Requests
 */
function doGet(e) {
  try {
    const params = e ? e.parameter : {};
    const action = params.action || "checkHealth";

    if (action === "checkHealth") {
      return jsonResponse({
        success: true,
        message: "Om Public School API is healthy and operational.",
        timestamp: new Date().toISOString()
      });
    }

    if (action === "getPublishedNotices") {
      const notices = getPublishedNoticesList();
      return jsonResponse({
        success: true,
        data: notices,
        count: notices.length
      });
    }

    if (action === "getNotices") {
      verifyAdminToken(params.token);
      const notices = getAllNoticesList();
      return jsonResponse({
        success: true,
        data: notices,
        count: notices.length
      });
    }

    if (action === "getAdmissions") {
      verifyAdminToken(params.token);
      const admissions = getAllAdmissionsList();
      return jsonResponse({
        success: true,
        data: admissions,
        count: admissions.length
      });
    }

    return jsonResponse({
      success: false,
      message: "Invalid action requested: " + action
    });
  } catch (error) {
    return jsonResponse({
      success: false,
      message: error.message || "An error occurred during GET processing."
    });
  }
}

/**
 * Handle HTTP POST Requests
 */
function doPost(e) {
  try {
    let payload;
    if (e && e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else {
      payload = e && e.parameter ? e.parameter : {};
    }

    const action = payload.action;

    // 1. Admin Login
    if (action === "login") {
      const username = payload.username;
      const password = payload.password;
      const session = authenticateAdmin(username, password);
      return jsonResponse({
        success: true,
        data: session,
        message: "Login successful."
      });
    }

    // 2. Public Admission Application Submission
    if (action === "createAdmission") {
      const admissionData = payload.data || payload;
      const result = processAdmissionSubmission(admissionData);
      return jsonResponse({
        success: true,
        data: result,
        message: "Application submitted successfully."
      });
    }

    // 3. Admin Notice Creation
    if (action === "createNotice") {
      verifyAdminToken(payload.token);
      const noticeData = payload.data;
      const newNotice = insertNotice(noticeData);
      return jsonResponse({
        success: true,
        data: newNotice,
        message: "Notice created successfully."
      });
    }

    // 4. Admin Notice Update
    if (action === "updateNotice") {
      verifyAdminToken(payload.token);
      const noticeData = payload.data;
      const updatedNotice = updateNoticeRow(noticeData);
      return jsonResponse({
        success: true,
        data: updatedNotice,
        message: "Notice updated successfully."
      });
    }

    // 5. Admin Notice Archive / Delete
    if (action === "archiveNotice") {
      verifyAdminToken(payload.token);
      const noticeId = payload.id;
      archiveNoticeRow(noticeId);
      return jsonResponse({
        success: true,
        message: "Notice archived successfully."
      });
    }

    // 6. Admin Admission Status Update
    if (action === "updateAdmissionStatus") {
      verifyAdminToken(payload.token);
      const appId = payload.applicationId;
      const status = payload.status;
      updateAdmissionStatusRow(appId, status);
      return jsonResponse({
        success: true,
        message: "Admission status updated to " + status
      });
    }

    // 7. Admin Notice File Upload to Google Drive
    if (action === "uploadNoticeFile") {
      verifyAdminToken(payload.token);
      const fileUrl = uploadFileToGoogleDrive(
        payload.fileName,
        payload.mimeType,
        payload.fileData
      );
      return jsonResponse({
        success: true,
        data: { fileUrl: fileUrl },
        message: "File uploaded to Google Drive successfully."
      });
    }

    // 8. Initialize / Repair Sheets
    if (action === "initSheets") {
      verifyAdminToken(payload.token);
      setupInitialDatabase();
      return jsonResponse({
        success: true,
        message: "Database sheets initialized successfully."
      });
    }

    return jsonResponse({
      success: false,
      message: "Unrecognized POST action: " + action
    });
  } catch (error) {
    return jsonResponse({
      success: false,
      message: error.message || "An error occurred during POST processing."
    });
  }
}

/* ==========================================================================
   AUTHENTICATION & SECURITY
   ========================================================================== */

/**
 * Authenticate Admin against Script Properties
 */
function authenticateAdmin(username, password) {
  const props = PropertiesService.getScriptProperties();
  const validUser = props.getProperty("ADMIN_USERNAME") || "admin";
  const validPass = props.getProperty("ADMIN_PASSWORD") || "opsadmin2025";

  if (!username || !password) {
    throw new Error("Username and password are required.");
  }

  if (username.trim() === validUser && password.trim() === validPass) {
    // Generate secure time-bounded session token
    const token = Utilities.getUuid() + "_" + Date.now();
    const cache = CacheService.getScriptCache();
    // Cache token for 4 hours (14400 seconds)
    cache.put("AUTH_TOKEN_" + token, username, 14400);

    return {
      token: token,
      username: username,
      role: "ADMIN",
      expiresIn: 14400
    };
  }

  throw new Error("Invalid username or password.");
}

/**
 * Verify Admin Token for Protected Operations
 */
function verifyAdminToken(token) {
  if (!token) {
    throw new Error("Unauthorized: Access token missing.");
  }

  const cache = CacheService.getScriptCache();
  const cachedUser = cache.get("AUTH_TOKEN_" + token);

  // Fallback: If token was issued in this session and cache missed, verify structure
  if (!cachedUser) {
    // Check if token matches format and is within 4 hours
    const parts = token.split("_");
    if (parts.length >= 2) {
      const timestamp = parseInt(parts[parts.length - 1], 10);
      const fourHoursMs = 4 * 60 * 60 * 1000;
      if (!isNaN(timestamp) && (Date.now() - timestamp < fourHoursMs)) {
        return true;
      }
    }
    throw new Error("Unauthorized: Session has expired. Please log in again.");
  }

  return true;
}

/* ==========================================================================
   SPREADSHEET RESOLUTION HELPER (BOUND OR STANDALONE)
   ========================================================================== */

function getActiveOrBoundSpreadsheet() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss) return ss;
  } catch (e) {
    // Ignore and try fallback
  }

  // Fallback: In case the script is standalone, check Script Properties
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty("SPREADSHEET_ID");
  if (id) {
    return SpreadsheetApp.openById(id);
  }

  throw new Error(
    "Cannot find active Spreadsheet! Make sure you opened this script from inside your Google Sheet via 'Extensions -> Apps Script', OR add your SPREADSHEET_ID in Project Settings -> Script Properties."
  );
}

/* ==========================================================================
   NOTICE MANAGEMENT (SHEET: "Notices")
   ========================================================================== */

function getNoticesSheet() {
  const ss = getActiveOrBoundSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NOTICES);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NOTICES);
    sheet.appendRow(NOTICES_COLUMNS);
    sheet.getRange(1, 1, 1, NOTICES_COLUMNS.length).setFontWeight("bold");
  }
  return sheet;
}

function getAllNoticesList() {
  const sheet = getNoticesSheet();
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];

  const headers = rows[0];
  const list = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const item = {};
    for (let j = 0; j < headers.length; j++) {
      item[headers[j]] = row[j];
    }
    // Ensure important is boolean
    item.important = item.important === true || item.important === "true";
    list.push(item);
  }

  return list.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function getPublishedNoticesList() {
  const all = getAllNoticesList();
  const today = Utilities.formatDate(new Date(), "GMT+05:30", "yyyy-MM-dd");

  return all.filter((item) => {
    if (item.status !== "Published") return false;
    if (item.expiryDate && item.expiryDate < today) return false;
    return true;
  });
}

function insertNotice(notice) {
  if (!notice.title || !notice.date || !notice.category) {
    throw new Error("Title, Date, and Category are required for a notice.");
  }

  const sheet = getNoticesSheet();
  const all = getAllNoticesList();
  const currentYear = new Date().getFullYear();
  const newId = "NOT-" + currentYear + "-" + padZero(all.length + 1, 4);
  const now = new Date().toISOString();

  const newRow = [
    newId,
    notice.title.trim(),
    notice.shortDescription || "",
    notice.description || "",
    notice.date,
    notice.expiryDate || "",
    notice.category,
    notice.important ? true : false,
    notice.fileUrl || "",
    notice.status || "Published",
    now,
    now
  ];

  sheet.appendRow(newRow);

  return {
    id: newId,
    title: notice.title.trim(),
    shortDescription: notice.shortDescription || "",
    description: notice.description || "",
    date: notice.date,
    expiryDate: notice.expiryDate || "",
    category: notice.category,
    important: notice.important ? true : false,
    fileUrl: notice.fileUrl || "",
    status: notice.status || "Published",
    createdAt: now,
    updatedAt: now
  };
}

function updateNoticeRow(notice) {
  if (!notice.id) throw new Error("Notice ID is required for update.");
  const sheet = getNoticesSheet();
  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === notice.id) {
      const now = new Date().toISOString();
      const rowNum = i + 1;

      // Update columns
      sheet.getRange(rowNum, 2).setValue(notice.title || rows[i][1]);
      sheet.getRange(rowNum, 3).setValue(notice.shortDescription !== undefined ? notice.shortDescription : rows[i][2]);
      sheet.getRange(rowNum, 4).setValue(notice.description !== undefined ? notice.description : rows[i][3]);
      sheet.getRange(rowNum, 5).setValue(notice.date || rows[i][4]);
      sheet.getRange(rowNum, 6).setValue(notice.expiryDate !== undefined ? notice.expiryDate : rows[i][5]);
      sheet.getRange(rowNum, 7).setValue(notice.category || rows[i][6]);
      sheet.getRange(rowNum, 8).setValue(notice.important ? true : false);
      sheet.getRange(rowNum, 9).setValue(notice.fileUrl !== undefined ? notice.fileUrl : rows[i][8]);
      sheet.getRange(rowNum, 10).setValue(notice.status || rows[i][9]);
      sheet.getRange(rowNum, 12).setValue(now);

      return {
        id: notice.id,
        ...notice,
        updatedAt: now
      };
    }
  }

  throw new Error("Notice with ID " + notice.id + " not found.");
}

function archiveNoticeRow(noticeId) {
  if (!noticeId) throw new Error("Notice ID is required to archive.");
  const sheet = getNoticesSheet();
  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === noticeId) {
      sheet.getRange(i + 1, 10).setValue("Archived");
      sheet.getRange(i + 1, 12).setValue(new Date().toISOString());
      return true;
    }
  }

  throw new Error("Notice not found.");
}

/* ==========================================================================
   ADMISSION MANAGEMENT (SHEET: "Admissions")
   ========================================================================== */

function getAdmissionsSheet() {
  const ss = getActiveOrBoundSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_ADMISSIONS);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_ADMISSIONS);
    sheet.appendRow(ADMISSIONS_COLUMNS);
    sheet.getRange(1, 1, 1, ADMISSIONS_COLUMNS.length).setFontWeight("bold");
  }
  return sheet;
}

function getAllAdmissionsList() {
  const sheet = getAdmissionsSheet();
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];

  const headers = rows[0];
  const list = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const item = {};
    for (let j = 0; j < headers.length; j++) {
      item[headers[j]] = row[j];
    }
    list.push(item);
  }

  return list.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
}

function processAdmissionSubmission(data) {
  // Validation
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

  for (let i = 0; i < required.length; i++) {
    const f = required[i];
    if (!data[f] || String(data[f]).trim() === "") {
      throw new Error("Validation Error: " + f + " is required.");
    }
  }

  const phone = String(data.phone).trim().replace(/\D/g, "");
  if (!/^[6-9]\d{9}$/.test(phone)) {
    throw new Error("Validation Error: Please enter a valid 10-digit Indian mobile number.");
  }

  const email = String(data.email).trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Validation Error: Please enter a valid email address.");
  }

  const pinCode = String(data.pinCode).trim();
  if (!/^[1-9][0-9]{5}$/.test(pinCode)) {
    throw new Error("Validation Error: Please enter a valid 6-digit PIN code.");
  }

  const sheet = getAdmissionsSheet();
  const all = getAllAdmissionsList();
  const currentYear = new Date().getFullYear();
  const newAppId = "ADM-" + currentYear + "-" + padZero(all.length + 1, 4);
  const now = new Date().toISOString();

  const newRow = [
    newAppId,
    data.studentName.trim(),
    data.dateOfBirth.trim(),
    data.gender.trim(),
    data.classApplied.trim(),
    data.previousSchool ? data.previousSchool.trim() : "",
    data.previousClass ? data.previousClass.trim() : "",
    data.academicSession || "2025-26",
    data.fatherName.trim(),
    data.motherName.trim(),
    data.guardianName ? data.guardianName.trim() : data.fatherName.trim(),
    phone,
    email,
    data.address.trim(),
    data.city.trim(),
    data.state.trim(),
    pinCode,
    "NEW",
    now
  ];

  sheet.appendRow(newRow);

  return {
    applicationId: newAppId,
    studentName: data.studentName.trim(),
    classApplied: data.classApplied.trim(),
    submittedAt: now
  };
}

function updateAdmissionStatusRow(applicationId, newStatus) {
  const allowed = ["NEW", "UNDER_REVIEW", "SHORTLISTED", "REJECTED", "ADMITTED"];
  if (!allowed.includes(newStatus)) {
    throw new Error("Invalid status: " + newStatus);
  }

  const sheet = getAdmissionsSheet();
  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === applicationId) {
      // Column index 18 is 'status' (1-based index)
      sheet.getRange(i + 1, 18).setValue(newStatus);
      return true;
    }
  }

  throw new Error("Application " + applicationId + " not found.");
}

/* ==========================================================================
   GOOGLE DRIVE FILE STORAGE
   ========================================================================== */

function uploadFileToGoogleDrive(fileName, mimeType, base64Data) {
  if (!base64Data) throw new Error("File content is missing.");

  const props = PropertiesService.getScriptProperties();
  const folderId = props.getProperty("DRIVE_FOLDER_ID");

  let folder;
  if (folderId) {
    folder = DriveApp.getFolderById(folderId);
  } else {
    // Look for or create folder in root
    const folders = DriveApp.getFoldersByName("Om Public School - Notice Documents");
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder("Om Public School - Notice Documents");
    }
  }

  const decodedBytes = Utilities.base64Decode(base64Data);
  const blob = Utilities.newBlob(decodedBytes, mimeType || "application/pdf", fileName || "Notice_Document.pdf");
  const file = folder.createFile(blob);

  // Set permission to anyone with link can view
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  // Return direct download/view URL
  return file.getUrl();
}

/* ==========================================================================
   INITIAL DATABASE SETUP & UTILITIES
   ========================================================================== */

/**
 * Run this function once from Apps Script Editor to set up the Spreadsheet
 */
function setupInitialDatabase() {
  getNoticesSheet();
  getAdmissionsSheet();

  // Populate initial admin credentials if not already set
  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty("ADMIN_USERNAME")) {
    props.setProperty("ADMIN_USERNAME", "admin");
  }
  if (!props.getProperty("ADMIN_PASSWORD")) {
    props.setProperty("ADMIN_PASSWORD", "opsadmin2025");
  }

  Logger.log("Database initialized successfully!");
}

function padZero(num, size) {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}
