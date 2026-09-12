# Om Public School — Complete Setup & Deployment Manual
### Notice Management + Admission System (Google Apps Script / Sheets / Drive)

This guide walks you through setting up and deploying the dynamic **Notice Management System** and **Admission Application & Admin System** for **Om Public School**.

---

## Architecture Overview

```
PUBLIC WEBSITE / ADMIN DASHBOARD / FUTURE ANDROID APP
                           │
                           ▼
              GOOGLE APPS SCRIPT WEB APP API
               (doGet / doPost Endpoints)
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
      GOOGLE SPREADSHEET          GOOGLE DRIVE
    - Sheet: "Notices"           - Folder: "Om Public School - Notice Documents"
    - Sheet: "Admissions"          (Notice PDFs & Circulars)
```

**Free Tier Benefits:**
- **Zero Database Costs:** No monthly charges, no Supabase, Firebase, AWS, or MongoDB Atlas fees.
- **Direct Excel / Sheets Compatibility:** Admins can view or edit directly in Google Sheets or download `.csv` / `.xlsx`.
- **Android App Compatibility:** The same Google Apps Script API endpoints return clean JSON for the future Android mobile application.

---

## 1. How to Create the Google Spreadsheet

1. Open your web browser and navigate to [Google Sheets](https://sheets.google.com).
2. Click **+ Blank spreadsheet**.
3. Name your spreadsheet: `Om Public School Database`.
4. Copy the Spreadsheet ID from the browser URL (the long string between `/d/` and `/edit`):
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID_HERE/edit
   ```

---

## 2. Required Sheet Names

Create two sheets (tabs) in the spreadsheet:
1. **`Notices`** (Case sensitive)
2. **`Admissions`** (Case sensitive)

*(Note: If you run the auto-initialization function in Step 4, these sheets and their header rows will be created automatically.)*

---

## 3. Required Column Headers

### Sheet 1: `Notices` (Row 1 Headers)
| Col # | Column Name | Type | Description |
|---|---|---|---|
| A | `id` | String | Unique Notice ID (e.g., `NOT-2025-0001`) |
| B | `title` | String | Full title of the circular / notice |
| C | `shortDescription` | String | Excerpt / summary for news ticker & previews |
| D | `description` | String | Full detailed notice text |
| E | `date` | Date (YYYY-MM-DD) | Date of publication |
| F | `expiryDate` | Date (YYYY-MM-DD) | Optional expiration date |
| G | `category` | String | General, Admissions, Examination, Holiday, Event, Result |
| H | `important` | Boolean | `true` or `false` (Priority highlight) |
| I | `fileUrl` | String | Google Drive link or external PDF URL |
| J | `status` | String | `Published`, `Draft`, or `Archived` |
| K | `createdAt` | ISO Timestamp | Creation timestamp |
| L | `updatedAt` | ISO Timestamp | Last modification timestamp |

### Sheet 2: `Admissions` (Row 1 Headers)
| Col # | Column Name | Type | Description |
|---|---|---|---|
| A | `applicationId` | String | Generated sequential ID (e.g. `ADM-2026-0001`) |
| B | `studentName` | String | Student's full legal name |
| C | `dateOfBirth` | Date | Date of birth (YYYY-MM-DD) |
| D | `gender` | String | Male, Female, Other |
| E | `classApplied` | String | Target class (e.g. Nursery, Class 11 Science) |
| F | `previousSchool` | String | Name of school last attended |
| G | `previousClass` | String | Last grade and percentage |
| H | `academicSession` | String | Session (e.g. `2025-26`) |
| I | `fatherName` | String | Father's name |
| J | `motherName` | String | Mother's name |
| K | `guardianName` | String | Guardian name |
| L | `phone` | String | Primary 10-digit mobile number |
| M | `email` | String | Primary contact email address |
| N | `address` | String | House number and street address |
| O | `city` | String | City (e.g., Varanasi) |
| P | `state` | String | State (e.g., Uttar Pradesh) |
| Q | `pinCode` | String | 6-digit postal PIN code |
| R | `status` | String | `NEW`, `UNDER_REVIEW`, `SHORTLISTED`, `ADMITTED`, `REJECTED` |
| S | `submittedAt` | ISO Timestamp | Application submission date and time |

---

## 4. How to Create the Google Apps Script

1. In your Google Spreadsheet, click **Extensions** in the top menu bar.
2. Select **Apps Script**.
3. Clear any placeholder code in `Code.gs`.
4. Open [`apps-script/Code.gs`](file:///d:/New%20folder%20%289%29/apps-script/Code.gs) from this project, copy its entire contents, and paste it into the editor.
5. In the toolbar, select the function dropdown, choose **`setupInitialDatabase`**, and click **Run**.
6. Google will ask for authorization on the first run. Click **Review Permissions**, choose your Google account, click **Advanced**, and click **Go to Om Public School API (unsafe)**, then **Allow**.
7. Look at the Execution Log: It should print `Database initialized successfully!`. Check your Google Spreadsheet — both `Notices` and `Admissions` sheets will have been created with bold header columns.

---

## 5. How to Deploy Apps Script as a Web App

1. In the Apps Script editor, click the blue **Deploy** button (top right) → **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in the deployment details:
   - **Description:** `Om Public School Production API v1`
   - **Execute as:** `Me (your-email@gmail.com)` *(Crucial: Allows the script to access Sheets and Drive)*
   - **Who has access:** `Anyone` *(Crucial: Allows the website and mobile app to submit forms and view published notices without Google login)*
4. Click **Deploy**.
5. Copy the generated **Web App URL**. It looks like:
   ```
   https://script.google.com/macros/s/AKfycbx_abc123.../exec
   ```

---

## 6. Required Deployment Settings Checklist

- [x] **Execute as:** `Me` (Do not select "User accessing the web app")
- [x] **Who has access:** `Anyone` (Do not select "Only myself" or "Anyone with Google account")
- [x] **New Versions:** Whenever you modify `Code.gs`, click **Deploy** → **Manage deployments** → Edit icon → choose **Version: New version** → **Deploy**.

---

## 7. How to Configure the API URL in the Website

1. Open [`assets/js/config.js`](file:///d:/New%20folder%20%289%29/assets/js/config.js).
2. Find `API_BASE_URL` on line 9 and paste your Web App URL between the quotes:
   ```javascript
   const CONFIG = {
     API_BASE_URL: "https://script.google.com/macros/s/AKfycbx_abc123.../exec",
     ...
   };
   ```
3. Save the file. The website and admin dashboard are now fully connected to your Google Spreadsheet and Google Drive!

---

## 8. How to Create the Google Drive Folder for Notice Files

1. Go to [Google Drive](https://drive.google.com).
2. Click **New** → **New folder**. Name it: `Om Public School - Notice Documents`.
3. Right click the folder → **Share** → under *General access*, choose **Anyone with the link** can be **Viewer**.
4. Open the folder and copy the Folder ID from the URL:
   ```
   https://drive.google.com/drive/folders/YOUR_FOLDER_ID_HERE
   ```
5. In your Apps Script editor, go to **Project Settings** (gear icon on the left).
6. Scroll down to **Script Properties** → Click **Add script property**:
   - **Property:** `DRIVE_FOLDER_ID`
   - **Value:** Paste your folder ID
7. Click **Save script properties**. Notice PDF uploads will now be automatically saved inside this Google Drive folder!

---

## 9. How to Configure Admin Authentication

1. In your Apps Script editor, go to **Project Settings** (gear icon on the left).
2. Under **Script Properties**, add:
   - **Property:** `ADMIN_USERNAME` | **Value:** `admin` (or your preferred username)
   - **Property:** `ADMIN_PASSWORD` | **Value:** `YourSecurePassword2025!`
3. Click **Save script properties**.
4. **Security Notice:** The admin credentials exist strictly inside Google's secure server environment. The frontend code never contains this password; it sends credentials securely to Apps Script, which verifies them and returns an authenticated session token.

---

## 10. How to Test Locally

1. Open your terminal in `d:\New folder (9)\`.
2. Start the local static server:
   ```powershell
   python -m http.server 8080
   ```
3. Open your browser:
   - **Public Website:** `http://localhost:8080`
   - **Admin Portal:** `http://localhost:8080/admin/` or `http://localhost:8080/admin.html`
4. **Local Demo Testing:** If `API_BASE_URL` in `assets/js/config.js` is left empty, the site automatically operates in **Demo Fallback Mode** with browser persistence:
   - Admin login: `admin` / `opsadmin2025`
   - Test creating a notice and submitting an application. Everything works immediately!

---

## 11. How to Deploy the Website

Because this project is pure HTML, CSS, and modern JavaScript with no build steps, you can deploy it to any static host for free:

### Option A: GitHub Pages (Free)
1. Push your repository to GitHub.
2. In GitHub, go to **Settings** → **Pages**.
3. Under *Branch*, choose `main` and root folder `/` → Click **Save**.
4. Your site will be live at `https://yourusername.github.io/repository-name/`.

### Option B: Netlify / Vercel (Free)
1. Drag and drop the `d:\New folder (9)` folder directly onto [app.netlify.com/drop](https://app.netlify.com/drop).
2. Done! Your site is live instantly with free SSL.

---

## 12. How to Connect Your Custom Domain

1. If you own a domain like `ompublicschool.in`:
2. In your DNS provider (e.g. GoDaddy, Hostinger, Namecheap), add an `A` record pointing to your host IP, or a `CNAME` record pointing to your GitHub Pages / Netlify URL.
3. In `assets/js/config.js`, no change is needed! Google Apps Script handles requests from any origin automatically.

---

## 13. How to Add the First Admin

1. In Apps Script **Project Settings** → **Script Properties**:
   - Set `ADMIN_USERNAME` to your email or preferred username (e.g. `principal_ops`).
   - Set `ADMIN_PASSWORD` to your secure master password.
2. Go to `http://localhost:8080/admin.html`.
3. Enter the username and password, then click **Sign In to Admin Portal**.

---

## 14. How to Add the First Notice

1. Log in to the Admin Portal (`/admin` or `admin.html`).
2. Click the **📋 Notices & Circulars** tab.
3. Click **➕ Add New Notice**.
4. Fill in:
   - **Title:** `Annual Sports Day Schedule Announced`
   - **Category:** `Event`
   - **Status:** `Published`
   - **Publish Date:** Today's date
   - **Full Notice Content:** Enter circular details.
   - **Priority:** Check `⭐ Highlight as Priority / Important Notice`.
   - **Attach PDF Document:** Click the upload box to upload a PDF directly to Google Drive.
5. Click **Save Notice**.
6. Switch to the public website (`http://localhost:8080/#notices`): The notice appears dynamically at the top with a priority badge, view details button, and PDF download button!

---

## 15. How to Test an Admission Submission

1. Go to the public website: `http://localhost:8080`.
2. Click **Admissions** in the navigation bar.
3. Click the **Online Enquiry / Form** tab.
4. Fill in all fields:
   - Student Full Name: `Aditya Sharma`
   - Date of Birth: `2014-06-12`
   - Gender: `Male`
   - Applying For Class: `Middle School (Class 6 to 8)`
   - Father's Name: `Manish Sharma`
   - Mother's Name: `Rekha Sharma`
   - Mobile: `9876543210`
   - Email: `manish.sharma@example.com`
   - Address: `B-12, Lanka, Varanasi`
   - City: `Varanasi`, State: `Uttar Pradesh`, PIN: `221005`
   - Security Verification: `5 + 3 = 8`
5. Click **Submit Admission Application**.
6. The confirmation screen appears with:
   ```
   Application Number: ADM-2026-0001
   ```
7. Open the Admin Portal → **🎓 Admission Applications**: The application is listed with full details!

---

## 16. How to Download Excel Data

1. Log in to the Admin Portal (`admin.html`).
2. Go to the **🎓 Admission Applications** tab.
3. Click the green **📥 Download Excel / CSV** button.
4. A file named `Om_Public_School_Admissions_YYYY-MM-DD.csv` will download immediately.
5. The file includes a UTF-8 BOM, meaning it opens in Microsoft Excel and Google Sheets without encoding glitches or misaligned columns.
