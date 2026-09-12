# Google Apps Script Setup & Deployment Guide
### Om Public School — Database & API Configuration

Follow these exact steps to connect your free Google Sheets database and Google Drive storage to the website.

---

## Step 1: Create the Google Spreadsheet

1. Open [Google Sheets](https://sheets.google.com) and click **Blank spreadsheet**.
2. Rename the spreadsheet to: `Om Public School Database`.
3. Keep this browser tab open.

---

## Step 2: Open Apps Script Editor

1. In your spreadsheet, click **Extensions** in the top menu.
2. Select **Apps Script**.
3. A new tab will open with the Apps Script editor and a file named `Code.gs`.
4. Delete whatever default code is inside `Code.gs`.

---

## Step 3: Paste the Backend Code

1. Open [`apps-script/Code.gs`](file:///d:/New%20folder%20%289%29/apps-script/Code.gs) in this project.
2. Copy the entire file.
3. Paste it into the Apps Script editor tab.
4. Press `Ctrl + S` (or click the disk icon) to save.
5. Rename the Apps Script project at the top left from "Untitled project" to `Om Public School API`.

---

## Step 4: Run Initial Database Setup

1. In the toolbar at the top of the Apps Script editor, locate the function dropdown (it might say `doGet` or `myFunction`).
2. Select **`setupInitialDatabase`**.
3. Click the **Run** button (play icon).
4. An **"Authorization required"** modal will pop up:
   - Click **Review Permissions**.
   - Select your Google account.
   - You might see a screen saying *"Google hasn’t verified this app"*. Click **Advanced** (at the bottom left).
   - Click **Go to Om Public School API (unsafe)**.
   - Click **Allow**.
5. The function will run and log:
   ```
   Database initialized successfully!
   ```
6. Switch back to your Google Spreadsheet tab: You will see two sheets (`Notices` and `Admissions`) created with bold column headers!

---

## Step 5: Configure Script Properties (Admin Password & Drive Folder)

1. In the Apps Script editor, click the **Project Settings** (gear icon ⚙️) on the left sidebar.
2. Scroll down to the **Script Properties** section.
3. Click **Edit script properties** (or **Add script property**):
   
   | Property Name | Example Value | Description |
   |---|---|---|
   | `ADMIN_USERNAME` | `admin` | Username to log into the Admin Portal |
   | `ADMIN_PASSWORD` | `YourMasterPassword2025!` | Password to log into the Admin Portal |
   | `DRIVE_FOLDER_ID` | `1a2B3c4D5e...` | (Optional) Folder ID from Google Drive for notice PDFs |

4. Click **Save script properties**.

> [!NOTE]
> To find your `DRIVE_FOLDER_ID`: Create a folder in Google Drive named `Om Public School - Notice Documents`, open it, and copy the ID from the URL:
> `https://drive.google.com/drive/folders/YOUR_FOLDER_ID_HERE`

---

## Step 6: Deploy as Web App

1. In the top right corner of the Apps Script editor, click the blue **Deploy** button.
2. Click **New deployment**.
3. In the dialog, click the gear icon ⚙️ next to "Select type" and choose **Web app**.
4. Configure the settings:
   - **Description:** `Production Release 1.0`
   - **Execute as:** `Me (your-email@gmail.com)` *(DO NOT select "User accessing the web app")*
   - **Who has access:** `Anyone` *(DO NOT select "Only myself" or "Anyone with Google Account")*
5. Click **Deploy**.
6. Copy the **Web app URL**. It will look like:
   ```
   https://script.google.com/macros/s/AKfycbxAbCdEf1234567890/exec
   ```

---

## Step 7: Paste the Web App URL into Your Website

1. Open [`assets/js/config.js`](file:///d:/New%20folder%20%289%29/assets/js/config.js) in this project.
2. Paste the URL into `API_BASE_URL`:
   ```javascript
   const CONFIG = {
     API_BASE_URL: "https://script.google.com/macros/s/AKfycbxAbCdEf1234567890/exec",
     ...
   };
   ```
3. Save the file.
4. Refresh your website in the browser. You're completely live!

---

## Updating Backend Code in the Future

Whenever you edit `Code.gs`:
1. Save the file.
2. Click **Deploy** → **Manage deployments**.
3. Click the pencil icon ✏️ to edit.
4. Change **Version** to: **New version**.
5. Click **Deploy**.
*(Google Apps Script only serves new code when a new version is deployed!)*
