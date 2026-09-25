# ⚡ AGENTBLAZER — Amrita Vishwa Vidyapeetham, Amaravati
### Student Technology Community Registration Portal

Welcome to the official registration portal codebase for **Agentblazer** at **Amrita Vishwa Vidyapeetham, Amaravati**.

This project is built using pure **HTML5, CSS3, and Vanilla JavaScript**. It requires **no node modules, no server backend, no authentication library, no database setup, and zero paid services**. It can be deployed in under 2 minutes for 100% free.

---

## 📁 Project Structure

```
agentblazer-amrita/
├── index.html              # Main responsive single-page application
├── style.css               # Futuristic cyberpunk dark theme styling
├── script.js               # Multi-step wizard, client-side validation, state & submission
├── google-apps-script.gs   # Free Google Sheets backend endpoint script
└── README.md               # Complete setup, deployment, and configuration guide
```

---

## 🚀 1. How to Run Locally (Quick Test)

You do **NOT** need to install Node.js, npm, or Docker to run this website.

### Method A: Direct Browser Opening (Fastest)
1. Navigate to the `agentblazer-amrita/` folder.
2. Double-click `index.html` (or right-click -> Open With -> Chrome / Edge / Safari / Brave).
3. The website is immediately fully functional in your browser!

### Method B: Using Any Local Server (Recommended for development)
If you prefer a local HTTP server:
- **VS Code**: Install the "Live Server" extension, right-click `index.html` and choose **"Open with Live Server"**.
- **Python**: Run `python3 -m http.server 3000` in the directory.
- **Node.js**: Run `npx serve .`

---

## ⚙️ 2. Configuration Settings

All configurations are located right at the top of **`script.js`**:

```javascript
const CONFIG = {
  clubName: "Agentblazer",
  campusName: "Amrita Vishwa Vidyapeetham – Amaravati",
  registrationPrefix: "AB-AMR",
  
  // 1. SET OFFICIAL AMRITA EMAIL DOMAIN HERE:
  collegeEmailDomain: "REPLACE_WITH_OFFICIAL_AMRITA_DOMAIN",
  
  // 2. SET GOOGLE APPS SCRIPT WEB APP URL HERE:
  formSubmissionEndpoint: "REPLACE_WITH_GOOGLE_APPS_SCRIPT_URL"
};
```

### A. Official Amrita Email Domain
Replace `"REPLACE_WITH_OFFICIAL_AMRITA_DOMAIN"` with your campus student email domain:
- Example: `"am.students.amrita.edu"` or `"amaravati.amrita.edu"`
- Once configured, any student email not ending in `@your-domain` will display:
  `"Please enter your official Amrita college email ID."`

### B. Google Apps Script Web App URL
Replace `"REPLACE_WITH_GOOGLE_APPS_SCRIPT_URL"` with your deployed Apps Script URL (instructions below).
- When left as the placeholder, the website operates in **Development Mode**: submissions are safely logged to the console and preserved in browser `localStorage`.

---

## 📊 3. How to Connect Google Sheets (Free Database)

You will use Google Apps Script as a serverless backend that receives submissions and appends them to a Google Sheet.

