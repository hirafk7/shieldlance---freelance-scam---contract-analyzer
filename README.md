# ShieldLance — Freelance Scam & Contract Risk Analyzer

ShieldLance is an AI-powered web application designed to protect freelancers, remote job seekers, and independent contractors from fraudulent job posts, payment scams, identity phishing, and predatory contract clauses.

---

## 🛡️ Key Capabilities

- **AI Core Analyzer**: Paste text or upload screenshots of job postings, client chats (Telegram/WhatsApp/Email), or contract clauses to receive structured fraud analysis powered by Google Gemini AI.
  - **Risk Score Meter**: Visual 0–100 gauge with color-coded risk tiers (*Safe/Legitimate* to *Extreme Scam Warning*).
  - **Pattern Classification**: Identifies specific scam schemes (*Fake Check*, *Off-Platform Redirect*, *Unpaid Test Task*, *Upfront Fee Request*, *Phishing*, *Predatory Terms*).
  - **Red & Green Flags**: Severity-rated suspicious signals alongside genuine legitimacy indicators.
  - **Predatory Contract Analysis**: Plain-language breakdown of unfair revision limits, delayed payment terms, or broad non-competes.
  - **Ready-to-Send Client Reply**: One-click copyable response designed to probe client legitimacy professionally and non-accusatorily.
- **Scam Pattern Library**: Searchable database detailing real-world schemes, how they operate, example messages, and protection steps.
- **Safety Quiz**: Interactive scenarios to test and build instincts for spotting freelance scams.

---

## 🚀 How to Deploy on Netlify (Step-by-Step)

ShieldLance is architected for **zero-configuration deployment** on Netlify using Netlify Functions.

### 1. Export / Push to GitHub
1. Export or download the ZIP of this project from AI Studio.
2. Unzip and push the files to a new repository on your **GitHub** account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - ShieldLance"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/shieldlance.git
   git push -u origin main
   ```

### 2. Connect Repository to Netlify
1. Log in to [Netlify](https://app.netlify.com/).
2. Click **Add new site** -> **Import an existing project**.
3. Choose **GitHub** and select your `shieldlance` repository.
4. Netlify will automatically detect build settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `netlify/functions`

### 3. Add Your Gemini API Key in Netlify
1. Before or after triggering the first build, navigate to your site's dashboard in Netlify:
   - Go to **Site configuration** → **Environment variables**.
2. Click **Add a variable** or **Import from .env**.
3. Add the required environment variable:
   - **Key / Name:** `GEMINI_API_KEY`
   - **Value:** *Your Google Gemini API Key*
4. Click **Save**.

### 4. Trigger Deploy
1. Go to **Deploys** → **Trigger deploy** → **Deploy site**.
2. Once the build completes (usually ~1 minute), your site and backend functions will be live!

---

## 🔒 Architecture & Security

- **Server-Side API Proxy**: All requests to Gemini AI execute inside Netlify Serverless Functions (`/.netlify/functions/analyze`).
- **Zero API Key Exposure**: The Gemini API key is stored securely in environment variables and is **never** bundled or exposed to the client browser.
- **Client Resilience**: Includes client-side file size validation (<4MB), character limit counters (8,000 max), 30-second request timeouts, rate-limit error handling, and double-submission protection.

---

## 🛠️ Local Development

To run ShieldLance locally on your machine:

```bash
# 1. Install dependencies
npm install

# 2. Set your environment variable in a .env file (or export in shell)
# GEMINI_API_KEY=your_gemini_api_key

# 3. Start development server (port 3000)
npm run dev

# 4. Build for production test
npm run build
```
