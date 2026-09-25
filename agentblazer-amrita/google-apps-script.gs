/**
 * ==============================================================================
 * AGENTBLAZER — Google Apps Script Backend
 * Amrita Vishwa Vidyapeetham, Amaravati
 * ==============================================================================
 * 
 * This script runs as a free Google Apps Script Web App attached to your Google Sheet.
 * It receives student registration submissions, appends them to the sheet,
 * and returns a JSON response.
 *
 * HOW TO SET THIS UP (STEP-BY-STEP):
 * ------------------------------------------------------------------------------
 * 1. Open Google Sheets (https://sheets.new) and create a new blank spreadsheet.
 * 2. Name the spreadsheet: "Agentblazer Registrations — Amrita Amaravati".
 * 3. In the menu bar, click: Extensions -> Apps Script.
 * 4. Delete any code currently in the Code.gs editor.
 * 5. Paste this entire file into the Apps Script editor.
 * 6. Click the Disk icon (Save) or press Ctrl+S / Cmd+S.
 * 7. Click the blue "Deploy" button (top right) -> "New deployment".
 * 8. Click the Gear icon (Select type) next to "Select type" and choose "Web app".
 * 9. Fill in the deployment configuration:
 *      - Description: "Agentblazer Registration API v1"
 *      - Execute as: "Me (your-email@gmail.com)"
 *      - Who has access: "Anyone"  <-- CRITICAL: Choose "Anyone" so students can submit!
 * 10. Click "Deploy".
 * 11. Authorize permissions when prompted by Google (Click Advanced -> Go to Untitled project / Allow).
 * 12. Copy the "Web app URL" (it ends with /exec).
 * 13. Paste this URL into script.js at:
 *      CONFIG.formSubmissionEndpoint = "PASTE_YOUR_WEB_APP_URL_HERE";
 * ==============================================================================
 */

// Define Column Headers exactly as required
const HEADERS = [
  "Timestamp",
  "Registration ID",
  "Full Name",
  "College Email",
  "Personal Email",
  "Contact Number",
  "WhatsApp Number",
  "Year",
  "Branch",
  "Section",
  "Interests",
  "Why Agentblazer",
  "AI Agent Idea"
];

const REGISTRATION_PREFIX = "AB-AMR";

/**
 * Handle incoming POST requests from the registration website
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(30000);

  try {
    const sheet = getOrCreateRegistrationSheet();
    
    // Parse incoming data
    let data;
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      data = e.parameter;
    } else {
      throw new Error("No data received in request.");
    }

    // Format Interests array to comma-separated string if passed as array
    let interestsString = "";
    if (Array.isArray(data.interests)) {
      interestsString = data.interests.join(", ");
    } else if (typeof data.interests === "string") {
      interestsString = data.interests;
    }

    // Generate unique sequential registration ID if not present
    let regId = data.registrationId;
    if (!regId) {
      const nextNum = Math.max(1, sheet.getLastRow()); // Row 2 = #0001
      const paddedNum = String(nextNum).padStart(4, "0");
      regId = `${REGISTRATION_PREFIX}-${paddedNum}`;
    }

    const timestamp = data.timestamp || new Date().toISOString();

    // Prepare row array matching HEADERS order
    const row = [
      timestamp,
      regId,
      data.fullName || "",
      data.collegeEmail || "",
      data.personalEmail || "",
      data.contactNumber || "",
      data.whatsappNumber || data.contactNumber || "",
      data.year || "",
      data.branch || "",
      data.section || "",
      interestsString,
      data.motivation || "",
      data.aiAgentIdea || ""
    ];

    // Append to sheet
    sheet.appendRow(row);

    // Return JSON success response
    const output = {
      status: "success",
      message: "Registration successfully recorded",
      registrationId: regId
    };

    return ContentService.createTextOutput(JSON.stringify(output))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Error processing registration: " + error.toString());
    const errorOutput = {
      status: "error",
      message: error.toString()
    };

    return ContentService.createTextOutput(JSON.stringify(errorOutput))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

/**
 * Handle GET requests for health-check verification in browser
 */
function doGet(e) {
  const output = {
    status: "online",
    club: "Agentblazer",
    campus: "Amrita Vishwa Vidyapeetham – Amaravati",
    message: "Google Apps Script registration backend is active and ready to receive POST submissions.",
    timestamp: new Date().toISOString()
  };

  return ContentService.createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Helper to get the active sheet and set up headers if not present
 */
function getOrCreateRegistrationSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Registrations");

  if (!sheet) {
    sheet = ss.getActiveSheet();
    sheet.setName("Registrations");
  }

  // If the sheet is brand new / empty, write and format the headers
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    
    // Style header row (Dark purple with bold white text)
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#312e81");
    headerRange.setFontColor("#ffffff");
    headerRange.setHorizontalAlignment("center");
    
    // Freeze header row
    sheet.setFrozenRows(1);
    
    // Auto-fit column widths
    for (let c = 1; c <= HEADERS.length; c++) {
      sheet.autoResizeColumn(c);
    }
  }

  return sheet;
}