### Step 1: Create the Google Sheet
1. Go to [Google Sheets](https://sheets.new) and create a new blank spreadsheet.
2. Title the spreadsheet: **"Agentblazer Registrations — Amrita Amaravati"**.

### Step 2: Open Google Apps Script
1. In the top menu, click **Extensions** → **Apps Script**.
2. A code editor will open. Select and delete any code inside `Code.gs`.

### Step 3: Paste Backend Script
1. Copy all the contents of **`google-apps-script.gs`** from this project.
2. Paste it into the Apps Script editor.
3. Click the **Save** floppy disk icon (or `Ctrl + S` / `Cmd + S`).

### Step 4: Deploy as a Web App
1. Click the blue **Deploy** button at top right → **New deployment**.
2. In the modal that opens, click the **Gear icon** (Select type) next to "Select type" and choose **Web app**.
3. Set the fields:
   - **Description**: `Agentblazer Registration v1`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone` *(CRITICAL: Must be "Anyone" so students can submit without signing into Google)*
4. Click **Deploy**.
5. Google will ask you to authorize access:
   - Click **Authorize access**.
   - Choose your Google account.
   - Click **Advanced** (small link at bottom left).
   - Click **Go to Untitled project (unsafe)**.
   - Click **Allow**.
6. Copy the **Web app URL** (looks like `https://script.google.com/macros/s/AKfycb.../exec`).

### Step 5: Paste URL in `script.js`
Open `script.js` and paste your URL into:
```javascript
formSubmissionEndpoint: "https://script.google.com/macros/s/AKfycb.../exec"
```
That's it! Every new registration will automatically append as a row in your Google Sheet.

### How to Export to Excel
In your Google Sheet:
- Click **File** → **Download** → **Microsoft Excel (.xlsx)**.

---

## 🌐 4. Free Deployment Options

### OPTION 1: GitHub Pages (Recommended — 2 minutes)

1. Create a free account on [GitHub.com](https://github.com) if you don't already have one.
2. Create a new repository named: `agentblazer-amrita`.
3. Set repository visibility to **Public**.
4. Upload all files from the `agentblazer-amrita/` folder (`index.html`, `style.css`, `script.js`, `README.md`) to the repository:
   ```bash
   git init
   git add .
   git commit -m "Launch Agentblazer registration portal"
   git branch -M main
   git remote add origin https://github.com/<your-username>/agentblazer-amrita.git
   git push -u origin main
   ```
5. In your GitHub repository:
   - Go to **Settings** → **Pages** (in left sidebar).
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Under **Branch**, select `main` and `/ (root)`, then click **Save**.
6. Within 60 seconds, your site will be live at:
   `https://<your-username>.github.io/agentblazer-amrita/`

---

### OPTION 2: Vercel (Alternative — 1 minute)

1. Go to [Vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New...** → **Project**.
3. Import your `agentblazer-amrita` repository.
4. Leave all settings at default (Framework Preset: Other).
5. Click **Deploy**.
6. Your website is instantly live with a free SSL certificate at `https://agentblazer-amrita.vercel.app`.

---

## 🔐 5. Internal Intake & Quota Guidelines

**DO NOT** display these numbers on the public registration website. They are internal selection targets for the club leadership team:

| Target Year | Intake Target (%) | Target Count | Public Focus Persona |
| :--- | :--- | :--- | :--- |
| **First Year** | 10% | **13 students** | The Explorer (*Discover. Experiment. Learn.*) |
| **Second Year** | 20% | **25 students** | The Builder (*Learn. Create. Collaborate.*) |
| **Third Year** | 70% | **87 students** | The Accelerator (*Build. Lead. Deliver.*) |
| **Total** | 100% | **125 students** | — |

*The public registration displays: "Limited membership. Final selection will consider club requirements, student interest, branch diversity and active participation potential."*

---

## 🛡️ 6. Technical Safeguards & Offline Backup

1. **CORS Safe**: Google Apps Script POST requests are transmitted with `text/plain;charset=utf-8` carrying the JSON payload. This prevents CORS OPTIONS preflight failures in standard browsers.
2. **Browser Local Storage Safeguard**: Every submission is automatically backed up in the applicant's browser `localStorage`.
3. **Discreet Admin Export**: At the bottom right of the page footer, an **"Export Registrations (CSV)"** button allows club administrators to download a CSV of locally recorded registrations for testing or emergency offline collection.

---

## 📝 License & Attribution
Agentblazer is a student-led technology club at **Amrita Vishwa Vidyapeetham, Amaravati**.
All code is open, modular, and lightweight for students to learn, adapt, and expand.
