# POLARIS: India's Sovereign Polar & Cryosphere Mission Intelligence Portal

An institutional-grade scientific intelligence web portal and interactive 3D digital-twin platform developed for the **Ministry of Earth Sciences (MoES)** and **National Centre for Polar and Ocean Research (NCPOR)** under the Smart India Hackathon (SIH) 2026.

---

## 🚀 Quick Start Guide (शुरुआती सेटअप)

### 1. Prerequisites (आवश्यकताएं)
- **Node.js**: v18.0 or higher
- **npm** or **yarn** / **pnpm**

### 2. Installation (इंस्टॉलेशन)
Clone the repository and install dependencies:
```bash
git clone https://github.com/gopal-maddheshiya/polarpulse-web.git
cd polarpulse-web
npm install
```

### 3. Environment Variables (सीक्रेट / पर्यावरण चर)
Create a `.env` file in the root directory by copying `.env.example`:
```bash
cp .env.example .env
```

Open `.env` and fill in your keys:
```env
# Google Gemini API Key (Get a free key from https://aistudio.google.com/)
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Configuration (Optional: fallback local mock data works automatically if not provided)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_public_key_here
```

> **Note**: Even without Supabase or Gemini keys configured, the application runs seamlessly with built-in high-fidelity scientific fallback datasets and intelligent offline simulation.

### 4. Run Development Server (लोकल रन करें)
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production
```bash
npm run build
```

---

## 🛡️ Security & Privacy Guidelines
- **NEVER** commit or share your `.env` file containing real secret keys (`GEMINI_API_KEY`, etc.).
- The `.gitignore` file is pre-configured to exclude `.env`, `node_modules/`, and build artifacts.
- For AI features, each collaborator should generate their own personal API key from [Google AI Studio](https://aistudio.google.com/).
